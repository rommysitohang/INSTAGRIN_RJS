import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app'
import 'firebase/auth';
import {connect} from 'react-redux';
import Main from './Main';
import {alreadyLogin, notLoginYet} from '../actions'

class AppInit extends Component {
    componentDidMount() {
         // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBZRB4OV1rHRPkazxG1xTyMcySW_-lXb1M",
        authDomain: "instagrinrjs.firebaseapp.com",
        databaseURL: "https://instagrinrjs.firebaseio.com",
        projectId: "instagrinrjs",
        storageBucket: "instagrinrjs.appspot.com",
        messagingSenderId: "55535524116",
        appId: "1:55535524116:web:60906eaee75d8b71"
  };
  // Initialize Firebase
  if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.props.alreadyLogin({ user });
        } else {
            this.props.notLoginYet();
        }
    })
    
}
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Main />
            </View>
        );
    }
}


export default connect(null, { alreadyLogin, notLoginYet}) (AppInit);