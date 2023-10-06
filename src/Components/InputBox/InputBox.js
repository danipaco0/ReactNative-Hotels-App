import React from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';

const InputBox = ({value, setValue, placeholder}) => {
    return (
        <View>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
            />
        </View>
    )
};

export default InputBox;