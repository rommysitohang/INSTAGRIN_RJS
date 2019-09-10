import React, { Component } from 'react';
import { View, Platform} from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { editProfileInit } from '../actions'

class Profile extends Component {
    onBtnEditProfilePress = () => {
        this.props.editProfileInit(
            this.props.user.user.displayName,
            this.props.user.user.photoURL
        )
        this.props.navigation.navigate('EditProfile')
    }

    render() {
        if(this.props.user) {
            return (
                <View>
                    <Header
                        leftComponent={{
                            text: this.props.user.user.displayName,
                            style: {
                                color: 'black',
                                fontSize: 18
                            }
                        }}
                        leftContainerStyle={{ flex: 3 }}
                        rightComponent={{
                            icon: 'menu',
                            color: 'black',
                            onPress: () => this.props.navigation.toggleDrawer()
                        }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0 : -30
                        }}
                    />
                    <ListItem
                        leftAvatar={{
                            source: { uri: this.props.user.user.photoURL },
                            size: 'large'
                        }}
                        title={this.props.user.user.displayName}
                        subtitle={'Instagrin User'}
                    />
                    <Button 
                        title="Edit Profile"
                        containerStyle={{marginTop: 15, marginHorizontal: 15}}
                        buttonStyle={{borderColor: 'black'}}
                        titleStyle={{color: 'black'}}
                        type='outline'
                        onPress={this.onBtnEditProfilePress}
                    />
                </View>
            )
        }

        return <View />
    }   
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, {editProfileInit})(Profile);