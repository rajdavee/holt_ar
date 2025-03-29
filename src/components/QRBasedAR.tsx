import { MindARThreeViewer } from "@hiukim/mind-ar-js-react";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const QRBasedAR = () => {
  const sceneRef = useRef<THREE.Scene>();
  const modelRef = useRef<THREE.Group>();

  const onMindarThreeStart = () => {
    const loader = new GLTFLoader();
    loader.load('/aqua.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      model.position.set(0, 0, 0);
      if (sceneRef.current) {
        sceneRef.current.add(model);
        modelRef.current = model;
      }
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MindARThreeViewer
        imageTargetSrc="/qr-target.mind"
        filterMinCF={1}
        filterBeta={10000}
        missTolerance={0}
        warmupTolerance={0}
        onStart={onMindarThreeStart}
        onSceneRef={(ref) => { sceneRef.current = ref; }}
      />
    </div>
  );
};

export default QRBasedAR;
