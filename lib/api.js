class Api {
  methods = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE",
  };

  config = {
    url: "",
    headers: {},
  };

  constructor(config = {}) {
    const { url = "", headers = {} } = config;

    if (typeof url !== "string") {
      throw new Error(
        `API service: url configuration value: "${url}" is not valid`
      );
    }

    this.config = {
      url: url.trim().toLowerCase(),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
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
    const {
      path,
      method,
      data,
      query,
      headers = {},
      parser = "json",
      ...rest
    } = params;
    const { url, headers: heads } = this.config;

    try {
      let preparedPath = path;

      if (query && Object.keys(query).length > 0) {
        preparedPath += this._encodeData(query);
      }

      const resultPath = `${url}${preparedPath}`;

      const response = await fetch(resultPath, {
        method,
        body: JSON.stringify(data),
        headers: {
          ...heads,
          ...headers,
        },
        ...rest,
      });

      if (!response.ok) {
        return Promise.reject();
      }

      if (response.body) {
        return await response[parser]();
      }

      return Promise.resolve();
    } catch (error) {
      // Будет отклонён только при сбое сети или если что-то помешало запросу выполниться.
      return Promise.reject(error);
    }
  }

  get(path, params) {
    return this._makeRequest({
      path,
      method: this.methods.get,
      ...params,
    });
  }

  post(path, params) {
    return this._makeRequest({
      path,
      method: this.methods.post,
      ...params,
    });
  }

  put(path, params) {
    return this._makeRequest({
      path,
      method: this.methods.put,
      ...params,
    });
  }

  delete(path, params) {
    return this._makeRequest({
      path,
      method: this.methods.delete,
      ...params,
    });
  }
}

export { Api };
