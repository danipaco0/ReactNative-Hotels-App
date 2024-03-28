import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const options = {
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
    params: {
      text: '',
      languagecode: 'fr'
    },
    headers: {
      'X-RapidAPI-Key': '6a8481b17bmsh3a07156e02e0bb9p114047jsn22e3ff9daf63',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
};

const filters = {
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
    params: {
      offset: '0',
      arrival_date: '',
      departure_date: '',
      guest_qty: '',
      dest_ids: '',
      room_qty: '',
      search_type: 'latlong',
      children_qty: '',
      latitude:'',
      longitude:'',
      price_filter_currencycode: 'EUR',
      order_by: 'popularity',
      languagecode: 'fr'
    },
    headers: {
      'X-RapidAPI-Key': '6a8481b17bmsh3a07156e02e0bb9p114047jsn22e3ff9daf63',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  };

export default function SearchPage(){
    const [city, setCity] = useState();
    const [dateFrom, setDateFrom] = useState('From');
    const [dateTo, setDateTo] = useState('To');
    const [dateFromOrTo, setDateFromOrTo] = useState();
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [showModalDate, setShowModalDate] = useState(false);
    const [showModalExtra, setShowModalExtra] = useState(false);

    const navigation = useNavigation();

    async function searchHotels() {
        if(!city){
            alert("Please enter a location.");
        }
        else if(dateFrom === 'From' || dateTo === 'To'){
            alert("Please select arrival and departure dates.");
        }
        else if(new Date(dateFrom) >= new Date(dateTo)){
            alert("Arrival date must be earlier than departure date.");
        }
        else if(new Date(dateFrom) < new Date()){
            alert("Wrong arrival date.");
        }
        else{
            filters.params.arrival_date = dateFrom;
            filters.params.departure_date = dateTo;
            filters.params.guest_qty = adults;
            filters.params.children_qty = children;
            filters.params.room_qty = rooms;
            options.params.text = city;
            console.log("FIRST = "+city);
            try {
                const response = await axios.request(options);
                if (response.data && response.data.length > 0) {
                    console.log("SECOND = ",response.data);
                    const locationData = response.data[0];
                    const updatedLatitude = locationData.latitude; 
                    const updatedLongitude = locationData.longitude;
                    filters.params.latitude = updatedLatitude;
                    filters.params.longitude = updatedLongitude;
                    try {
                        const hotelsResponse = await axios.request(filters);
                        console.log("THIRD = ",hotelsResponse.data.result);
                        navigation.navigate("Map", {
                            data: hotelsResponse.data,
                            lat: updatedLatitude,
                            long: updatedLongitude
                        });
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    alert("Please try again.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return(
        <View style={styles.container}>
            <TextInput style={[styles.searchBox, {marginTop:70, justifyContent:"center", paddingLeft:20, width:'90%'}]} placeholder={"Location"} value={city} onChangeText={setCity}/>
            <View style={{flexDirection:'row', width:'90%', alignItem:'center', justifyContent:'center', marginTop:30}}>
                <TouchableOpacity style={[styles.searchBox, {justifyContent:"center", width:'48%', marginRight:5}]} onPress={() => {
                    setDateFromOrTo('From');
                    setShowModalDate(true);}}>
                    <Text style={{opacity:0.5}}>{dateFrom}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.searchBox, {justifyContent:"center", width:'48%', marginLeft:5}]} onPress={() => {
                    setDateFromOrTo('To');
                    setShowModalDate(true);}}>
                    <Text style={{opacity:0.5}}>{dateTo}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.searchBox, {top:30, flexDirection:'row', justifyContent:'center', width:'90%'}]} onPress={() => {
                setShowModalExtra(true);
            }}>
                <Text style={{marginRight:10, opacity:0.5}}>{rooms}</Text>
                <View style={styles.dot}/>
                <Text style={{marginRight:10, marginLeft:10, opacity:0.5}}>{adults}</Text>
                <View style={styles.dot}/>
                <Text style={{marginLeft:10, opacity:0.5}}>{children}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={() => searchHotels()}>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Search</Text>
            </TouchableOpacity>
            <Modal visible={showModalDate} animationType="fade">
                <Calendar style={{borderRadius:5, margin:40}} onDayPress={date => {
                    if(dateFromOrTo === 'From'){
                        setDateFrom(date.dateString);
                    }
                    else if(dateFromOrTo === 'To'){
                        setDateTo(date.dateString);
                    }
                    setShowModalDate(false);}}/>
            </Modal>
            <Modal visible={showModalExtra} animationType="fade">
                <View style={{flex:1, width:'90%', height:250, borderRadius:10, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'row', height:50, justifyContent:'left', alignContent:'center', alignItems:'center'}}>
                        <Text style={{paddingLeft:10, marginRight:50}}>Number of rooms</Text>
                        <TouchableOpacity onPress={() => {
                            if(rooms > 1){
                                setRooms(rooms-1);
                            }
                        }}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:10, marginRight:10}}>{rooms}</Text>
                        <TouchableOpacity onPress={() => {
                            setRooms(rooms+1);
                        }}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', height:50, justifyContent:'left', alignContent:'center', alignItems:'center'}}>
                        <Text style={{paddingLeft:10, marginRight:50}}>Adult (16+)</Text>
                        <TouchableOpacity onPress={() => {
                            if(adults > 1){
                                setAdults(adults-1);
                            }
                        }}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:10, marginRight:10}}>{adults}</Text>
                        <TouchableOpacity onPress={() => {
                            setAdults(adults+1);
                        }}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', height:50, justifyContent:'left', alignContent:'center', alignItems:'center'}}>
                        <Text style={{paddingLeft:10, marginRight:50}}>Children</Text>
                        <TouchableOpacity onPress={() => {
                            if(children > 0){
                                setChildren(children-1);
                            }
                        }}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:10, marginRight:10}}>{children}</Text>
                        <TouchableOpacity onPress={() => {
                            setChildren(children+1);
                        }}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => {setShowModalExtra(false);}}>
                        <Text style={{color:'white'}}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        position:'relative',
        backgroundColor:'#F3F3F3'
    },
    searchBox:{
        alignItems:'center',
        backgroundColor:'white',
        height:50,
        borderRadius:25
    },
    dot:{
        height:2,
        width:2,
        backgroundColor:'black',
        borderRadius:1
    },
    confirmButton:{
        alignItems:'center',
        justifyContent:'center',
        left:20,
        top:20,
        height:50,
        width:'70%',
        borderRadius:25,
        backgroundColor:"#26BE81"
    },
    searchButton:{
        alignItems:'center',
        justifyContent:'center',
        height:50,
        top:50,
        width:'50%',
        borderRadius:25,
        backgroundColor:"#26BE81"
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20
    }
})