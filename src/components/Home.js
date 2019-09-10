import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import firebase from '@firebase/app';
import '@firebase/storage';
import '@firebase/database';
import '@firebase/auth';
import _ from 'lodash';

class Home extends Component {
    state = { postList: [] }

    componentDidMount() {
        firebase.database().ref(`/posts`)
        .on('value', snapshot => {
            console.log(snapshot.val()) 
            var postList = []
            _.map(snapshot.val(), (val, id) => {
                firebase.database().ref(`/users/${val.userId}`)
                .once('child_added', (snapshot) => {
                    var value = snapshot.val()
                    console.log(value)
                    postList.push({
                        ...val,
                        id,
                        username: value.displayName,
                        userPhoto: value.photoURL
                    })
                    this.setState({ postList })
                })                                                         
            });           
        });
    }

    renderPostList = () => {
        return this.state.postList.map((val, id) => {
            return (
                <View style={{marginHorizontal: 15, marginVertical: 15 }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: val.userPhoto}}/>
                                <Body>
                                    <Text>{val.username}</Text>
                                    <Text note>INSTAGRIN USER</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: val.imageURL}} style={{ height: 350, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Text>{val.caption}</Text>
                        </CardItem>
                    </Card>
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{flex: 1 }}>
                <Header
                    leftComponent={{ 
                        text: 'INSTAGRIN',
                        style: { color: 'black', fontSize: 18 }}}
                    leftContainerStyle={{ flex: 3 }}                                
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 35
                    }}
                /> 
                <ScrollView>
                    {this.renderPostList()}
                </ScrollView>
            </View>
        )
    }
}

export default Home