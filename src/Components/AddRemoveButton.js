import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function PlusButton({action}){
    return(
        <TouchableOpacity style={styles.container}>
            <Text>{action}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:12,
        height:12,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1.5,
        borderColor:'black'
    }
})