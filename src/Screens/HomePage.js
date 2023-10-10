import React from 'react';
import InputBox from '../Components/InputBox';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View,StyleSheet } from 'react-native';

export default function App() {
    let location = {
        latitude: 50.811662,
        longitude: 4.378989,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    }
    return (
        <MapView style={styles.container}
            provider={PROVIDER_GOOGLE}
            mapType='standard'
            region={location}>
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });