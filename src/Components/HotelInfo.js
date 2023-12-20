import React from "react";
import { View, StyleSheet, Image, Text, Linking, TouchableOpacity } from 'react-native';
import {BlurView} from 'expo-blur';
import locationIcon from '../assets/location_icon.png';
import favoriteIcon from '../assets/favorite_icon.png';
import { addDoc } from 'firebase/firestore';
import { favoritesRef } from '../../firebase';
import arrowIcon from '../assets/arrow_icon.png';


export default function HotelInfo({preview, hotelName, hotelLocation, hotelUrl, centerDistance, username, price, backPress}){
    const AddToFavorites = async () => {
        let doc = await addDoc(favoritesRef, {
            name:hotelName,
            photo:preview,
            city:hotelLocation,
            url:hotelUrl,
            center:centerDistance,
            price:price,
            userId:username
        });
        if(doc && doc.id){
            console.log("SUCCES");
        }
    }
    
    return(
        <View style={styles.container}>
            <Image source={preview} style={styles.firstLayer}/>
            <BlurView intensity={100} style={[styles.infosContainer,{justifyContent:'space-between', borderRadius:20, overflow:'hidden'}]}>
                <View style={{flexDirection:"column", top:15, justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'bold', fontSize:25, color:'white', left:10, maxHeight:150, maxWidth:250}}>{hotelName}</Text>
                        <View style={{flexDirection:'column', maxWidth:150, right:20, alignSelf:'center'}}>
                            <Text style={{fontWeight:'900',fontSize:18, color:'white',alignSelf:'center'}}>{price}</Text>
                            <Text style={{fontWeight:'500',fontSize:15, color:'white', alignSelf:'center'}}>/per night</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', left:10, top:10, justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'500', fontSize:15, color:'white'}}>{hotelLocation}</Text>
                            <View style={{left:20, flexDirection:"row"}}>
                                <Image source={locationIcon} style={{height:15,width:15}}/>
                                <Text style={{fontWeight:'500', fontSize:15, left:10, color:'white'}}>{centerDistance} km to city</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity  style={{bottom:25}} onPress={() => Linking.openURL(hotelUrl)}>
                    <View style={styles.button}>
                        <Text style={{fontWeight:'500', fontSize:15, color:'white'}}>Book now!</Text>
                    </View>
                </TouchableOpacity>
            </BlurView>
            <TouchableOpacity style={{flexDirection:'row', alignSelf:'flex-end'}} onPress={AddToFavorites}>
                <View style={{height:50,width:50,borderRadius:25,backgroundColor:'white',top:50,right:20,justifyContent:'center',alignItems:'center'}}>
                    <Image source={favoriteIcon} style={{height:40,width:40,top:1}}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'flex-start'}} onPress={backPress}>
                <Image source={arrowIcon} style={{height:30,width:30, left:20,top:10}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        position:'relative'
    },
    firstLayer:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center'
    },
    infosContainer:{
        height:230,
        width:'90%',
        borderRadius:50,
        position:"absolute",
        bottom:40
    },
    button:{
        backgroundColor:"#26BE81",
        height:40,
        width:'90%',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    }
})