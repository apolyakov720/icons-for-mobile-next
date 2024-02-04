"use server";

import { Api } from "@/lib/api";
import { FileSchema } from "@/schemas";

const {
  API_URL,
  AUTH_TOKEN,
  API_PATH_IMAGES,
  API_PATH_CONFIGS,
  API_ENDPOINT_RESOURCES,
  API_ENDPOINT_RESOURCES_MOVE,
  API_ENDPOINT_RESOURCES_UPLOAD,
} = process.env;

const api = new Api({
  url: API_URL,
  headers: {
    Authorization: `OAuth ${AUTH_TOKEN}`,
  },
});

const getResources = async (path, type, options) => {
  try {
    const { _embedded, error } = await api.get(API_ENDPOINT_RESOURCES, {
      query: {
        path,
        // Включаем только необходимые поля в ответе
        fields:
          "_embedded.items,_embedded.items.path,_embedded.items.name,_embedded.items.media_type,_embedded.items.file",
      },
      ...options,
    });

    if (error) {
      return { result: false };
    }

    return {
      result: true,
      list:
        _embedded?.items.reduce((acc, { media_type, ...rest }) => {
          if (media_type === type) {
            acc.push(rest);
          }

          return acc;
        }, []) || [],
    };
  } catch {
    return { result: false };
  }
};

const getImages = () => getResources(API_PATH_IMAGES, "image");

const getConfigs = async () => {
  // TODO
  const response = await getResources(API_PATH_CONFIGS, "text");

  return response;
};

const renameFile = async (path, values) => {
  try {
    const validate = FileSchema.safeParse(values);

    if (!path || !validate.success) {
      return { result: false };
    }

    const fileFull = path.split("/").pop();
    const fileName = fileFull.substr(0, fileFull.lastIndexOf("."));
    const toName = fileFull.replace(fileName, values.name);
    const toPath = path.replace(fileName, values.name);

    const { error } = await api.post(API_ENDPOINT_RESOURCES_MOVE, {
      query: {
        from: path,
        path: toPath,
      },
    });

    if (error) {
      return { result: false };
    }

    return { result: true, toName, toPath };
  } catch {
    return { result: false };
  }
};

const removeFile = async (path) => {
  try {
    await api.delete(API_ENDPOINT_RESOURCES, {
      query: {
        path,
        permanently: true,
      },
    });

    return { result: true };
  } catch {
    return { result: false };
  }
};

const uploadFile = async (file, fileName, type = "images") => {
  try {
    const path = type === "images" ? API_PATH_IMAGES : API_PATH_CONFIGS;
    const toPath = `${path}/${fileName}`;

    const { href } = await api.get(API_ENDPOINT_RESOURCES_UPLOAD, {
      query: {
        path: toPath,
        fields: "href",
      },
    });

    const blob = await fetch(file).then((response) => response.blob());

    await fetch(href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: blob,
    });

    return { result: true, toPath };
  } catch {
    return { result: false };
  }
};

export { getImages, getConfigs, renameFile, removeFile, uploadFile };
