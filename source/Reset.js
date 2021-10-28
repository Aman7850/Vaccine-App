import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View,Image, ImageBackground, Alert} from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'VaccineDatabase.db' });

const image = { uri: "https://media.discordapp.net/attachments/851459670412361751/884697819938684968/pexels-photo-5863400.jpeg" };
const logo = {
    uri: 'https://cdn.discordapp.com/attachments/883289193109942322/885531485820575784/OWP_LOGO-scroll.png',
    width: 130,
    height: 130,
    
  };

const Reset = () => {
  
    const navigation = useNavigation();
    return (

        <View style = {styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Image style={styles.logo} source={logo} />

            <View style = {{height:'30%', alignItems:'center', marginBottom:'14%'}}>
                <Text style = {{fontSize:20, fontStyle:'italic', fontWeight:'bold', alignSelf:'center', margin:5}}>Reset Password</Text>
                <TextInput style = {{marginTop:'1.5%', width:280, height:35, justifyContent:'center',}} placeholder = "Enter Registered Email ID"></TextInput>
                <Button mode="contained" onPress={() => navigation.navigate('Generate_New_Password')} style = {{width:'25%', height:'20%', justifyContent:'center', marginTop:25}}>
                    <Text style = {{fontSize:17, fontWeight:'bold', fontStyle:'italic'}}>Reset</Text>
                </Button>
            </View>
            </ImageBackground>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    image: {
      flex: 1,
      justifyContent: "center",
      padding:10
    },
    logo: {
        marginTop:'10%',
       marginBottom:'70%',
        alignSelf:'center'
        
    },
  });

export default Reset
