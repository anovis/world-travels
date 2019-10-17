import handlePolylines from './polylines'
import { handleAnimation } from './animatedIconControler'
const handleApiLoaded = (map, maps, data) => {
    var lines = handlePolylines(map, maps, data)
    handleAnimation(map,maps,lines)
  };



  
export default handleApiLoaded