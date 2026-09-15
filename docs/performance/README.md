# 성능 측정 리포트

과거 최적화 원복(#66) → 버그 수정 후 기준점 확정(#67) → 기존 최적화 항목별 재적용·측정(#70) → 신규 최적화(#71) → 소규모 수정(#72) 순으로 진행. 기간 2026-09-14 ~ 09-16.
표기: [가정] 미검증 추정 / [근거] 간접 근거 기반 / [실측] 직접 측정값.

## 측정 방법

- 도구: Lighthouse 12.8.2, `--preset=perf --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate` (모바일, 4G/CPU 4x 시뮬레이션)
- 로컬: `vite build` + `vite preview`(:4173), 실 Supabase 서버, 5회 중앙값
- CI: GitHub Actions ubuntu-latest, `measure.sh`, base·head 같은 job 내 각각 측정, 3회 중앙값
- 대상: portfolio / post / post_97 / project / project_11 5개 페이지 + `/`(인트로)
- 지표: score, FCP, LCP, TBT, CLS, SI, total KB, reqs, JS/CSS/font/img KB, TTFB, load delay, render delay
- 노이즈 기준: 로컬 |ΔLCP| < 300ms은 노이즈로 간주(로컬 preload 분리 측정에서 확인된 기준). CI는 3회 중앙값으로도 |ΔLCP| 최대 ~800ms까지 흔들려 같은 300ms 기준을 적용하되 판단은 로컬 5회 측정을 우선. 5회 중앙값 권장 근거: [Lighthouse variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md)("median of 5 runs is twice as stable as 1 run")
- 예산 게이트(`budget.json`): 전송량(total KB) 초과는 hard-fail, LCP 초과는 ⚠ 경고만. 사유: PR #79에서 앱 코드 변경 없는 PR이 CI LCP 변동만으로 실패(로컬 기준 × 1.1 예산이 CI 러너 노이즈에 오탐)
- 스크립트: `scripts/perf/measure.sh`(측정 실행), `compare.mjs`(base/head 비교), `bundle-size.mjs`(번들 바이트 집계), `budget.json`(예산 정의)

## 결과

### 기준점

| 시점 | page | LCP(ms) | FCP(ms) | CLS | total(KB transfer) | JS(KB gz) | font(KB gz) | img(KB transfer) |
|---|---|---|---|---|---|---|---|---|
| 원복 직후 | portfolio | 5129 | 5105 | 0.000 | 1464 | 557 | 176 | 706 |
| 원복 직후 | post | 5443 | 4504 | 0.000 | 696 | 557 | 88 | 21 |
| 원복 직후 | post_97 | 4699 | 3905 | 0.083 | 601 | 557 | 1 | 21 |
| 원복 직후 | project | 7191 | 4504 | 0.000 | 1022 | 557 | 88 | 351 |
| 원복 직후 | project_11 | 3942 | 3904 | 0.012 | 599 | 557 | 1 | 21 |
| 기준점 | portfolio | 5576 | 5255 | 0.000 | 1546 | 553 | 263 | 706 |
| 기준점 | post | 5626 | 4654 | 0.000 | 778 | 553 | 175 | 21 |
| 기준점 | post_97 | 5203 | 4205 | 0.083 | 683 | 553 | 88 | 21 |
| 기준점 | project | 7335 | 4654 | 0.000 | 1104 | 553 | 175 | 351 |
| 기준점 | project_11 | 4730 | 4205 | 0.012 | 681 | 553 | 88 | 21 |

- 원복 직후: 과거 최적화 커밋 7개를 되돌린 상태(#66)
- 기준점: 없는 CSS 파일 요청·폰트 경로 오타 등 버그를 수정한 상태(#67). 이후 모든 델타(Δ)의 기준
- #70 시작 전(#81 이후, 테스트용 속성만 추가된 코드)에 같은 방식으로 재측정한 값은 기준점과 노이즈 범위 내 동일(portfolio LCP 5576 vs 5575)

원복 직후 → 기준점 델타(Δ, 버그 수정이라 최적화 집계에서 제외): reqs −1(`styles.css` 유령 요청 제거), font KB +87(오타로 실패하던 300 굵기 요청이 정상 로드), LCP +144~+788(페이지별) — 정적 폰트 face에 `font-display` 미지정(기본값 `auto`, 블록 기간 약 3초)이라 새로 로드되는 폰트가 렌더를 블록. `font-display` 지정은 #84(폰트 PR)에서 처리, 결함 수정으로 분류(최적화 집계 제외).

### 항목별 (#70, #71)

| 항목 | PR | 단독 | 누적 | 판정 |
|---|---|---|---|---|
| 코드 스플리팅 | #82 | portfolio LCP −2248ms(5575→3327), JS −411KB gz | 단독과 동일(#70 첫 PR) | 채택 |
| highlight 트리셰이킹 | #83 | 전 페이지 LCP −1350~−1500ms, JS −282KB gz | post_97 LCP −1425ms(5156→3732), JS −282KB gz(상세 페이지만) | 채택 |
| 폰트 재설계 | #84 | portfolio LCP −1499ms(5575→4076), font −221KB gz | portfolio LCP −1350ms(3475→2125), font −221KB gz | 채택 |
| 이미지 webp | #85 | portfolio LCP −147ms(2125→1978, fetchpriority 제외 측정), img −346KB(transfer) | 동일(2125→1978) | 채택 |
| 이미지 fetchpriority=high | 실험(#85 과정) | portfolio LCP +504ms(1978→2482 대비) | 동일 | 미채택 |
| 레이아웃 시프트 수정 | #86 | `/` CLS 0.952→0.000, LCP 불변 | `/` CLS 0.952→0.000, LCP 2631ms | 결함 수정(집계 제외) |
| 뷰어 Tiptap 제거 | #88 | post_97 LCP −621ms(3359→2737), 상세 JS −88KB gz | 단독과 동일 | 채택(CLS 부작용은 별도 수정) |
| 썸네일 파이프라인 | #89 | project LCP −1590ms(4638→3049), img −315/−302KB(transfer) | project LCP −1613ms(4658→3045) | 채택 |
| 상세 CLS 수정 | #90 | — | post_97 CLS 0.117→0.000 | 결함 수정(집계 제외) |

상호작용:
- highlight 트리셰이킹: 단독은 전 페이지에서 효과(초기 번들에 있었을 때), 코드 스플리팅 이후엔 highlight가 상세 청크로 이동해 누적 효과가 상세 페이지(post_97/project_11)에만 나타남 — 두 최적화 효과는 단순 합산되지 않음
- 폰트/이미지(webp 자체)는 다른 항목과 상호작용 없음 — 단독·누적 방향·크기가 거의 동일
- fetchpriority(이미지)와 preload(폰트)는 같은 메커니즘 후보 [가정]: JS가 늦게 삽입하는 요소에 우선순위 힌트를 주면 초기 자원(폰트·CSS·JS 청크)과 대역폭을 나눠 오히려 렌더가 늦어짐

### 최종

| page | score | FCP(ms) | LCP(ms) | CLS | total(KB transfer) | JS(KB gz) | font(KB gz) | img(KB transfer) |
|---|---|---|---|---|---|---|---|---|
| portfolio | 99 | 1655 | 1976 | 0.000 | 253 | 142 | 42 | 44 |
| post | 94 | 1654 | 2886 | 0.000 | 223 | 142 | 42 | 10 |
| post_97 | 88 | 1893 | 2727 | 0.000 | 242 | 168 | 42 | 10 |
| project | 83 | 1653 | 3056 | 0.000 | 248 | 142 | 42 | 39 |
| project_11 | 92 | 1892 | 2578 | 0.000 | 242 | 170 | 42 | 10 |
| `/`(인트로, #71 시점) | 98 | 1654 | 2285 | 0.000 | 274 | 143 | 42 | 65 |

`/`는 #72 배경 타일을 별도 파일 + preload로 전환한 뒤 LCP 2285 → 2064ms(−221), img 65 → 49KB로 추가 개선(전 페이지 FCP 변화 없음, 채택).

기준점(기준점) → 최종:

| page | LCP(ms) | FCP(ms) | total(KB transfer) |
|---|---|---|---|
| portfolio | 5575 → 1976 (−65%) | 5255 → 1655 | 1546 → 253 (−84%) |
| post | 5587 → 2886 | 4654 → 1654 | 778 → 223 |
| post_97 | 5130 → 2727 (−47%) | 4205 → 1893 | 683 → 242 |
| project | 7329 → 3056 (−58%) | 4653 → 1653 | 1104 → 248 |
| project_11 | 4730 → 2578 | 4203 → 1892 | 681 → 242 |

## LCP 단계 분해

portfolio(LCP 요소 = 헤더 로고) 기준, load delay/render delay 분해:

| 단계 | 커밋 | load delay(ms) | render delay(ms) | LCP(ms) |
|---|---|---|---|---|
| 기준점 | — | 3693 | 1280 | 5575 |
| 코드 스플리팅 후 | #70 2073af6 | 1754 | 1054 | 3327 |
| 폰트 재설계 후(누적) | #70 8b68fe9 | 866 | 711 | 2125 |
| #70 완료(최종) | #70 | — | — | 1975 |

- 코드 스플리팅: JS 부팅량 감소로 load delay −1939ms, render delay −226ms — 가장 큰 단일 기여
- 폰트 재설계: `font-display: swap`(결함 수정)으로 폰트 블록 기간 제거, load delay −888ms·render delay −343ms 추가 감소
- 이후 webp/fetchpriority 실험, 뷰어·썸네일 변경은 portfolio LCP(로고)에는 노이즈 수준 영향만 남기고 최종 1975ms로 수렴

## 채택하지 않은 항목

- manualChunks 벤더 분리(react/supabase/highlight/tiptap) — FCP +300ms 전 페이지, JS +14KB. `@highlight-vendor`를 여러 벤더 청크가 import해 모든 페이지가 첫 방문에 highlight를 로드하는 청크 그래프 결함 재현
- 헤더 로고 `fetchpriority=high` — portfolio LCP +504ms. JS가 뒤늦게 삽입하는 요소에 우선순위 힌트를 주면 초기 자원과 대역폭이 경합
- Supabase 클라이언트 동적 import(지연 로드) — post_97 LCP +598ms. 데이터 의존 페이지에서 "청크 요청 → 도착 → 쿼리" 왕복이 하나 추가됨. 전송 JS 총량은 불변(모든 페이지가 결국 supabase 청크를 받음)
- 인트로 배경 타일 엔트리 JS 인라인 — FCP +150ms 전 페이지(JS +5KB). 크리티컬 청크에 바이트를 더하면 첫 페인트가 늦어짐 — 별도 파일 + preload로 전환해 FCP 영향 0으로 채택
- 폰트 preload 제거(실험) — 제거 시 FCP +300ms 전 페이지, portfolio LCP만 −146ms(노이즈 기준 안). 전 페이지 FCP 이득이 한 페이지 LCP 노이즈보다 커 preload 유지로 결정

### 과거 작업 정정

- webp 전환으로 약 9MB(실측 8.5MB) 절감 — 실제로는 미참조 png 3개(8.5MB) 삭제, 전송량 효과는 0(애초에 요청되지 않던 파일)
- 미사용 폰트 굵기 파일 삭제 — 브라우저는 CSS가 실제로 쓰는 굵기의 파일만 요청하므로(원복 직후 측정 [실측]: 요청된 폰트 파일은 사용 굵기뿐) 안 쓰는 ttf를 지워도 전송량 변화 0. 실제 문제는 700 굵기 파일 부재(합성 굵기)와 `font-display` 미지정이었고 #84에서 처리

## 프로덕션 측정

Netlify(https://minginew.netlify.app), main=c18690b(=develop-fe e95f95b), 2026-09-16, 로컬 5회 중앙값 방식 동일 적용:

| page | score | FCP(ms) | LCP(ms) | CLS | total(KB transfer) | JS(KB gz) | img(KB transfer) | TTFB(ms) |
|---|---|---|---|---|---|---|---|---|
| portfolio | 89 | 2022 | 3316 | 0.000 | 240 | 137 | 44 | 859 |
| post | 93 | 2089 | 2774 | 0.000 | 211 | 137 | 10 | 824 |
| post_97 | 90 | 2073 | 3026 | 0.000 | 228 | 161 | 10 | 842 |
| project | 91 | 1807 | 3180 | 0.000 | 235 | 137 | 38 | 614 |
| project_11 | 96 | 2025 | 2317 | 0.000 | 228 | 163 | 10 | 777 |
| `/` | 90 | 1857 | 3120 | 0.000 | 261 | 137 | 64 | 661 |

- TTFB: 로컬 452ms → 프로덕션 614~859ms(실 서버 왕복). 로컬 절대값은 낙관적
- 전송량: −13~14KB(Netlify brotli 압축 vs 로컬 preview gzip)
- 로고 CDN 로드: portfolio LCP 프로덕션이 로컬 대비 +1340ms. 로고 이미지 응답 427ms(로컬 30ms) + load delay +850ms — CDN 이미지 응답 지연이 주 원인
- 참고값(주장에는 쓰지 않음): 원복 전 배포(main c29414e) 대비 같은 조건 재측정 시 portfolio LCP 2792→2146, post_97 3446→2803, project_11 3209→2593, 전송량 336→253KB. 공식 기준은 기준점이며 이 값은 실제 배포 화면이 얼마나 바뀌었는지에만 답함

### 재측정 (#72 배포 후)

main=eadbbaf(=develop-fe fd0c6dd), 2026-09-16, 같은 방식. 배포본 `index-CrQJ23LW.js` 해시 로컬 빌드와 동일, `/assets/*` 응답 `cache-control: public,max-age=31536000,immutable` 확인:

| page | score | FCP(ms) | LCP(ms) | CLS | total(KB transfer) | JS(KB gz) | img(KB transfer) | TTFB(ms) |
|---|---|---|---|---|---|---|---|---|
| portfolio | 89 | 2034 | 3281 | 0.000 | 245 | 137 | 48 | 832 |
| post | 92 | 2078 | 2835 | 0.000 | 215 | 137 | 14 | 822 |
| post_97 | 92 | 2070 | 2978 | 0.000 | 232 | 161 | 14 | 827 |
| project | 88 | 1885 | 3380 | 0.000 | 239 | 137 | 42 | 688 |
| project_11 | 96 | 2076 | 2301 | 0.000 | 232 | 163 | 14 | 814 |
| `/` | 96 | 1796 | 2471 | 0.000 | 244 | 137 | 48 | 603 |

- 이전 배포 대비: `/` LCP 3120 → 2471, img 64 → 48KB(인트로 배경 타일 20.7 → 4KB). 나머지 5페이지는 타일 preload로 +4KB, LCP 변화 −48~+200(노이즈 범위), CLS 전 페이지 0

## 한계

- 로컬 절대값은 낙관적(TTFB 452ms vs 프로덕션 614~859ms) — 항목별 Δ(코드 효과) 판단용, 절대 사용자 경험 수치 아님
- 상세 페이지(post/project) 절대값은 고정 표본(post 97, project 11) 기준 — 다른 글/프로젝트로 일반화 시 재측정 필요
- CI 측정은 3회 중앙값으로도 노이즈 큼(같은 코드에서 post_97 LCP 폭 약 800ms, PR #79) — 판단은 로컬 5회 중앙값 우선
- 썸네일 최적화 수치는 코드가 아니라 기존 자산 재인코딩(데이터)에서 발생 — 향후 업로드분은 코드가 같은 크기를 보장하지만 과거 자산은 별도 재인코딩 작업이 필요했음

## 부록 — PR·커밋 매핑

| PR | 내용 | 주요 커밋 |
|---|---|---|
| #66 | 과거 최적화 원복 | ceed457 |
| #67 | 버그 수정(공식 기준점) | 13afb9d |
| #68 | `data-testid`, LoginPage `<form>` 전환 | — |
| #70 | 코드 스플리팅/트리셰이킹/폰트/이미지/레이아웃 시프트 | 2073af6, e46477d, 8b68fe9, 74faca6, 6ad3787, 최종 cd3a874 |
| #71 | 뷰어 Tiptap 제거/썸네일 파이프라인/상세 CLS 수정 | bfa1a4c, 0fcdc8e, 578aab7, 최종 8e95a9c |
| #72 | 인트로 배경 타일 축소 | — |
| #77 | CI 측정 환경·노이즈 기준 정립 | — |
| #79 | 예산 오탐 확인 | — |
| #80 | 예산 게이트 정책(전송량 hard-fail, LCP 경고) 결정 | — |
| #81 | PR 순서 기준점 커밋 | 26f33ed |
| #83 | highlight 트리셰이킹 CI 표본 검증 | — |
| #92 | 프로덕션 참고값 재측정(원복 전 배포 비교) | — |

