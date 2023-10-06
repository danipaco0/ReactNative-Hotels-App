import React, {useState} from 'react';
import { View,StyleSheet } from 'react-native';
import InputBox from '../Components/InputBox';
import CustomButton from '../Components/CustomButton';

const SignInScreen = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <View style={styles.container}>
            <InputBox placeholder="Username" value={username} setValue={setUsername}/>
            <InputBox placeholder="Password" value={password} setValue={setPassword}/>
            <CustomButton text='Sign in' onPress={onSignInPressed}/>
        </View>
    )
};

const onSignInPressed = () => {
    console.warn('Signed in');
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    }
});

export default SignInScreen;