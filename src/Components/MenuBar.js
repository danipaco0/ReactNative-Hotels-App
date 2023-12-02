import React from 'react';
import { StyleSheet,TouchableOpacity,View,Text,Image, Dimensions } from 'react-native';
import profilePicture from '../assets/profile.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfilePage from '../Screens/ProfilePage';
import HomePage from '../Screens/HomePage';

const Tab = createBottomTabNavigator();

export default function MenuTabs(){
    return(
        <Tab.Navigator  initialRouteName="HomePage" screenOptions={styles.menu}>
            <Tab.Screen name="Home" component={HomePage} 
                        options={{
                            tabBarIcon:({focused})=>{
                                return(
                                    <View style={styles.menuItemPosition}>
                                        <Image name="profilePicture" size={24} color={focused ? "#26BE81":"#111"}/>
                                        <Text style={styles.menuItemOptions}>HOME</Text>
                                    </View>
                                )
                            }
                        }}/>
            <Tab.Screen name="Profile" component={ProfilePage}
                        options={{
                            tabBarIcon:({focused})=>{
                                return(
                                    <View style={styles.menuItemPosition}>
                                        <Image name="profilePicture" size={24} color={focused ? "#26BE81":"#111"}/>
                                        <Text style={styles.menuItemOptions}>PROFILE</Text>
                                    </View>
                                )
                            }
                        }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    picture:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:20
    },
    menuItemPosition:{
        alignItems:'center',
        justifyContent:'center'
    },
    menuItemOptions:{
        fontSize:12,
        color:"#26BE81"
    },
    menu:{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle:{
            position:"absolute",
            bottom:0,
            right:0,
            left:0,
            height:60
        }
    }
});