import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ProfilePicture from '../assets/profile.png';

export default function ProfilePage() {
    return (
        <View style={styles.container}>
            <Image style={styles.picture} source={ProfilePicture}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    picture:{
        width:100,
        height:100,
        marginTop:100,
        borderRadius:40,
        alignSelf:'center'
    }
})