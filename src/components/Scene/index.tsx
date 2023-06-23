import React, { useEffect, useRef, useState } from "react";

interface IParams {
  webglApi: any;
  dataJsApi: any;
  canvas: any;
}

async function loadSceneData(dataApi: any): Promise<any> {
  const sceneData = await dataApi.loadScene("3b5e65560dc4422da5c7c3f827b6a77c");
  if ("error" in sceneData) {
    throw sceneData;
  }
  return sceneData;
}

async function initializeScene(
  api: any,
  sceneData: any,
  canvas: any
): Promise<any> {
  const { url, db, settings, camera: cameraParams } = sceneData;

  const scene = await api.loadScene(url, db);

  const view = await api.createView(settings, canvas);
  view.applySettings({ quality: { resolution: { value: 1 } } });

  const camera = cameraParams ?? ({ kind: "turntable" } as any);
  view.camera.controller = api.createCameraController(camera, canvas);

  view.scene = scene;

  return view;
}

function Scene({ webglApi, dataJsApi, canvas }: IParams) {
  const canvasRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      // const dataApi = dataJsApi.createAPI({
      //   serviceUrl: "https://data.novorender.com/api",
      // });

      try {
        const sceneData = await loadSceneData(dataJsApi);
        const api = webglApi;
        const view = await initializeScene(api, sceneData, canvas);
        setLoading(false);
      } catch (e) {
        // Handle errors however you like
        console.warn(e);
      }
    };

    console.log(canvasRef, "canvasRef")

    // if (canvasRef.current) {
      initialize();
    // }
  }, []);

  const canvasProps = {
    width: 800,
    height: 600,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <canvas ref={canvasRef} {...canvasProps} />;
}

export default Scene;
