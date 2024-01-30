"use server";

const headers = {
  Authorization: `OAuth ${process.env.AUTH_TOKEN}`,
};

const getDiskData = async () => {
  const data = await fetch(`${process.env.API_URL}/disk`, {
    headers,
  });

  return await data.json();
};

const checkAvailabilityFolder = async () => {
  const data = await fetch(
    `${process.env.API_URL}/disk/resources?path=%2Ficons-for-mobile-next`,
    { headers }
  );

  return await data.json();
};

const createFolder = async () => {
  const data = await fetch(
    `${process.env.API_URL}/disk/resources?path=%2Ficons-for-mobile-next-2`,
    {
      headers,
      method: "PUT",
    }
  );

  return await data.json();
};

export { getDiskData, checkAvailabilityFolder, createFolder };
