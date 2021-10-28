import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View,Image, ImageBackground, Alert, TouchableOpacity} from 'react-native';
import { Button, Card, TextInput} from 'react-native-paper';
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
  const Generate_New_Password = () => {
  
    const navigation = useNavigation();
    return(
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Image style={styles.logo} source={logo} />

    <View style = {styles.container}> 
        <View style = {{marginTop:'25%', height:'50%', alignItems:'center'}}>

            <Text style = {{textAlign:'center', fontSize:22, fontWeight:'bold', fontStyle: 'italic', marginTop:'-10%'}}>Generate New Password</Text>

        <Text style = {{textAlign:'center', fontSize:18, fontWeight:'bold', fontStyle: 'italic', marginTop:30}}>Enter OTP</Text>
        <TextInput style = {{marginTop:'1%', width:350, height:35, justifyContent:'center',}} placeholder = "Enter your OTP here..."></TextInput>

        <Text style = {{textAlign:'center', fontSize:18, fontWeight:'bold', fontStyle: 'italic', marginTop:10}}>Enter New Password</Text>
        <TextInput style = {{marginTop:'1%', width:350, height:35, justifyContent:'center',}} placeholder = "Enter New Password" secureTextEntry={true}></TextInput>

        <Text style = {{textAlign:'center', fontSize:18, fontWeight:'bold', fontStyle: 'italic', marginTop:10}}>Confirm Password</Text>
        <TextInput style = {{marginTop:'1%', width:350, height:35, justifyContent:'center',}} placeholder = "Re-Enter New Password" secureTextEntry={true}></TextInput>
        
        <Card style = {{width:'25%', marginTop:'5%', backgroundColor:'#203cc7', borderRadius:10}}>
        <TouchableOpacity onPress={() => console.log('Pressed')}>
          <Text style = {{alignSelf:'center', fontSize:22}}>Submit</Text>
        </TouchableOpacity>
        </Card>

        </View>
       
    </View>
    </ImageBackground>
    )
}
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
     marginTop:'18%'
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    logo: {
       marginTop:'5%',
        alignSelf:'center'
        
    },
  });
  export default Generate_New_Password;
