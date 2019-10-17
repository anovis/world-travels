import constants from '../consts'
// const planePath = `M 497.535,14.465c-19.569-19.568-51.395-19.241-70.557,0.726L322.092,124.488L66.131,39.781L12.4,93.513l213.352,131.365
// L117.796,337.372l-69.231-11.366L0,374.571l101.78,35.649L137.429,512l48.565-48.565l-11.366-69.231l112.494-107.955
// L418.487,499.6l53.732-53.732l-84.706-255.961L496.808,85.022C516.776,65.86,517.103,34.034,497.535,14.465z`

// ,
//                         {
//                               icon: {
//                                   path: planePath,
//                                   scale: '.1',
//                                   strokeColor:"#0033CC",
//                                   strokeWeight:3,
//                                   strokeOpacity:1,
//                                   rotation:315,
//                                   anchor:new maps.Point(100, 520)
//                               },
//                               offset: (0) + '%'
//                             }

function createPolyLine(map, maps, coordinate1, coordinate2){
    var p1 = generateLatLng(maps, coordinate1);
    var p2 = generateLatLng(maps, coordinate2);

    var lineLength = maps.geometry.spherical.computeDistanceBetween(p1, p2);
    var lineHeading = maps.geometry.spherical.computeHeading(p1, p2);
    var offset1 = maps.geometry.spherical.computeOffset(p1, lineLength / constants.linelengthOffset, lineHeading - constants.lineHeadingOffset)
    var offset2 = maps.geometry.spherical.computeOffset(p2, lineLength / constants.linelengthOffset, -lineHeading + constants.lineHeadingOffset)
    
    var BezierLine = new GmapsCubicBezier(p1, offset1, p2, offset2, constants.resolution, map, maps);
    return BezierLine
}

function generateLatLng(maps, coordinate){
    return new maps.LatLng(coordinate[0],coordinate[1])
}

var GmapsCubicBezier = function (latlong1, latlong2, latlong3, latlong4, resolution, map, maps) {
    var lat1 = latlong1.lat();
    var long1 = latlong1.lng();
    var lat2 = latlong2.lat();
    var long2 = latlong2.lng();
    var lat3 = latlong3.lat();
    var long3 = latlong3.lng();
    var lat4 = latlong4.lat();
    var long4 = latlong4.lng();

    var points = [];

    for (var it = 0; it <= 1; it += resolution) {
        points.push(this.getBezier({
            x: lat1,
            y: long1
        }, {
            x: lat2,
            y: long2
        }, {
            x: lat3,
            y: long3
        }, {
            x: lat4,
            y: long4
        }, it));
    }
    var path = [];
    for (var i = 0; i < points.length - 1; i++) {
        path.push(new maps.LatLng(points[i].x, points[i].y));
        path.push(new maps.LatLng(points[i + 1].x, points[i + 1].y, false));
                  }
                  
        var Line = new maps.Polyline({
            path: path,
            geodesic: true,
            strokeOpacity: 0.0,
                        icons: [
                            {
                            icon: {
                                path: 'M 0,-1 0,1',
                                strokeOpacity: 1,
                                scale: 3
                            },
                            offset: '0',
                            repeat: '20px'
                        }],
             strokeColor: 'blue'
         });

        Line.setMap(map);
    return Line;
};

GmapsCubicBezier.prototype = {
    
    B1: function (t) {
        return t * t * t;
    },
    B2: function (t) {
        return 3 * t * t * (1 - t);
    },
    B3: function (t) {
        return 3 * t * (1 - t) * (1 - t);
    },
    B4: function (t) {
        return (1 - t) * (1 - t) * (1 - t);
    },
    getBezier: function (C1, C2, C3, C4, percent) {
        var pos = {};
        pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
        pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
        return pos;
    }
};


function handlePolylines(map,maps,data) {
    var lines = []
    data.forEach(function (value, i) {
        if ((data.length - 1) > i){
            lines.push({line:createPolyLine(map,maps,value.coordinates,data[i+1].coordinates), mode:data[i+1].mode,data:value})
        }
    }); 

    return lines
}

export default handlePolylines;


