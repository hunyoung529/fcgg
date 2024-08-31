export function getTimeDifference(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);

  // UTC 시간을 KST로 변환
  const kstPast = new Date(past.getTime() + 9 * 60 * 60 * 1000);

  const differenceInSeconds = Math.floor((+now - +kstPast) / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds}초 전`;
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  } else {
    return `${differenceInDays}일 전`;
  }
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  if (isNaN(kstDate.getTime())) {
    return "Invalid date";
  }
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(kstDate);
}
