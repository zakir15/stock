import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {StackActions} from '@react-navigation/native';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Depan'));

        }, 3000);
    }

    render() {
        return (
        <View>
            <ImageBackground source={require('../screen/image/stock.png')} style={{width: '100%', height:'100%'}} />
        </View>
        );
    }
}

export default SplashScreen;