import React from 'react';
import  { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from './Home';
import PostPhoto from './PostPhoto';
import ProfileDrawer from './ProfileDrawer';

export default createAppContainer(createBottomTabNavigator(
    {
        Home: Home,
        PostPhoto: PostPhoto,
        Profile: {
            screen: ({ screenProps }) => <ProfileDrawer screenProps={{ rootStackNavigator: screenProps.rootStackNavigator }} />
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
                    // Sometimes we want to add badges to some icons. 
                    // You can check the implementation below.
                } else if (routeName === 'PostPhoto') {
                    iconName = `add-box`;
                } else if (routeName === 'Profile') {
                    iconName = `account-box`
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#4488d6',
            inactiveTintColor: 'gray',
            showLabel: false
        },
    }
));