import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Button, Icon, Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from '@firebase/app';
import '@firebase/storage';
import '@firebase/database';
import '@firebase/auth';
import RNFetchBlob from 'react-native-fetch-blob'


class PostPhoto extends Component {
    state = { caption: '', image: null }

    onBtnSelectGalleryPress = () => {
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
          }).then(image => {
              this.setState({ image }) 
        
          }).catch( cancel => {
              console.log(cancel)
          })
    }

    onBtnOpenCameraPress = () => {
        ImagePicker.openCamera({
            width: 700,
            height: 700,
            cropping: true,
        }).then(image => {
              this.setState({ image }) 
        
          }).catch( cancel => {
              console.log(cancel)
          })
        
    }

    onBtnPostImagePress = () => {
        this.setState({ loading: true, error: "" })
        const image = this.state.image.path
 
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
 
   
    let uploadBlob = null

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now() + '.jpg'

    const imageRef = firebase.storage().ref('posts').child(uniqid)
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        // URL of the image uploaded on Firebase storage
        console.log(url);
        const { currentUser } = firebase.auth();

        firebase.database().ref(`/posts`)
        .push({ imageURL: url, caption: this.state.caption, userId: currentUser.uid})
        .then(() => {
            this.setState({ loading: false })
        }).catch((err) => {
            this.setState({ loading: false,  error: err.message })
        })
        
      })
      .catch((error) => {
        console.log(error);
 
      })  
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{ 
                        text: 'Select Image',
                        style: { color: 'black', fontSize: 18 }
                    }}
                    leftContainerStyle={{ flex: 3 }}                                       
                    
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 35
                    }}
                /> 
                <ScrollView>
                <View style={{ marginVertical: 20, marginHorizontal: 15}}>
                <Button
                   icon={
                        <Icon
                        name="photo-library"
                        size={30}
                        color="white"
                    />
                   }
                
                title="Select from Gallery"
                onPress={this.onBtnSelectGalleryPress}
                containerStyle={{ marginBottom : 15 }}
                />
               <Button
                    icon={
                        <Icon
                        name="photo-library"
                        size={30}
                        color="white"
                    />
                }
                    title="Open Camera"
                    onPress={this.onBtnOpenCameraPress}
               />
            <Input
                placeholder="Caption"
                onChangeText={(text) => this.setState({ caption: text })}
                value={this.state.caption}
            />
        </View>  
        <View style={{marginHorizontal: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={{uri:this.state.image ? this.state.image.path : null}} style={{height: 350, width: '100%'}}/>
        </View>     
        <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                    <Text style={{ color: 'red' }}>{this.state.error}</Text>
                    <Button
                        icon={
                            <Icon
                                name="cloud-upload"
                                size={30}
                                color="white"
                            />
                        }
                        title="Post Image"
                        onPress={this.onBtnPostImagePress}
                        loading={this.state.loading}
                    />
                </View> 
                </ScrollView>
         
    </View>
            

        )
    }
}

export default PostPhoto;