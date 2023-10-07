import React, {useState} from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import InputBox from '../Components/InputBox';
import CustomButton from '../Components/CustomButton';

const SignInScreen = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    return (
        <View style={styles.container}>
            <InputBox placeholder="Username" value={username} setValue={setUsername}/>
            <InputBox placeholder="Password" value={password} setValue={setPassword}/>
            <CustomButton action='Sign in' onPress={onSignInPressed} backcolor={'#5f9ea0'} bordercolor={'#5f9ea0'} textcolor={'white'}/>
            <CustomButton action='Sign up' onPress={onSignUpPressed} backcolor={'white'} bordercolor={'#5f9ea0'} textcolor={'#5f9ea0'}/>
        </View>
    )
};

const onSignInPressed = () => {
    console.warn('Signed in');
};

const onSignUpPressed = () => {
    console.warn('Signed up')
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    }
});

export default SignInScreen;