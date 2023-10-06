import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'

const CustomButton = ({onPress}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>
                Press me
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#5f9ea0',
        borderRadius:5,
        alignItems:'center',
        padding:20
    },
    text:{
        fontWeight:'bold',
        color:'white',
        fontSize:20
    }
});

export default CustomButton;