import React, {useState} from 'react';
import { View,StyleSheet, Image } from 'react-native';
import InputBox from '../Components/InputBox';
import CustomButton from '../Components/CustomButton';
import Logo from '../assets/logo.png'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalState } from '../Context/GlobalStateContext';

const SignInScreen = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigation = useNavigation();
    const { dispatch } = useGlobalState();
    const [user, setUser] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            setEmail('');
            setPassword('');
        },[])
    );

    const onSignInPressed = async () => {
        if(email && password){
            console.log("GOOD");
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            setUser(userCredential.user.email);
            dispatch({type:'SET_USER', payload:{user: userCredential.user.email}})
            navigation.navigate("HomeScreen")
        }
        else{
            alert("Erreur");
        }
    };
    
    const onSignUpPressed = async () => {
        if(email && password){
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            setUser(email);
            dispatch({type:'SET_USER', payload:{user: userCredential.user.email}})
            navigation.navigate("HomeScreen")
        }
        else{
            alert("Erreur");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoStyle}/>
            <View style={{top:150}}>
                <InputBox placeholder="Email" value={email} setValue={setEmail} borderColor={'white'} secure={false}/>
                <InputBox placeholder="Password" value={password} setValue={setPassword} borderColor={'white'} secure={true}/>
                <CustomButton action='Sign in' onPress={onSignInPressed} backcolor={'#26be81'} bordercolor={'#26be81'} textcolor={'white'}/>
                <CustomButton action='Sign up' onPress={onSignUpPressed} backcolor={'white'} bordercolor={'#26be81'} textcolor={'#26be81'}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    },
    logoStyle:{
        width:350,
        height:175,
        borderRadius:10,
        top:100
    }
});

export default SignInScreen;