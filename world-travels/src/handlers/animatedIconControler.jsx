import animatedIcon from './animatedIcon'
import {pathObject} from '../images/svgPaths'

export function handleAnimation(map,maps,data){
    var animationDiv = document.createElement('div');

    var summaryDiv = document.createElement('div');
    summaryDiv.index = 1;
    summaryDiv.style['padding-top'] = '10px';

    new animationControl(animationDiv, summaryDiv,maps,data);
    animationDiv.index = 1;
    animationDiv.style['padding-top'] = '10px';
    map.controls[maps.ControlPosition.TOP_CENTER].push(animationDiv);
    map.controls[maps.ControlPosition.TOP_RIGHT].push(summaryDiv);

   
}


const sumValues = (obj,property) => Object.values(obj).reduce((a, b) => a + b.data[property],0);
// const distance = (maps,coordinates) => {
//     var p1 = generateLatLng(maps, coordinates[0]);
//     var p2 = generateLatLng(maps, coordinates[1]);

//     var lineLength = maps.geometry.spherical.computeDistanceBetween(p1, p2);
//     return lineLength
// }

// // todo put in utils module
// function generateLatLng(maps, coordinate){
//     return new maps.LatLng(coordinate[0],coordinate[1])
// }

function animationControl(animationDiv, summaryDiv,maps, data) {
    // Set the center property upon construction
    // control.center_ = center;
    animationDiv.style.clear = 'both';

    // Set CSS for the play button
    var playAnimationUI = document.createElement('div');
    playAnimationUI.id = 'play';
    playAnimationUI.title = 'Click to play animation';
    playAnimationUI.innerHTML = 'Play';
    animationDiv.appendChild(playAnimationUI);

    // Set CSS for the summary 
    var summaryUI = document.createElement('div');
    summaryUI.id = 'play';
    summaryUI.title = 'Click to play animation';
    // var duration = "duration"
    // data.forEach((item)=>{
    //     item.data.distance = distance(maps, item.data.coordinates)
    // })


    summaryUI.innerHTML = `Days: ${sumValues(data,"duration")} <br/> Distance: 130 miles `

    summaryDiv.appendChild(summaryUI);

    // Set up the click event listener for 'play animation Map'
    playAnimationUI.addEventListener('click', () => animateIconExecuter(data,5000, maps,summaryUI)) 
}

function animateIconExecuter(data, timeout, maps,summaryUI){
    var distance = 0 // redux store
    var duration = 0 // redux store 
    data.forEach((item,index) => {
        var animation = null
        setTimeout( function(){
            duration += item.data.duration
            var meters = maps.geometry.spherical.computeLength(item.line.getPath());
            distance += (meters/1000) 
            animation = animatedIcon(item.line,pathObject[item.mode],maps)
            summaryUI.innerHTML = `Days: ${duration} <br/> Distance: ${distance.toFixed()} km `
        }, timeout * (index));

        setTimeout( function() {
            clearInterval(animation)
            var icons = item.line.get('icons');
            icons.pop()
            item.line.set('icons', icons);
          }, timeout * (index + 1)); // todo fix async issue
    });
};

