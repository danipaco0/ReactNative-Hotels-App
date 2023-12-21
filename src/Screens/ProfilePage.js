import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import ProfilePicture from '../assets/profile.png';
import { useGlobalState } from '../Context/GlobalStateContext';

export default function ProfilePage() {
    const { state } = useGlobalState();
    const user = state.user;

    return (
        <View style={styles.container}>
            <Image style={styles.picture} source={ProfilePicture}/>
            <Text style={{top:20, fontSize:20, fontWeight:'bold'}}>{user.user}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    },
    picture:{
        width:100,
        height:100,
        marginTop:100,
        borderRadius:40,
        alignSelf:'center'
    }
})