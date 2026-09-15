# 사용법: <venv>/bin/python scripts/assets/convert-images.py
# 참조 중인 png/jpg를 webp로 변환한다. 로고(투명 배경)는 무손실, 사진·배경은 quality 80.
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2] / 'src' / 'assets'
TARGETS = [
    ('icons/ui/dark_logo.png', {'lossless': True}),
    ('icons/ui/white_logo.png', {'lossless': True}),
    ('images/sonmingi1.png', {'quality': 80, 'method': 6}),
    ('images/background_white.jpg', {'quality': 80, 'method': 6}),
]

for rel, opts in TARGETS:
    src = ROOT / rel
    dst = src.with_suffix('.webp')
    with Image.open(src) as im:
        im.save(dst, 'WEBP', **opts)
    print(f'{rel}: {src.stat().st_size // 1024}KB -> {dst.stat().st_size // 1024}KB')
