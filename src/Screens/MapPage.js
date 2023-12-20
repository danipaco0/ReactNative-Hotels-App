import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View,StyleSheet, Animated, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import HotelInfo from '../Components/HotelInfo';
import useGlobalState from '../Context/GlobalStateContext';
import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos',
    params: {
      hotel_ids: '',
      languagecode: 'en-us'
    },
    headers: {
      'X-RapidAPI-Key': 'bd5acb5bd0msh2b1b7ef314eb43cp1f9f91jsn41d22e3fdab7',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  };

function getHotelsInfos(array){
    const hotels = [];
    const keys = Object.keys(array);
    keys.forEach(key => {
        const item = array[key];
        hotels.push(item);
    });
    return hotels;
};

async function getHotelPhotos(id){
    options.params.hotel_ids = id;
    try {
        const response = await axios.request(options);
        for(key in response.data["data"][id]){
            if(response.data["data"][id][key]["3"]["0"]["tag"] != undefined && 
            (response.data["data"][id][key]["3"]["0"]["tag"] == "Property building" || response.data["data"][id][key]["3"]["0"]["tag"] == "Facade/entrance")){
                return response.data["url_prefix"]+response.data["data"][id][key][4];
            }
            else{
                return response.data["url_prefix"]+response.data["data"][id][0][4];
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export default function MapPage({route}) {
    const [location, setLocation] = useState(null);
    const [hotel, setHotel] = useState();
    const [photo, setPhoto] = useState();
    const [hotelName, setHotelName] = useState("");
    const [hotelUrl, setHotelUrl] = useState("");
    const [hotelLocation, setHotelLocation] = useState("");
    const [hotelDistance, setHotelDistance] = useState("");
    const [hotelPrice, setHotelPrice] = useState("");
    const [currentUser, setUser] = useState("");
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
                if(key == hotel){
                    const id = markers[key]["hotel_id"];
                    setHotelName(markers[key]["hotel_name"]);
                    setHotelLocation(markers[key]["city"]);
                    setHotelDistance(markers[key]["distance"]);
                    setHotelUrl(markers[key]["url"]);
                    setHotelPrice(markers[key]["price_breakdown"]["gross_price"]+" "+markers[key]["price_breakdown"]["currency"]);
                    const fetchPhoto = await getHotelPhotos(id);
                    setPhoto(fetchPhoto);
                    break;
                }
            }
        }
        const UserProfile = () => {
            const { state } = useGlobalState();
            const user = state.user;
            setUser(user);
        }
        Animated.timing(infosAnimation,{toValue:0,duration:500,useNativeDriver:false}).start();
    };

    const closePreview = () => {
        Animated.timing(infosAnimation,{toValue:1000, duration:500, useNativeDriver:false}).start();
    }
    
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
                <HotelInfo backPress={closePreview} preview={{uri:photo}} hotelName={hotelName}
                hotelLocation={hotelLocation} hotelUrl={hotelUrl} centerDistance={hotelDistance} 
                username={currentUser} price={hotelPrice}/>
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
        flex:1,
        width: "100%",
        height: "100%",
        alignContent:'center', 
        alignSelf:'center', 
        position:'absolute'
    }
  });