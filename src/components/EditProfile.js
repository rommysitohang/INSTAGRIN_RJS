import React, { Component } from 'react';
import { View, Text, Platform, Image, TouchableWithoutFeedback } from 'react-native';
import { Header, ListItem, Button, Input, Overlay, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
    usernameEditProfileChanged, 
    modalShowing, 
    modalClosing, 
    imageEditProfileChanged,
    saveUpdatedProfile
 } from '../actions';


class EditProfile extends Component {
    openGallery = () => {
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then(img => {
            this.props.imageEditProfileChanged(img.path)
            this.props.modalClosing()
        }).catch(cancel => {
            console.log(cancel)
        })
    }

    openCamera = () => {
        ImagePicker.openCamera({
            width: 700,
            height: 700,
            cropping: true,
        }).then(img => {
            this.props.imageEditProfileChanged(img.path)
            this.props.modalClosing()
        }).catch(cancel => {
            console.log(cancel)
        })
    }

    onIconSavePress = () => {
        if(this.props.oldPhoto !== this.props.profileImage) {
            this.props.saveUpdatedProfile(
                this.props.username,
                this.props.profileImage
            )
        } else {
            this.props.saveUpdatedProfile(
                this.props.username,
                null
            )
        }
    }

    componentDidUpdate() {
        if(this.props.profileUpdated) {
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <View>
                <Header 
                    placement='left'
                    leftComponent={{
                        icon: 'clear',
                        color: 'black',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{
                        text: 'Edit Profile',
                        style: {
                            color: 'black',
                            fontSize: 18
                        }
                    }}
                    rightComponent={{
                        icon: 'done',
                        color: '#4388d6',
                        onPress: this.onIconSavePress
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -30
                    }}
                />
                <View style={{ alignItems: 'center'}} >
                    <Image 
                        source={{uri: this.props.profileImage}} 
                        style={{width: 80, height: 80, borderRadius: 80}}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => this.props.modalShowing()}
                    >
                        <Text style={{ color: '#4388d6', fontSize: 17, paddingTop: 10 }}>
                            Change Profile Photo
                    </Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{paddingTop: 15}}>
                    <Text style={{paddingLeft: 15 }}>Username</Text>
                    <Input 
                        placeholder='Username'
                        value={this.props.username}
                        onChangeText={(text) => this.props.usernameEditProfileChanged(text)}
                    />
                </View>
                <Overlay 
                    isVisible={this.props.modalShow}
                    onBackdropPress={() => this.props.modalClosing()}
                    height={'auto'}
                >
                   <Text
                        style={{
                            fontSize: 18,
                            borderBottomColor: '#cfcfcf',
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            fontWeight:'800'
                        }}
                   >
                       Change Profile Photo
                   </Text>
                  <TouchableWithoutFeedback
                    onPress={this.openGallery}
                  >
                        <Text
                            style={{
                                fontSize: 16,
                                paddingVertical: 15
                            }}
                        >
                            Select From Gallery
                   </Text>
                  </TouchableWithoutFeedback>

                   <TouchableWithoutFeedback
                    onPress={this.openCamera}
                   >
                        <Text
                            style={{
                                fontSize: 16,
                                paddingVertical: 15
                            }}
                        >
                            Open Camera
                        </Text>
                   </TouchableWithoutFeedback>
                </Overlay>
            </View>
        )
    }
}

const mapStateToProps = ({ editProfile, auth }) => {
    return {
        username: editProfile.username,
        profileImage: editProfile.profileImage,
        loading: editProfile.loading,
        error: editProfile.error,
        modalShow: editProfile.modalShow,
        userId: auth.user.user.userId,
        oldPhoto: auth.user.user.photoURL,
        profileUpdated: editProfile.profileUpdated
    }
}

export default connect(mapStateToProps, { 
    usernameEditProfileChanged, 
    modalShowing, 
    modalClosing, 
    imageEditProfileChanged,
    saveUpdatedProfile
})(EditProfile);