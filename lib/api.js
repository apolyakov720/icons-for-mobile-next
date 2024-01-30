"use client";

class Api {
  methods = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE",
  };

  config = {
    url: "",
  };

  constructor(config = {}) {
    const { url = "" } = config;

    if (typeof url !== "string") {
      throw new Error(
        `API service: url configuration value: "${url}" is not valid`
      );
    }

    this.config = {
      url: url.trim().toLowerCase(),
    };
  }

  _encodeData(data) {
    if (!data) {
      return "";
    }

    const pairs = [];

    for (let name in data) {
      if (!Object.prototype.hasOwnProperty.call(data, name)) {
        continue;
      }

      if (typeof data[name] === "function") {
        continue;
      }

      let value = data[name].toString();

      name = encodeURIComponent(name.replace("%20", "+"));
      value = encodeURIComponent(value.replace("%20", "+"));

      pairs.push(`${name}=${value}`);
    }

    return `?${pairs.join("&")}`;
  }

  async _makeRequest(params) {
    // path - путь до ресурса;
    // method - метод запроса;
    // data - данные тела запроса.
    // headers - заголовки запроса, по умолчанию 'Content-Type': 'application/json';
    // parser - имя обработчика данных, по умолчанию json;
    const { path, method, data, headers = {}, parser = "json" } = params;
    const { url } = this.config;

    try {
      const resultPath = `${url}${path}`;

      const response = await fetch(resultPath, {
        method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok) {
        return Promise.reject();
      }

      return await response[parser]();
    } catch (error) {
      // Будет отклонён только при сбое сети или если что-то помешало запросу выполниться.
      return Promise.reject(error);
    }
  }

  get({ path, data, ...rest }) {
    // Для GET запроса преобразуем входные данные в строку, подходящую для использования в адресе;
    const preparedPath = `${path}${this._encodeData(data)}`;

    return this._makeRequest({
      path: preparedPath,
      method: this.methods.get,
      ...rest,
    });
  }

  post(params) {
    return this._makeRequest({
      method: this.methods.post,
      ...params,
    });
  }

  put(params) {
    return this._makeRequest({
      method: this.methods.put,
      ...params,
    });
  }

  delete(params) {
    return this._makeRequest({
      method: this.methods.delete,
      ...params,
    });
  }
}

const api = new Api();

export { api };
