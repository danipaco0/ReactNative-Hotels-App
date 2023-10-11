import React, { useState, useRef, useEffect } from 'react';
import InputBox from '../Components/InputBox';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View,StyleSheet, Animated } from 'react-native';
import CustomButton from '../Components/CustomButton';

export default function App() {
    let location = {
        latitude: 50.811662,
        longitude: 4.378989,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    };

    const [city,setCity] = useState('');
    const [mapFocus, setMapFocus] = useState(false);
    const progress = useRef(new Animated.Value(40)).current;

    const onMapDrag = () => {
        if(!mapFocus){
            setMapFocus(true);
            Animated.timing(progress,{toValue:-60,duration:1000,useNativeDriver:false}).start();
        }
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.container}
                provider={PROVIDER_GOOGLE}
                mapType='standard'
                initialRegion={location}
                onRegionChangeComplete={onMapDrag}>
                    <Marker coordinate={{ latitude: 50.811662, longitude: 4.378989 }}/>
            </MapView>
            <Animated.View style={[styles.searchBox,{bottom:progress}]}>
                <InputBox placeholder="City" value={city} setValue={setCity} bordercolor={'#26be81'}/>
                <CustomButton action="Search" onPress="Nothing" backcolor={'#26be81'} bordercolor={'#26be81'} textcolor={'white'}/>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
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
    }
  });