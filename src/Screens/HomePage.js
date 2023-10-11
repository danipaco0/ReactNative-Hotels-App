import React, { useState } from 'react';
import InputBox from '../Components/InputBox';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View,StyleSheet, Button } from 'react-native';
import CustomButton from '../Components/CustomButton';

export default function App() {
    let location = {
        latitude: 50.811662,
        longitude: 4.378989,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    }
    
    const [city,setCity] = useState('');

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType='standard'
            region={location}>
                <Marker coordinate={{ latitude: 50.811662, longitude: 4.378989 }}/>
            </MapView>
            <View style={styles.searchBox}>
                <InputBox placeholder="City" value={city} setValue={setCity} bordercolor={'#26be81'}/>
                <CustomButton action="Search" onPress="Nothing" backcolor={'#26be81'} bordercolor={'#26be81'} textcolor={'white'}/>
            </View>
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
        bottom:30,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#26BE81'
    }
  });