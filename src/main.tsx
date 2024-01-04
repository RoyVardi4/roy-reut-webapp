import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

// config api
axios.defaults.baseURL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="805268564127-lo969u7vj3g7cfppecqmubpcv0ht183a.apps.googleusercontent.com" >
        <div style={{ minHeight: "98vh", backgroundColor: "rgb(250, 250, 250)" }}>
          <App />
        </div>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
