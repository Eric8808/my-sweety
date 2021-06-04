import girlImg from '../../../myimages/yuri.jpg'
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Girl from "./Girl.js";

import { OrbitControls } from "@react-three/drei";

const Sweety=()=>{

  return(
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <Girl />
      </Suspense>
    </Canvas>
  )
  
}
export default Sweety