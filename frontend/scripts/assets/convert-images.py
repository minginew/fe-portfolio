# 사용법: <venv>/bin/python scripts/assets/convert-images.py
# 참조 중인 png/jpg를 webp로 변환한다. 로고(투명 배경)는 무손실, 사진은 quality 80, 인트로 배경 타일은 384px·quality 70.
# 원본 png/jpg는 변환 후 삭제됨(ef3437c). 재실행 시 원본을 먼저 복구할 것.
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2] / 'src' / 'assets'
TARGETS = [
    ('icons/ui/dark_logo.png', {'lossless': True}),
    ('icons/ui/white_logo.png', {'lossless': True}),
    ('images/sonmingi1.png', {'quality': 80, 'method': 6}),
    # 인트로 배경 타일: 384px·q70 → 4KB 미만이라 Vite assetsInlineLimit(4096B)에 걸려 data URI로 인라인됨(별도 요청 없음)
    ('images/background_white.jpg', {'quality': 70, 'method': 6, 'size': 384}),
]

for rel, opts in TARGETS:
    src = ROOT / rel
    dst = src.with_suffix('.webp')
    if not src.exists():
        print(f'{rel}: skip (원본 없음 — 원본은 git ef3437c^ 에서 복구 가능)')
        continue
    opts = dict(opts)
    size = opts.pop('size', None)
    with Image.open(src) as im:
        if size:
            im = im.resize((size, size), Image.LANCZOS)
        im.save(dst, 'WEBP', **opts)
    print(f'{rel}: {src.stat().st_size // 1024}KB -> {dst.stat().st_size // 1024}KB')
