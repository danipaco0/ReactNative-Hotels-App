import React from 'react';
import { StyleSheet,TouchableOpacity,View,Text,Image, Dimensions } from 'react-native';
import profilePicture from '../assets/profile.png';
import { useNavigation } from '@react-navigation/native';

export default function MenuBar(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate("Profile")}>
                <Image style={styles.picture} source={profilePicture}/>
                <Text style={styles.item}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.item}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.item}>About us</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:250,
        height:Dimensions.get('screen').height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#26be81'
    },
    item:{
        color:'white',
        fontSize:25
    },
    picture:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:20
    },
    profile:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'white',
        width:'100%',
        height:70
    }
})