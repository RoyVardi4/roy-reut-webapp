import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/user";

// config api
axios.defaults.baseURL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/";

const clientId =
  import.meta.env.CLIENT_ID ||
  "805268564127-lo969u7vj3g7cfppecqmubpcv0ht183a.apps.googleusercontent.com";

// Send authorization in each request
axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  config.headers.authorization = accessToken;

  return config;
});

// Check response -
// if the response is 401 it means the token is expired so we try using the refresh token to get another access token
axios.interceptors.response.use(
  (response) => response,
  function (info) {
    if (info.response && info.response.status == 401) {
      const config: AxiosRequestConfig = {
        headers: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      };

      return axios
        .get("auth/refreshToken", config)
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
        })
        .catch((err) => alert(err));
    }
  }
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <div
          style={{ minHeight: "98vh", backgroundColor: "rgb(250, 250, 250)" }}
        >
          <UserProvider>
            <App />
          </UserProvider>
        </div>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
