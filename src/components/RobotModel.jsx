"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const RobotModel = ({ scale, position = [0, -2, 0], ...props }) => {
  const { scene } = useGLTF(`/robot2.glb`);
  const { viewport } = useThree();
  const modelRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener(`resize`, checkMobile);
    return () => window.removeEventListener(`resize`, checkMobile);
  }, []);

  const copiedScene = useMemo(() => scene.clone(), [scene]);
  
  const finalScale = scale !== undefined 
    ? scale 
    : Math.min(viewport.width, viewport.height) * 0.8;

  useFrame((state) => {
    if (modelRef.current) {
      // FIX 1: state.pointer automatically registers BOTH mouse movements and touch screen swipes
      let targetX = (state.pointer.y * Math.PI) / 8;
      let targetY = (state.pointer.x * Math.PI) / 6;

      if (isMobile) {
        // FIX 2: Drastically increased the Math.sin multipliers. 
        // Now the robot has a highly visible, continuous breathing/floating motion on mobile.
        targetX += Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
        targetY += Math.sin(state.clock.elapsedTime * 0.8) * 0.25;
      }

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