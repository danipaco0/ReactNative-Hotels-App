import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';

const InputBox = ({value, setValue, placeholder, bordercolor}) => {
    const colorStyle = {
        ...styles.container,
        borderColor:bordercolor
    }
    return (
        <View style={colorStyle}>
            <TextInput 
                style={styles.box}
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:200,
        height:40,
        justifyContent:'space-evenly',
        alignItems:'center',
        borderRadius:5,
        marginTop:20,
        borderWidth:2
    },
    box:{
        fontSize:20,
        color:'black'
    }
});

export default InputBox;