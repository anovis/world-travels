const planePath = `M 497.535,14.465c-19.569-19.568-51.395-19.241-70.557,0.726L322.092,124.488L66.131,39.781L12.4,93.513l213.352,131.365
L117.796,337.372l-69.231-11.366L0,374.571l101.78,35.649L137.429,512l48.565-48.565l-11.366-69.231l112.494-107.955
L418.487,499.6l53.732-53.732l-84.706-255.961L496.808,85.022C516.776,65.86,517.103,34.034,497.535,14.465z`


function animateLine(line) {
    var count = 0;
    // var icons = line.get('icons'); // TODO dynamic
    // var airplaneIcon = {
    //   icon: {
    //       path: planePath,
    //       scale: '.1',
    //       strokeColor:"#0033CC"
    //   },
    //   offset: (count / 2) + '%',
    // }
    // // icons.push(airplaneIcon)
    // icons[1]=airplaneIcon
    // line.set('icons', icons);

    window.setInterval(function() {
      count = (count + 1) % 200;
      var icons = line.get('icons');
      icons[1]["offset"] = (count / 2) + '%' // TODO dynamic
      line.set('icons', icons);
    }, 30);
}

export default animateLine;


