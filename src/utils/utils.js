export const combineDateAndTime = (d, t) => {
  if (!d || !t) return;
  const date = new Date(d);
  const time = new Date(t);
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00';
  const year = date.getFullYear();
  const month = '0' + (date.getMonth() + 1).toString().slice(-2);
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;
  return new Date(dateString + ' ' + timeString).toISOString();
};
