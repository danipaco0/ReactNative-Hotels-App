import React, {useState} from 'react';
import { View,StyleSheet } from 'react-native';
import InputBox from '../../Components/InputBox/InputBox';

const SignInScreen = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <View style={styles.container}>
            <InputBox placeholder="Username" value={username} setValue={setUsername}/>
            <InputBox placeholder="Password" value={password} setValue={setPassword}/>
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