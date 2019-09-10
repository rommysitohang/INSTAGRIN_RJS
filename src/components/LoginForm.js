import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import {
    emailLoginChanged,
    passwordLoginChanged,
    loginUser
} from '../actions'



class LoginForm extends Component {
    state = { passHidden : true }

    componentDidUpdate() {
        if(this.props.user) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainMenu'})]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    onBtnLoginPress = () => {
        this.props.loginUser(
            this.props.email,
            this.props.password
        )
    }

    render() {
        const { containerStyle, inputStyle } = styles;
        if(this.props.checkedAuth && !this.props.user) {
            return (
                <View style={containerStyle}>
                    <Animatable.Text animation={'fadeInDown'}>
                    <Text h3 h3Style={{ color: '#4388d6'}}>Instagrin</Text>
                    </Animatable.Text>
                    <Animatable.View animation={'lightSpeedIn'} iterationCount={1} style={inputStyle}>
                        <Input
                            placeholder='Email'
                            leftIcon={
                                <Icon
                                    name='email'
                                    size={24}
                                    color='#4388d6'
                                />
                            }
                            value={this.props.email}
                            onChangeText = {(text) => this.props.emailLoginChanged(text)}
                        />
                        <Input
                            secureTextEntry={this.state.passHidden}
                            placeholder='Password'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={24}
                                    color='#4388d6'
                                />
                            }
                            rightIcon={
                                <Icon
                                    name={this.state.passHidden ? 'visibility-off' : 'visibility' }
                                    size={24}
                                    color={this.state.passHidden ? 'grey' : '#2ad447'}
                                    onPress={() => this.setState({ passHidden: !this.state.passHidden})}
                                />
                            }
                            value={this.props.password}
                            onChangeText = {(text) => this.props.passwordLoginChanged(text)}
                        />
                     </Animatable.View>
                    <Button
                        icon={
                            <Icon
                                name="chevron-right"
                                size={15}
                                color="black"
                            />
                        }
                        title="Login"
                        //type="outline"
                        loading={this.props.loading}
                        containerStyle={{ width: '80%' }}
                        onPress={this.onBtnLoginPress}
                    />
                    <Button
                        icon={
                            <Icon
                                name="accessibility"
                                size={15}
                                color="black"
                            />
                        }
                        title="Register"
                        type="outline"                    
                        containerStyle={{ width: '80%' }}
                        onPress={ () => this.props.navigation.navigate('Register')}
                    />
                </View>
            )
        }
        return(
            <View style={containerStyle}>
                <Animatable.Text animation={'bounce'} iterationCount={'infinite'}>
                    <Text h3 h3style={{ color: '#4388d6'}}>Authenticating...</Text>
                </Animatable.Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    inputStyle: {
        marginTop: 30,
        marginBottom: 50,
        width: '100%'
    }
})

const mapStateToProps = ({ loginForm, auth }) => {
    return {
        email : loginForm.email,        
        password : loginForm.password,        
        loading : loginForm.loading,
        error : loginForm.error,
        user : auth.user, 
        checkedAuth: auth.checkedAuth
    }
}

export default connect(mapStateToProps, {
    emailLoginChanged,
    passwordLoginChanged,
    loginUser
})(LoginForm);

