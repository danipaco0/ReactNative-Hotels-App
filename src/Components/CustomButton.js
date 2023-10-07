import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const CustomButton = ({onPress, action, backcolor, bordercolor,textcolor}) => {
    const colorStyle = {
        ...styles.container,
        backgroundColor: backcolor,
        borderColor:bordercolor
    }
    const textStyle = {
        ...styles.text,
        color:textcolor
    }

    return (
        <TouchableOpacity onPress={onPress} style={colorStyle}>
            <Text style={textStyle}>{action}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        borderRadius:5,
        alignItems:'center',
        padding:20,
        marginTop:20,
        borderWidth:2
    },
    text:{
        fontWeight:'bold',
        fontSize:20
    }
});

export default CustomButton;