import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View,StyleSheet } from 'react-native';
import * as Location from 'expo-location';

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
    const data = route.params?.data;
    const cityLatitude = route.params?.lat;
    const cityLongitude = route.params?.long;
    const markers = getHotelsInfos(data?.result || []);

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

    const showHotelInfos = (ind) => {
        console.log(markers[ind]["hotel_id"]);
        setHotel(ind);
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
    }
  });