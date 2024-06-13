const getFormattedDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const month = date.toLocaleString("eng", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};

const getFormattedTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export { getFormattedDate, getFormattedTime };
