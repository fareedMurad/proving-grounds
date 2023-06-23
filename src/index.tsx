import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import * as WebglApi from "@novorender/webgl-api";
import * as MeasureApi from "@novorender/measure-api";
import * as DataJsApi from "@novorender/data-js-api";
import * as GlMatrix from "gl-matrix";

const webglApi = WebglApi; // Use the actual imported module here
const measureApi = MeasureApi;
const dataJsApi = DataJsApi;
const glMatrix = GlMatrix;
const canvas = document.createElement('canvas');
const canvas2D = document.createElement('canvas');
const previewCanvas = document.createElement('canvas');

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App
      webglApi={webglApi}
      measureApi={measureApi}
      dataJsApi={dataJsApi}
      glMatrix={glMatrix}
      canvas={canvas}
      canvas2D={canvas2D}
      previewCanvas={previewCanvas}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
