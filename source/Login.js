import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View,Image, ImageBackground, Alert, TouchableOpacity} from 'react-native';
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
  const Login = () => {
    
    const [url, setUrl] = useState('');
    const [V_Email_Id, setV_Email_Id] = useState('');
    const [V_Password, setV_Password] = useState('');
    const [V_Membership_Id, setV_Membership_Id] = useState('');
    const [results2, setresults2] = useState('');
    const [results1, setresults1] = useState('');
    const [visible, setvisible] = useState(false);

    useEffect(() => {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='Vaccine_Table'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS Vaccine_Table', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS vaccine_table(vaccine_id INTEGER PRIMARY KEY AUTOINCREMENT, vaccine_email_id VARCHAR(30), vaccine_password INT(15), vaccine_membership_id VARCHAR(255), vaccine_expense_rights VARCHAR(50), vaccine_uid INTEGER(20))',
                []
              );
            }
          }
        );
      })
    
    }, []);


  const searchuser = async () => {
    console.log(V_Membership_Id, V_Password, V_Email_Id);
    setvisible(true);
    const urls = 'https://demo.o2btechnologies.com/o2b/omini/users';
    const response = await fetch(urls,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
        params: {
            membership_id: V_Membership_Id,
            user:{
                login: V_Email_Id,
                password: V_Password,
            },
        },
    }),
  });

  
  const json12 = await response.json();
  console.log(json12,'I am!')
    if (json12.result.hasOwnProperty('error')) {
      console.log(json12.result.error);
      Alert.alert(json12.result.error);
      return 0;
    }
    console.log(typeof json12.result.users, 'array started');
    const obj = JSON.parse(json12.result);
    const results1 = obj.users[0].uid;
    const results2 = obj.users[0].expense_rights;
    console.log(results1, 'see the result'); 


        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO Vaccine_Table (Vaccine_Email_Id, Vaccine_Password, Vaccine_Membership_Id, Vaccine_Expense_Rights, Vaccine_Uid) VALUES (?,?,?,?,?)',
            [V_Email_Id, V_Password, V_Membership_Id, results1, results2],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                navigation.navigate('Beneficiary_list');
                Alert.alert('Data Inserted Successfully....');
              } else Alert.alert('Failed....');
            }
          );
          });
};
  
    const navigation = useNavigation();
    return(
    <View style = {styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Image style={styles.logo} source={logo} />
        <View style = {{marginTop:'50%', height:'50%', alignItems:'center'}}>

        <Text style = {{textAlign:'center', fontSize:20, fontWeight:'bold', fontStyle: 'italic', marginTop:30}}>Email ID</Text>
        <TextInput style = {{marginTop:'1.5%', width:280, height:35, justifyContent:'center',}} placeholder = "Email" value = {V_Email_Id} onChangeText = {(text) => setV_Email_Id(text)}></TextInput>

        <Text style = {{textAlign:'center', fontSize:20, fontWeight:'bold', fontStyle: 'italic', marginTop:10}}>Password</Text>
        <TextInput style = {{marginTop:'1.5%', width:280, height:35, justifyContent:'center',}} placeholder = "Password" secureTextEntry = {true} value = {V_Password} onChangeText = {(text) => setV_Password(text)}></TextInput>
        <TouchableOpacity onPress={() => navigation.navigate('Reset')}>
          <Text style = {{marginLeft:'45%'}}>Reset Password</Text>
        </TouchableOpacity>

        <Text style = {{textAlign:'center', fontSize:20, fontWeight:'bold', fontStyle: 'italic', marginTop:10}}>Membership ID</Text>
        <TextInput style = {{marginTop:'1.5%', width:280, height:35, justifyContent:'center',}} placeholder = "Membership Id" value = {V_Membership_Id} onChangeText = {(text) => setV_Membership_Id(text)}></TextInput>
        <Button mode="contained" onPress={searchuser} style = {{width:'30%', borderRadius:20, height:'15%', justifyContent:'center', marginTop:20}}>
            Login
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
      justifyContent: "center"
    },
    logo: {
        
       
        alignSelf:'center'
        
    },
  });
  export default Login;
