export const millisecondsToLocaleString = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
  const hours = Math.floor(milliseconds / 1000 / 60 / 60) % 24;
  const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24);

  const secondsString = seconds === 0 ? '' : `${seconds}秒`;
  const minutesString = minutes === 0 ? '' : `${minutes}分`;
  const hoursString = hours === 0 ? '' : `${hours}時間`;
  const daysString = days === 0 ? '' : `${days}日間`;

  return `${daysString}${hoursString}${minutesString}${secondsString}`;
};
