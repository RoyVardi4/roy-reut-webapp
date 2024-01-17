import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/user";

// config api
axios.defaults.baseURL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/";

const clientId =
  import.meta.env.CLIENT_ID ||
  "805268564127-lo969u7vj3g7cfppecqmubpcv0ht183a.apps.googleusercontent.com";

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
