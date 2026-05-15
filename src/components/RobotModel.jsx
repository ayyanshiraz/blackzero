"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RobotModel = ({ scale, position = [0, -2, 0], ...props }) => {
  const { scene } = useGLTF(`/robot2.glb`);
  const { viewport } = useThree();
  const modelRef = useRef();

  const copiedScene = useMemo(() => scene.clone(), [scene]);
  
  const finalScale = scale !== undefined 
    ? scale 
    : Math.min(viewport.width, viewport.height) * 0.8;

  useFrame((state) => {
    if (modelRef.current) {
      const targetX = (state.mouse.y * Math.PI) / 8;
      const targetY = (state.mouse.x * Math.PI) / 6;

      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, -targetX, 0.1);
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetY, 0.1);
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={copiedScene} 
      scale={finalScale} 
      position={position} 
      {...props}
    />
  );
};

export default RobotModel;