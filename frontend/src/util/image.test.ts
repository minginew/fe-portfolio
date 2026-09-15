import { afterEach, describe, expect, it, vi } from 'vitest';
import { resizeToWebp } from './image';

function stubCanvas(width: number, height: number, blobType = 'image/webp') {
  const drawImage = vi.fn();
  vi.stubGlobal(
    'createImageBitmap',
    vi.fn(async () => ({ width, height, close: vi.fn() }))
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    drawImage,
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (this: HTMLCanvasElement, cb) {
    cb(new Blob(['x'], { type: blobType }));
  });
  return { drawImage };
}
afterEach(() => vi.restoreAllMocks());

describe('resizeToWebp', () => {
  it('maxWidth보다 큰 이미지는 비율을 유지해 줄인다', async () => {
    const { drawImage } = stubCanvas(1600, 1200);
    const out = await resizeToWebp(new File(['x'], 'a.png', { type: 'image/png' }), { maxWidth: 800 });
    expect(drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 800, 600);
    expect(out.type).toBe('image/webp');
    expect(out.name).toMatch(/^[0-9a-f-]{36}\.webp$/);
  });
  it('작은 이미지는 확대하지 않는다', async () => {
    const { drawImage } = stubCanvas(400, 300);
    await resizeToWebp(new File(['x'], 'a.png'), { maxWidth: 800 });
    expect(drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 400, 300);
  });
  it('webp 인코딩이 안 되면 에러', async () => {
    stubCanvas(400, 300, 'image/png');
    await expect(resizeToWebp(new File(['x'], 'a.png'))).rejects.toThrow('webp');
  });
});
