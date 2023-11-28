import React, { useState, useRef, useEffect } from 'react';
import InputBox from '../Components/InputBox';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View,StyleSheet, Animated } from 'react-native';
import CustomButton from '../Components/CustomButton';
import MenuButton from '../Components/MenuButton';
import MenuBar from '../Components/MenuBar';
import * as Location from 'expo-location';

export default function HomePage() {
    const [city,setCity] = useState('');
    const [mapFocus, setMapFocus] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const [location, setLocation] = useState(null);
    const progress = useRef(new Animated.Value(40)).current;
    const menuBarAnimation = useRef(new Animated.Value(-250)).current;
    
    useEffect(() => {
        (async () => {
            let{ status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                setErrorMsg('Permission to access location was denied');
                return;
            }
            try {
                const position = await Location.getCurrentPositionAsync();
                if (position && position.coords) {
                    const { latitude, longitude } = position.coords;
                    const latitudeDelta = 0.009;
                    const longitudeDelta = 0.009;
                    setLocation({ latitude, longitude, latitudeDelta, longitudeDelta });
                } else {
                    console.error('Location data is missing.');
                }
            } catch (error) {
                console.error('Error getting location:', error);
            }
        })();
    },[]);

    const onMapDrag = () => {
        if(!mapFocus && !menuOpened){
            setMapFocus(true);
            Animated.timing(progress,{toValue:-60,duration:1000,useNativeDriver:false}).start();
        }
    }

    const onPressMenu = () => {
        Animated.timing(menuBarAnimation,{toValue:0,duration:500,useNativeDriver:false}).start();
        setMenuOpened(true);
    }

    const onPressMap = () => {
        if(menuOpened){
            setMenuOpened(false);
            Animated.timing(menuBarAnimation,{toValue:-250,duration:500,useNativeDriver:false}).start();
        }
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                mapType='terrain'
                initialRegion={location}
                onRegionChangeComplete={onMapDrag}
                onPress={onPressMap}>
            </MapView>
            <Animated.View style={[styles.searchBox,{bottom:progress}]} onPress={onPressMap}>
                <InputBox placeholder="City" value={city} setValue={setCity} bordercolor={'#26be81'}/>
                <CustomButton action="Search" onPress="Nothing" backcolor={'#26be81'} bordercolor={'#26be81'} textcolor={'white'}/>
            </Animated.View>
            <View style={styles.menuButton}>
                <MenuButton onPress={onPressMenu}/>
            </View>
            <Animated.View style={[styles.menu,{left:menuBarAnimation}]}>
                <MenuBar/>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        flex:1
    },
    searchBox:{
        position:'absolute',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        width:'90%',
        height:150,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#26BE81'
    },
    menuButton:{
        position:'absolute',
        left:20,
        top:50,
        backgroundColor:'#26be81',
        borderRadius:20,
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    menu:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent'
    }
  });