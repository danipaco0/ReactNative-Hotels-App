import React from "react";
import { View,StyleSheet,TouchableOpacity } from "react-native";

export default function MenuButton({onPress}){
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.line}/>
            <View style={styles.line}/>
            <View style={styles.line}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-evenly',
        alignItems:'center',
        width:30,
        height:35,
        backgroundColor:'transparent'
    },
    line:{
        borderRadius:10,
        width:30,
        height:5,
        backgroundColor:'#26be81'
    }
});