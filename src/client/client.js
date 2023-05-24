import axios from "axios";
import { merge, forEach, isEmpty } from "lodash";

const mapResponseToError = (exception) => {
  // obtain error details
  let { code, status, message, description, stack, errors, data } = exception;
  const { request, response } = exception;

  // handle server response error
  if (response) {
    code = response.code || code;
    status = response.status || status;
    data = response.data || data || {};
    message = data.message || response.statusText || message;
    errors = response.errors || errors || {};
    stack = response.stack || data.stack || stack;
  }

  // handle no server response
  if (request) {
    description = description || "Server Not Responding";
  }

  // initialize error
  let error = new Error(message);
  error.stack = stack;

  // update error object
  error = merge(error, { code, status, message, description, errors, ...data });

  // return normalized native error
  return Promise.reject(error);
};

const mapResponseToData = (response) => response.data;

const wrapRequest = (request) => {
  return request.then(mapResponseToData).catch(mapResponseToError);
};

export const CONTENT_TYPE = "application/json";

let client = null;
export const createHttpClient = (API_BASE_URL) => {
  if (!client) {
    let BASE_URL =
      API_BASE_URL ||
      process.env.BEEM_API_URL ||
      process.env.REACT_APP_BEEM_API_URL;
    // Set the BASE_URL based on the provided API_BASE_URL or environment variables
    // ...

    const options = { baseURL: BASE_URL, headers: HEADERS };
    client = axios.create(options);
  }
  return client;
};

export const disposeHttpClient = () => {
  client = null;
};

export const all = (...promises) => axios.all([...promises]);

export const spread = axios.spread;

export const prepareParams = (params) => {
  const normalizedParams = {};
  const { sort, page, pageSize, ...otherParams } = params || {};

  if (sort) {
    forEach(params.sort, (value, key) => {
      normalizedParams.sortBy = key;
      normalizedParams.sortOrder = value;
    });
  }

  if (page) {
    normalizedParams.page = params.page;
  }

  if (pageSize) {
    normalizedParams.pageSize = params.pageSize;
  }

  if (otherParams) {
    forEach(otherParams, (value, key) => {
      normalizedParams[key] = value;
    });
  }

  return normalizedParams;
};

export const get = (url, params) => {
  const httpClient = createHttpClient();
  const options = prepareParams(params);
  return wrapRequest(httpClient.get(url, { params: options }));
};

export const post = (url, data) => {
  if (isEmpty(data)) {
    return Promise.reject(new Error("Missing Payload"));
  }
  const httpClient = createHttpClient();
  return wrapRequest(httpClient.post(url, data));
};

export const put = (url, data) => {
  if (isEmpty(data)) {
    return Promise.reject(new Error("Missing Payload"));
  }
  const httpClient = createHttpClient();
  return wrapRequest(httpClient.put(url, data));
};

export const patch = (url, data) => {
  if (isEmpty(data)) {
    return Promise.reject(new Error("Missing Payload"));
  }
  const httpClient = createHttpClient();
  return wrapRequest(httpClient.patch(url, data));
};

export const del = (url) => {
  const httpClient = createHttpClient();
  return wrapRequest(httpClient.delete(url));
};

export const HEADERS = {
  Accept: CONTENT_TYPE,
  "Content-Type": CONTENT_TYPE,
  // Authorization: getJwtToken(),
};

export const getUsers = () => {
  return get("http://localhost:3001/v1/all");
};

export const updateUser = (data) => {
  return patch(`http://localhost:3001/v1/update${data.Id}`, data);
};

export const deleteUser = (data) => {
  return del(`http://localhost:3001/v1/delete${data._id}`);
};
