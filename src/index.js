import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "utils/reactQueryClient";

ReactGA.initialize("G-1346J2JPLL");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

