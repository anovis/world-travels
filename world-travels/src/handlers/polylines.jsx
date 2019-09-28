function handlePolylines(map,maps) {
    var flightPath = maps.Polyline({
        path: [ { "lat": 38, "lng": -77 },{ "lat": 12, "lng": -68 }],
        geodesic: true,
        strokeColor: '#33BD4E',
        strokeOpacity: 1,
        strokeWeight: 5
    });

    flightPath.setMap(map);
    }

export default handlePolylines;
