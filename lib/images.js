"use server";

import fs from "fs";

const sleep = () =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, 5000);
  });

const fetchImages = async () => {
  const files = fs.readdirSync("./public");

  await sleep();

  return []; //files;
};

const deleteImage = (name) => {
  console.log(`delete image - ${name}`);
};

export { fetchImages, deleteImage };
