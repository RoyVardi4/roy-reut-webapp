import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div style={{ minHeight:'98vh', backgroundColor: "rgb(250, 250, 250)" }}>
        <App />
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
