"use client";

import { api } from "@/lib/api";

const readImageFile = (file) => {
  const { type, name } = file;
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    if (/image/.test(type)) {
      reader.readAsDataURL(file);
    } else {
      resolve({
        result: null,
        message: `Загружаемый файл "${name}" не является изображением`,
      });
    }

    reader.onload = async (event) => {
      try {
        await api.post({
          path: "/api/image/save",
          data: {
            name,
            img: event.target.result,
          },
        });
      } catch (error) {
        reject({
          description: "Сервер ответил ошибкой или не смог обработать файл",
          result: null,
          message: `При загрузке файла "${name}" произошла ошибка`,
        });
      }

      resolve({
        result: name,
        message: `Файл "${name}" успешно загружен`,
      });
    };

    reader.onerror = (error) => {
      reject({
        description: error,
        result: null,
        message: `При загрузке файла "${name}" произошла ошибка`,
      });
    };
  });
};

const getListImages = async () => {
  return await api.get({
    path: "/api/image/list",
  });
};

export { readImageFile, getListImages };
