import React from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';

const InputBox = ({value, setValue, placeholder}) => {
    return (
        <View style={styles.container}>
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
        backgroundColor:'#f0f8ff',
        width:200,
        height:40,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    box:{
        fontSize:20
    }
});

export default InputBox;