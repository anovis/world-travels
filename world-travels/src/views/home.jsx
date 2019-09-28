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
              lat: 59.95,
              lng: 30.33
            },
            zoom: 11
          };
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

 

