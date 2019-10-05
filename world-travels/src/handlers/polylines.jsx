function handlePolylines(map,maps) {
    // var p1 = { "lat": 38, "lng": -77 }
    // var p2 = { "lat": 12, "lng": -68 }
    // var flightPath = new maps.Polyline({
    //     path: [p1,p2 ],
    //     geodesic: true,
    //     strokeColor: '#33BD4E',
    //     strokeOpacity: 1,
    //     strokeWeight: 5
    // });

    // flightPath.setMap(map);
    // var myPosition = new maps.LatLng(46.0, -125.9);

    var p1 = new maps.LatLng(38,-77);
    var p2 = new maps.LatLng(12.2,-68.2);

    var lineLength = maps.geometry.spherical.computeDistanceBetween(p1, p2);
    var lineHeading = maps.geometry.spherical.computeHeading(p1, p2);
    var offset1 = maps.geometry.spherical.computeOffset(p1, lineLength / 4, lineHeading - 60)
    var offset2 = maps.geometry.spherical.computeOffset(p2, lineLength / 4, -lineHeading + 60)


    var GmapsCubicBezier = function (latlong1, latlong2, latlong3, latlong4, resolution, map) {
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
                            icons: [{
                                icon: {
                                    path: 'M 0,-1 0,1',
                                    strokeOpacity: 1,
                                    scale: 4
                                },
                                offset: '0',
                                repeat: '20px'
                            }],
                 strokeColor: 'grey'
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
    
    var curvedLine = new GmapsCubicBezier(p1, offset1, p2, offset2, .01, map);

}

export default handlePolylines;


