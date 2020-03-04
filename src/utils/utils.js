export const combineDateAndTime = (d, t) => {
  if (!d || !t) return;
  /*
  const date = new Date(d);
  const time = new Date(t);
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00';
  const year = date.getFullYear();
  const month = '0' + (date.getMonth() + 1).toString().slice(-2);
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;
  return new Date(dateString + ' ' + timeString).toISOString();
  */

  const dateString = new Date(d).toISOString().split('T')[0];
  const timeString = new Date(t).toISOString().split('T')[1];
  return new Date(dateString + 'T' + timeString);
};
export const setActivityProps = (activity, user) => {
  activity.isGoing = activity.attendees.some(a => a.userName === user.userName);
  activity.isHost = activity.attendees.some(
    a => a.userName === user.userName && a.isHost
  );
  return activity;
};
export const createAttendee = user => {
  return {
    displayName: user.displayName,
    isHost: false,
    userName: user.userName,
    image: user.image
  };
};
