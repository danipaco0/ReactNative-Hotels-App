import React, { useState, useRef, useEffect } from 'react';
import InputBox from '../Components/InputBox';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View,StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../assets/search_icon.png';
import Paris from '../assets/paris.jpg';

export default function HomePage() {
    const navigation = useNavigation();

    const onSearchPress = () => {
        navigation.navigate("SearchScreen");
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.firstLayer}>
                <Image source={Paris} resizeMode='contain' style={{width:600, height:1200}}/>
            </View>
            <TouchableOpacity style={styles.searchBox} onPress={onSearchPress}>
                <Image source={SearchIcon} style={styles.searchIcon}/>
                <Text style={{opacity:0.5}}>Where are you going?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        position:'relative'
    },
    searchBox:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        width:'90%',
        height:50,
        borderRadius:25,
        marginTop:50
    },
    searchIcon:{
        width:35,
        height:35,
        marginLeft:10
    },
    firstLayer:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center'
    }
  });