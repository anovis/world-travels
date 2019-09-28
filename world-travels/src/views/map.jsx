import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

class SimpleMap extends Component {

    render() {
        console.log(API_KEY)
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;