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


// Converts UTC to 12-hour local time
export const formatTimeDisplay = (iso) => {
  const date = new Date(iso);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")} ${ampm}`;
};

// Converts total seconds to HH:MM:SS
export const formatSecondsToHHMMSS = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(
    s
  ).padStart(2, "0")}`;
};