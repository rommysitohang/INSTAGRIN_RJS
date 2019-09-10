import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements'
import { connect} from 'react-redux';
import { logoutUser } from '../actions';

class Settings extends Component {
    
    onBtnLogOutPress = () => {
        // logoutUser adalah action creater apabila tanpa this.props
        // maka functionnya akan jalan, namun tidak akan masuk ke reducers
        
        this.props.logoutUser();
    }

    componentDidUpdate() {
        if(!this.props.user) {
            this.props.screenProps.rootStackNavigator.navigate('Login');
        }
    }

    render() {
        return(
            <View>
                <Header
                    placement='left'
                    centerComponent={{
                        text: 'Settings',
                        style: { color: 'black', fontSize: 18}
                    }}
                    leftComponent={{
                        icon: 'arrow-back',
                        color: 'black',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -30
                    }}
                />
                <Button 
                    icon={{
                        name: 'logout',
                        type: 'antdesign',
                        size: 25,
                        color: '#4388d6'
                    }}
                    title='Log Out'
                    containerStyle={{ marginTop: 30, marginHorizontal: 15 }}
                    type='outline'
                    onPress={this.onBtnLogOutPress}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, { logoutUser })(Settings);