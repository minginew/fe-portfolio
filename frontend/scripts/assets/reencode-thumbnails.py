# 사용법: <venv>/bin/python scripts/assets/reencode-thumbnails.py [--dry-run]
# 기존 projects.thumbnail(원본 png/jpg)을 내려받아 800px·webp로 재인코딩해 새 파일로 올리고 thumbnail URL을 갱신한다.
# 원본 파일은 삭제하지 않는다(롤백: 이전 URL은 stdout에 남는다). 비밀값은 출력하지 않는다.
import io, os, re, sys, uuid, json, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
env = {}
for line in (ROOT / '.env').read_text().splitlines():
    m = re.match(r'^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$', line)
    if m: env[m.group(1)] = m.group(2)
URL, KEY = env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_KEY']
DRY = '--dry-run' in sys.argv

def req(method, path, body=None, headers=None, raw=False):
    h = {'apikey': KEY, **(headers or {})}
    data = body if raw else (json.dumps(body).encode() if body is not None else None)
    if not raw and body is not None: h['Content-Type'] = 'application/json'
    r = urllib.request.Request(URL + path, data=data, method=method, headers=h)
    with urllib.request.urlopen(r) as res: return res.read()

tok = json.loads(req('POST', '/auth/v1/token?grant_type=password',
    {'email': env['E2E_ADMIN_EMAIL'], 'password': env['E2E_ADMIN_PASSWORD']}))['access_token']
auth = {'Authorization': f'Bearer {tok}'}
rows = json.loads(req('GET', '/rest/v1/projects?select=project_id,thumbnail', headers=auth))
for row in rows:
    src = row['thumbnail']
    if not src or src.endswith('.webp'): print(row['project_id'], 'skip'); continue
    with urllib.request.urlopen(src) as res: orig = res.read()
    im = Image.open(io.BytesIO(orig)).convert('RGB')
    scale = min(1, 800 / im.width)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=80, method=6)
    name = f'thumbnail/{uuid.uuid4()}.webp'
    print(row['project_id'], f'{len(orig)//1024}KB -> {buf.tell()//1024}KB', src, '->', name)
    if DRY: continue
    req('POST', f'/storage/v1/object/project_images/{name}', buf.getvalue(), {**auth, 'Content-Type': 'image/webp'}, raw=True)
    new_url = f'{URL}/storage/v1/object/public/project_images/{name}'
    req('PATCH', f"/rest/v1/projects?project_id=eq.{row['project_id']}", {'thumbnail': new_url}, {**auth, 'Prefer': 'return=minimal'})
