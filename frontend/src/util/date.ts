export function getKST(timestamp: string) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date).replace(/\. /g, '-');

  return {
    data: formattedDate.slice(0, 10),
    time: formattedDate.slice(11),
  };
}

export function getTimeDifference(timestamp: string) {
  const date = new Date(timestamp).getTime();
  const nowDate = new Date().getTime();

  const diffInMs = nowDate - date;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  return diffInHours;
}
