import "./polyfills";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import config from "devextreme/core/config";
import { devextremeLicense } from "./devextreme-license";
import { SpeedInsights } from "@vercel/speed-insights/react";
console.log("devextremeLicense", process.env);
config({ licenseKey: devextremeLicense });

const root = ReactDOM.createRoot(
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  document.getElementById("root") as HTMLElement,
);
root?.render(
  <React.StrictMode>
    <SpeedInsights />
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
