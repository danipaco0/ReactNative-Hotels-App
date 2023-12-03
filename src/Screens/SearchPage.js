import { React, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import AddRemoveButton from "../Components/AddRemoveButton";

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
            <TouchableOpacity style={[styles.searchBox, {marginTop:30, flexDirection:'row', justifyContent:'center', width:'90%'}]} onPress={() => {
                setShowModalExtra(true);
            }}>
                <Text style={{marginRight:10, opacity:0.5}}>{rooms}</Text>
                <View style={styles.dot}/>
                <Text style={{marginRight:10, marginLeft:10, opacity:0.5}}>{adults}</Text>
                <View style={styles.dot}/>
                <Text style={{marginLeft:10, opacity:0.5}}>{children}</Text>
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
                            if(rooms > 0){
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
                            if(adults > 0){
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
        height:50,
        width:'70%',
        borderRadius:25,
        backgroundColor:"#26BE81"
    }
})