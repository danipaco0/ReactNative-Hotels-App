import React from 'react';
import { View,StyleSheet } from 'react-native';
import InputBox from '../../Components/InputBox/InputBox';

const SignInScreen = () => {

    return (
        <View style={styles.container}>
            <InputBox placeholder="Username"/>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    }
});

export default SignInScreen;