import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Animated } from 'react-native';
import { getDocs, query, where, deleteDoc, doc } from '@firebase/firestore';
import { useGlobalState } from '../Context/GlobalStateContext';
import { favoritesRef } from '../../firebase';
import { useFocusEffect } from '@react-navigation/core';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SwipeableRow = ({ children, itemId, onItemDeleted }) => {
    const renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
  
        const onDelete = async () => {
            try {
                await deleteDoc(doc(favoritesRef, itemId));
                onItemDeleted(itemId);
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        };
  
      return (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBox}>
          <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
            Delete
          </Animated.Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <Swipeable renderRightActions={renderRightActions}>
        {children}
      </Swipeable>
    );
  };

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const { state } = useGlobalState();
    const user = state.user;

    const fetchFavorites = async() => {
        const q = query(favoritesRef, where("userId.user","==",user.user));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc=>{
            data.push({...doc.data(), id:doc.id});
        });
        setFavorites(data);
    };
    useFocusEffect(useCallback(() => {
        console.log("USER ="+user.user);
        fetchFavorites();
        return () => setFavorites([]);
    }, [])
    );

    const handleItemDeleted = (deletedItemId) => {
        setFavorites((currentFavorites) => currentFavorites.filter(item => item.id !== deletedItemId));
    };

    const HotelCard = ({ name, price, imageUrl, city, center, url }) => {
        const accessPage = () => {
            Linking.openURL(url).catch((err) => {
                alert('Failed to open page');
            });
        };
        return (
          <TouchableOpacity style={styles.card} onPress={accessPage}>
            <Image source={{ uri: imageUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style={styles.cardPrice}>{price}</Text>
                        <Text style={styles.cardPer}>/per night</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.cardLocation}>{city}</Text>
                    <Image source={require('../assets/hotel_icon.png')} style={{width:25,height:25}}/>
                    <Text style={styles.cardLocation}>{center} km from center</Text>
                </View>
            </View>
          </TouchableOpacity>
        );
      };

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaView style={{flex:1, top:60}}>
                <Text style={{fontSize:40, left:20, fontWeight:'bold', color:'#292626'}}>Favorites</Text>
                <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:170}}>
                    {favorites.map((hotel, index) => (
                        <SwipeableRow key={index} itemId={hotel.id} onItemDeleted={handleItemDeleted}>
                            <HotelCard
                                key={index}
                                name={hotel.name}
                                price={hotel.price}
                                imageUrl={hotel.photo.uri}
                                location={hotel.city}
                                center={hotel.center}
                                url={hotel.url}
                            />
                        </SwipeableRow>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        top:40
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden', // Ensures the image corners are also rounded
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardContent: {
        padding: 16,
        flexDirection:'column'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#292626',
        maxWidth:'60%'
    },
    cardLocation: {
        fontSize: 15,
        marginVertical: 4,
        color:'#595858',
        fontWeight:'500'
    },
    cardPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#292626'
    },
    cardPer:{
        fontSize: 15,
        color:'#595858',
        fontWeight:'700'
    },
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 85,
        height: '100%',
    },
    deleteText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 20,
    }
});

export default FavoritesPage;
