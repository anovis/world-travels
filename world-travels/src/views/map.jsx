import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import handleApiLoaded from './../handlers' 

const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

class SimpleMap extends Component {

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY , libraries: ['geometry'].join(','),}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;