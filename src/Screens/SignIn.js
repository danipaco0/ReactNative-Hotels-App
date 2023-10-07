import React, {useState} from 'react';
import { View,StyleSheet, Image } from 'react-native';
import InputBox from '../Components/InputBox';
import CustomButton from '../Components/CustomButton';
import Logo from '../assets/logo.png'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSignInPressed = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((re)=>{
            console.log("OK")
        })
        .catch(error => alert(error.message))
    };
    
    const onSignUpPressed = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredentials) => {
            console.log(userCredentials);
        })
        .catch(error => alert(error.message))
    };

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoStyle}/>
            <InputBox placeholder="Email" value={email} setValue={setEmail}/>
            <InputBox placeholder="Password" value={password} setValue={setPassword}/>
            <CustomButton action='Sign in' onPress={onSignInPressed} backcolor={'#26be81'} bordercolor={'#26be81'} textcolor={'white'}/>
            <CustomButton action='Sign up' onPress={onSignUpPressed} backcolor={'white'} bordercolor={'#26be81'} textcolor={'#26be81'}/>
        </View>
    )
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