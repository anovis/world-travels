function animateLine(line, iconPath, maps) {
    var count = 0;
    var icons = line.get('icons'); // TODO dynamic
    var animatedIcon = {
        icon: {
            path: iconPath,
            scale: '.1',
            strokeColor:"#0033CC",
            strokeWeight:3,
            strokeOpacity:1,
            rotation:315,
            anchor:new maps.Point(100, 520)
        },
        offset: (0) + '%'
      }
    icons.push(animatedIcon)
    // icons[1]=animatedIcon
    line.set('icons', icons);

    return window.setInterval(function() {
      count = (count + 1) % 200;
      var icons = line.get('icons');
      icons[1]["offset"] = (count / 2) + '%' // TODO dynamic
      line.set('icons', icons);
    }, 30);
}

export default animateLine;


