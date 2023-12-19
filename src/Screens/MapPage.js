import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View,StyleSheet, Animated, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import HotelInfo from '../Components/HotelInfo';

function getHotelsInfos(array){
    const hotels = [];
    const keys = Object.keys(array);
    keys.forEach(key => {
        const item = array[key];
        hotels.push(item);
    });
    return hotels;
};

export default function MapPage({route}) {
    const [location, setLocation] = useState(null);
    const [hotel, setHotel] = useState();
    const [photo, setPhoto] = useState();
    const [hotelName, setHotelName] = useState("");
    const [hotelUrl, setHotelUrl] = useState("");
    const [hotelLocation, setHotelLocation] = useState("");
    const [hotelDistance, setHotelDistance] = useState("");
    const data = route.params?.data;
    const cityLatitude = route.params?.lat;
    const cityLongitude = route.params?.long;
    const markers = getHotelsInfos(data?.result || []);
    const infosAnimation = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
        const requestLocation = async () => {
            let{ status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const latitudeDelta = 0.09;
            const longitudeDelta = 0.09;
            console.log(cityLatitude+" DONE "+cityLongitude+" AND "+latitudeDelta);
            setLocation({ cityLatitude, cityLongitude, latitudeDelta, longitudeDelta });
        };
        requestLocation();
    }, [cityLatitude, cityLongitude, data]);

    const showHotelInfos = async (ind) => {
        if(hotel != ind){
            setHotel(ind);
            for(key in markers){
                if(key["hotel_id"] == hotel){
                    setHotelName(markers[key]["hotel_name"]);
                    setHotelLocation(markers[key]["city"]);
                    setHotelDistance(markers[key]["distance"]);
                    setHotelUrl(markers[key]["url"]);
                    setPhoto(markers[key]["image_url"]);
                    break;
                }
            }
        }
        console.log("START");
        Animated.timing(infosAnimation,{toValue:0,duration:500,useNativeDriver:false}).start();
    };
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                mapType='terrain'
                initialRegion={location}>
                    {markers.map((marker,index) => (
                        <Marker
                            key={index}
                            coordinate={{latitude:marker["latitude"], longitude:marker["longitude"]}}
                            onPress={() => showHotelInfos(index)}
                        />
                    ))}
            </MapView>
            <Animated.View style={[styles.preview,{top:infosAnimation}]}>
                <HotelInfo preview={{uri:photo}} hotelName={hotelName} hotelLocation={hotelLocation} hotelUrl={hotelUrl} centerDistance={hotelDistance}/>
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
        height:'90%',
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
    },
    preview:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignContent:'center', 
        alignSelf:'center', 
        position:'absolute'
    }
  });