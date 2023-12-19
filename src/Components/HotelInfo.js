import React from "react";
import { View, StyleSheet, Image, Text, Linking, TouchableOpacity } from 'react-native';
import {BlurView} from 'expo-blur';

export default function HotelInfo({preview, hotelName, hotelLocation, hotelUrl, centerDistance}){
    return(
        <View style={styles.container}>
            <Image source={preview} style={styles.firstLayer}/>
            <BlurView intensity={80} style={styles.infosContainer}>
                <Text>{hotelName}</Text>
                <Text>{hotelLocation}</Text>
                <Text>{centerDistance} km to city</Text>
                <TouchableOpacity onPress={() => Linking.openURL(hotelUrl)}>
                    <Text>Book now!</Text>
                </TouchableOpacity>
            </BlurView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        position:'relative',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    firstLayer:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center'
    },
    infosContainer:{
        height:200,
        width:'90%',
        borderRadius:50,
        justifyContent:'center',
        position:"absolute",
        bottom:20
    }
})