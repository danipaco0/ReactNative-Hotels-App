import React, {useState} from 'react';
import { View,StyleSheet, Image } from 'react-native';
import InputBox from '../Components/InputBox';
import CustomButton from '../Components/CustomButton';
import Logo from '../assets/logo.png'

const SignInScreen = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoStyle}/>
            <InputBox placeholder="Username" value={username} setValue={setUsername}/>
            <InputBox placeholder="Password" value={password} setValue={setPassword}/>
            <CustomButton action='Sign in' onPress={onSignInPressed} backcolor={'#26be81'} bordercolor={'#26be81'} textcolor={'white'}/>
            <CustomButton action='Sign up' onPress={onSignUpPressed} backcolor={'white'} bordercolor={'#26be81'} textcolor={'#26be81'}/>
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
    },
    logoStyle:{
        width:200,
        height:100,
        borderRadius:10,
        marginTop:10
    }
});

export default SignInScreen;