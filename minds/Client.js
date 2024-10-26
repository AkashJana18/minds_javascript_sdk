import axios from "axios";
import {
  ObjectNotFound,
  Forbidden,
  Unauthorized,
  UnknownError,
} from "./ExceptionHandling";
import MindsService from "./Minds";
import DatasourcesService from "./DataService";

class APIClient {
  constructor(apiKey, baseUrl = "https://mdb.ai/api") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  _headers() {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  async request(method, url, data = null) {
    try {
      const config = { headers: this._headers() };
      const response = await axios({
        method,
        url: `${this.baseUrl}${url}`,
        data,
        ...config,
      });
      return this._handleResponse(response);
    } catch (error) {
      this._handleError(error);
    }
  }

  async get(url) {
    return this.request("get", url);
  }

  async post(url, data) {
    return this.request("post", url, data);
  }

  async patch(url, data) {
    return this.request("patch", url, data);
  }

  async delete(url) {
    return this.request("delete", url);
  }

  _handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  }

  _handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || error.response.statusText;

      switch (status) {
        case 404:
          throw new ObjectNotFound(message);
        case 403:
          throw new Forbidden(message);
        case 401:
          throw new Unauthorized(message);
        default:
          throw new UnknownError(`Error: ${message}`);
      }
    } else if (error.request) {
      throw new UnknownError("No response received from the API.");
    } else {
      throw new UnknownError(`Unexpected error: ${error.message}`);
    }
  }
}


class Client {
  constructor(apiKey, baseUrl) {
    this.api = new APIClient(apiKey, baseUrl);
    this.minds = new MindsService(this.api);
    this.datasources = new DatasourcesService(this.api);
  }
}

export default Client;
