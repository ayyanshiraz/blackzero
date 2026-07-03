"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const Service2Model = ({ scale, position = [0, 0, -6], ...props }) => {
  const { scene } = useGLTF(`/service2.glb`);
  const { viewport } = useThree();
  const modelRef = useRef();

  const copiedScene = useMemo(() => scene.clone(), [scene]);
  
  const defaultScale = Math.max(viewport.width, viewport.height) * 2.2; 
  const finalScale = scale !== undefined ? scale : defaultScale;

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.05;
      modelRef.current.rotation.x += delta * 0.02; 
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

export default Service2Model;