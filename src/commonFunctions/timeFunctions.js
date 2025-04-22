// export const formatCurrentTime = (time) => {
//     const startTime = new Date(time);
//     const hours = startTime.getHours();
//     const minutes = startTime.getMinutes();
//     const seconds = startTime.getSeconds();
//     const ampm = hours >= 12 ? "PM" : "AM";
//     return `${String(hours % 24).padStart(2, "0")}:${String(minutes).padStart(
//       2,
//       "0"
//     )}:${String(seconds).padStart(2, "0")} ${ampm}`;
//   };

export const formatCurrentTime = (time) => {
  const startTime = new Date(time);
  let hours = startTime.getHours();
  const minutes = startTime.getMinutes();
  const seconds = startTime.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")} ${ampm}`;
};