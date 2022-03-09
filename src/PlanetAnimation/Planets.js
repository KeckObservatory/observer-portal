import React, { Suspense, useState } from "react";
import Dialog from "./Dialog";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import planetData from "./planetData";
import sunTexture from "./textures/sun.jpg";
import "./styles.css";
import {get_browser} from "../Utils";

export default function PlanetAnimation() {
  const [dialogData, setDialogData] = useState(null);
  const hideDialog = () => {
    setDialogData(null);
  };
  const browser = get_browser();
  console.log('browser', browser);
  if (browser.version < 90) {
    return <></>
  }

  return (
    <>
      <Dialog hideDialog={hideDialog} dialogData={dialogData} />
      <Canvas camera={{ position: [40, 0, 0], fov: 45 }}>
        <Suspense fallback={null}>
          <Sun />
          {planetData.map((planet) => (
            <Planet
              planet={planet}
              key={planet.id}
              setDialogData={setDialogData}
            />
          ))}
          <Lights />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </>
  );
}
function Sun() {
  const texture = useLoader(THREE.TextureLoader, sunTexture);
  return (
    <mesh>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
function Planet({
                  planet: {
                    color,
                    xRadius,
                    zRadius,
                    size,
                    speed,
                    offset,
                    rotationSpeed,
                    textureMap,
                    gravity,
                    orbitalPeriod,
                    surfaceArea
                  },
                  setDialogData
                }) {
  const planetRef = React.useRef();
  const texture = useLoader(THREE.TextureLoader, textureMap);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    planetRef.current.position.x = x;
    planetRef.current.position.z = z;
    planetRef.current.rotation.y += rotationSpeed;
  });

  return (
    <>
      <mesh
        ref={planetRef}
        onClick={() => {
          setDialogData({ gravity, orbitalPeriod, surfaceArea });
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />

      </mesh>
      {/*<Ecliptic xRadius={xRadius} zRadius={zRadius} />*/}
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
    </>
  );
}

// draws the orbits
// function Ecliptic({ xRadius = 1, zRadius = 1 }) {
//   const points = [];
//   for (let index = 0; index < 64; index++) {
//     const angle = (index / 64) * 2 * Math.PI;
//     const x = xRadius * Math.cos(angle);
//     const z = zRadius * Math.sin(angle);
//     points.push(new THREE.Vector3(x, 0, z));
//   }
//
//   points.push(points[0]);
//
//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//   return (
//     <line geometry={lineGeometry}>
//       <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
//     </line>
//   );
// }

