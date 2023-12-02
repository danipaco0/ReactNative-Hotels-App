import { React, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function SearchPage(){
    const [city, setCity] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [rooms, setRooms] = useState();
    const [adults, setAdults] = useState();
    const [children, setChildren] = useState();

    return(
        <View style={styles.container}>
            <TextInput style={[styles.searchBox, {marginTop:70, justifyContent:"center", paddingLeft:20, width:'90%'}]} placeholder={"Location"}/>
            <View style={{flexDirection:'row', width:'90%', alignItem:'center', justifyContent:'center', marginTop:30}}>
                <TouchableOpacity style={[styles.searchBox, {justifyContent:"center", width:'45%', marginRight:15}]}>
                    <Text style={{opacity:0.5}}>From</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.searchBox, {justifyContent:"center", width:'45%', marginLeft:15}]}>
                    <Text style={{opacity:0.5}}>To</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.searchBox, {marginTop:30, flexDirection:'row', justifyContent:'center', width:'90%'}]}>
                <Text style={{marginRight:10, opacity:0.5}}>Rooms</Text>
                <View style={styles.dot}/>
                <Text style={{marginRight:10, marginLeft:10, opacity:0.5}}>Adults</Text>
                <View style={styles.dot}/>
                <Text style={{marginLeft:10, opacity:0.5}}>Children</Text>
            </TouchableOpacity>
            
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
    }
})