import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Model3D from "./model3D.js";

import { OrbitControls } from "@react-three/drei";

const Sweety=({myAnimation})=>{

  return(
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <Model3D myAnimation={myAnimation}/>
      </Suspense>
    </Canvas>
  )
  
}
export default Sweety