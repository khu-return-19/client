import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "lib/reactQueryClient";

ReactGA.initialize("G-VPWZLWE481");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
