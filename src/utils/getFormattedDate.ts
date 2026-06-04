/* eslint-disable @typescript-eslint/no-explicit-any */
const getFormattedDate = (unformattedDate: any) => {
  const date = new Date(unformattedDate);

  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
  });

  const month = date.toLocaleDateString("en-GB", {
    month: "long",
  });

  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;

  return formattedDate;
};

export default getFormattedDate;
