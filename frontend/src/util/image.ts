// 업로드 전 브라우저에서 리사이즈 + webp 인코딩. Supabase 이미지 변환은 유료 플랜 전용이라 클라이언트에서 처리
export async function resizeToWebp(
  file: File,
  { maxWidth = 800, quality = 0.8 }: { maxWidth?: number; quality?: number } = {}
): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas 2d 컨텍스트를 만들 수 없음');
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  } finally {
    bitmap.close();
  }
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
  if (!blob || blob.type !== 'image/webp') throw new Error('이 브라우저는 webp 인코딩을 지원하지 않음');
  return new File([blob], `${crypto.randomUUID()}.webp`, { type: 'image/webp' });
}
