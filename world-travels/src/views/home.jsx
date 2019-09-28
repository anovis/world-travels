import React, { Component } from 'react'
import SimpleMap from "./map";
import injectSheet from 'react-jss'

const styles ={
    map: {
      width: '50%',
      paddingLeft: '5%'
    }
  }


class HomeView extends Component {

    render() {
        const defaultProps = {
            center: {
              lat: 39.95,
              lng: -77.33
            },
            zoom: 4
          };

        const bonaire = {
            center: {
                lat: 12.2,
                lng: -68.2
              },
        }
      return (
        <div>
            <header> Where did I go? 
            </header>
            <div className={this.props.classes.map}>
                <SimpleMap {...defaultProps} />
            </div>
        </div>
      );
    }
}

export default injectSheet(styles)(HomeView);

 

