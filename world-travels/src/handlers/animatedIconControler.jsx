import animatedIcon from './animatedIcon'
import {pathObject} from '../images/svgPaths'

export function handleAnimation(map,maps,data){
    var animationDiv = document.createElement('div');
    new animationControl(animationDiv, map,maps,data);
    animationDiv.index = 1;
    animationDiv.style['padding-top'] = '10px';
    map.controls[maps.ControlPosition.TOP_CENTER].push(animationDiv);
}

function animationControl(animationDiv, map,maps, data) {
    // Set the center property upon construction
    // control.center_ = center;
    animationDiv.style.clear = 'both';

    // Set CSS for the control border
    var playAnimationUI = document.createElement('div');
    playAnimationUI.id = 'play';
    playAnimationUI.title = 'Click to play animation';
    playAnimationUI.innerHTML = 'Play';
    animationDiv.appendChild(playAnimationUI);

    // Set up the click event listener for 'play animation Map'
    playAnimationUI.addEventListener('click', function() {
        data.forEach((item,index) => {
            var animation = animatedIcon(item.line,pathObject[item.mode],maps)
            setTimeout( function() {
                clearInterval(animation)
                var icons = item.line.get('icons');
                icons.pop()
                item.line.set('icons', icons);
              }, 5000* (index + 1)); // todo fix async issue
        });
    });
}

