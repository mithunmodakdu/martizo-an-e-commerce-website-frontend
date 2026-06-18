const getFormattedDate = (unformattedDate: string | Date | null, showTime = false) => {
  if(!unformattedDate){
    return null;
  }
  const date = new Date(unformattedDate);

  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
  });

  const month = date.toLocaleDateString("en-GB", {
    month: "long",
  });

  const year = date.getFullYear();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if(showTime){
    return `${day} ${month} ${year}, ${time}`;
  }

  return `${day} ${month} ${year}`;
  
};

export default getFormattedDate;