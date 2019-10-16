import handlePolylines from './polylines'
import animateLine from './animatedIcon'

const handleApiLoaded = (map, maps) => {
    var line = handlePolylines(map,maps)
    animateLine(line)
  };

export default handleApiLoaded