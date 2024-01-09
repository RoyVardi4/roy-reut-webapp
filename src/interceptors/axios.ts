import axios, { AxiosRequestConfig } from "axios";

// Send authorization in each request
axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken')
    config.headers.authorization = accessToken;

    return config;
});

// Check response -
// if the response is 401 it means the token is expired so we try using the refresh token to get another access token
axios.interceptors.response.use(response => response, function (info) {
    if (info.response && info.response.status == 401) {
        const config: AxiosRequestConfig = {
            headers: {
                refreshToken: localStorage.getItem('refreshToken')
            }
        }

        return axios
            .get("auth/refreshToken", config)
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken);
            }).catch((err) => alert(err));
    }
});