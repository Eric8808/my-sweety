import {Tick,OBJModel} from 'react-3d-viewer'
import sofa3D from './Open3DModel.com_07.obj'

function Sweety() {

    return(
        <OBJModel src={sofa3D} texPath="" width={200} height={500}/>
  )
}

export default Sweety;

  
