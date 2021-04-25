import Axios from "axios";
import SnackbarUtils from "./snackbar/utils";

const BASE_URL = "https://www.flickr.com/services/rest/";

const axios = Axios.create({
  baseURL: BASE_URL,
});

const interceptor = (error) => {
  if (error.response) {
    if (error.response.status === 105) {
      SnackbarUtils.error("Service Unavailable, Try again Later!");
      return Promise.reject({});
    } else {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

axios.interceptors.response.use(undefined, interceptor);

export default axios;
