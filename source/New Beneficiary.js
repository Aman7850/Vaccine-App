import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground, FlatList, StatusBar, Alert, TouchableOpacity} from 'react-native';
import { Button, Card, TextInput} from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'BeneficiaryDatabase.db' });


const image = { uri: "https://media.discordapp.net/attachments/851459670412361751/884697819938684968/pexels-photo-5863400.jpeg" };
const New_Beneficiary = () => {
  const [items, setItems] = useState();
    const [selectedLanguage, setSelectedLanguage] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT add_vaccination_id FROM add_vaccination_Table',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                {temp.push(results.rows.item(i));}
              setItems(temp);
              console.log(temp, 'data table 123');
              
     
            }
          );
     
        });
      }, [isFocused]);

    const navigation = useNavigation();

    const [B_Id_Type, setB_Id_Type] = useState('');
    const [B_Id_Number, setB_Id_Number] = useState();
    const [B_Mobile, setB_Mobile] = useState();
    const [B_Name, setB_Name] = useState('');
    const [B_Dob, setB_Dob] = useState();
    const [B_Gender, setB_Gender] = useState('');


    useEffect(() => {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='beneficiary_Table'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS beneficiary_Table(beneficiary_id INTEGER PRIMARY KEY AUTOINCREMENT, beneficiary_id_type VARCHAR(30), beneficiary_id_number INT(15), beneficiary_mobile VARCHAR(255), beneficiary_name VARCHAR(255), beneficiary_dob VARCHAR(255), beneficiary_gender VARCHAR(255))',
                []
              );
            }
          }
        );
      })
   
    }, []);
    const insertData = () => {
 
      if (B_Id_Type == '' || B_Id_Number == '' || B_Mobile == '' || B_Name == '' || B_Dob == '' || B_Gender == '') {
        Alert.alert('Please Enter All the Values');
      } else {
   
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO Beneficiary_Table (Beneficiary_Id_Type, Beneficiary_Id_Number, Beneficiary_Mobile, Beneficiary_Name, Beneficiary_Dob, Beneficiary_Gender) VALUES (?,?,?,?,?,?)',
            [B_Id_Type, B_Id_Number, B_Mobile, B_Name, B_Dob, B_Gender],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                navigation.navigate('Beneficiary_list');
                Alert.alert('Data Inserted Successfully....');
              } else Alert.alert('Failed....');
            }
          );
        });
   
      }
    }

    const renderItem = ({ item }) => (
      <Card style = {{margin:5}}>
          <Text>{item.add_vaccination_vaccine}</Text>
          <Text>{item.add_vaccination_vaccine_date}</Text>
          <Text>{item.add_vaccination_dose_type}</Text>
          <Text>{item.add_vaccination_dose}</Text>
          <Text>{item.add_vaccination_vaccinated_by}</Text>
          <Text>{item.add_vaccination_vaccination_center}</Text>
          <Text>{item.add_vaccination_vaccination_country}</Text>
          <Text>{item.add_vaccination_vaccination_state}</Text>
          <Text>{item.add_vaccination_vaccination_city_district}</Text>
          <Text>{item.add_vaccination_pin_code}</Text>
      </Card>
    );
          
    return(
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style = {styles.container}>
        
            <Text style = {{textAlign:'center', fontSize:25, fontWeight:'bold', fontStyle: 'italic', marginTop:0}}>New Beneficiary</Text>
            
            <View style = {{marginLeft:25, width:'90%', marginTop:10}}>
            <Text style = {{fontWeight:'bold',fontSize:20}}>ID Type</Text>
            <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
            <View style = {{marginTop:-12}}>
            <Picker
              selectedValue={B_Id_Type}
              onValueChange={(itemValue) =>
                setB_Id_Type(itemValue)
              }>
              <Picker.Item label="Addhar Card" value="Addhar Card" />
              <Picker.Item label="Pan Card" value="Pan Card" />
              <Picker.Item label="Voter Id" value="Voter Id" />
              <Picker.Item label="Driving License" value="DL" />
              <Picker.Item label="Passport" value="Passport" />
              <Picker.Item label="Ration Card" value="Ration Card" />
            </Picker>
            </View>
            </Card>
            <Text style = {{fontWeight:'bold', marginTop:'5%', fontSize:20}}>ID Number</Text>
            <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} placeholder = "DL/1234 5678 9012" value = {B_Id_Number} onChangeText = {(text) => setB_Id_Number(text)}></TextInput>
            <Text style = {{fontWeight:'bold',fontSize:20, marginTop:'5%'}}>Mobile</Text>
            <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} placeholder = "9876543210" value = {B_Mobile} onChangeText = {(text) => setB_Mobile(text)}></TextInput>
            <Text style = {{fontWeight:'bold',fontSize:20, marginTop:'5%'}}>Name</Text>
            <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} placeholder = "Abc XYZ" value = {B_Name} onChangeText = {(text) => setB_Name(text)}></TextInput>
            <Text style = {{fontWeight:'bold',fontSize:20, marginTop:'5%'}}>DOB</Text>
            <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} placeholder = "11 Jan 1994" value = {B_Dob} onChangeText = {(text) => setB_Dob(text)}></TextInput>
            <Text style = {{fontWeight:'bold',fontSize:20, marginTop:'5%'}}>Gender</Text>

            <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
            <View style = {{marginTop:-12}}>
            <Picker
              selectedValue={B_Gender}
              onValueChange={(itemValue) =>
                setB_Gender(itemValue)
              }>
              <Picker.Item label="--Select--" />
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
              
            </Picker>
            </View>
            </Card>
              
            <Card style = {{width:'12%', marginLeft:'1%', alignItems:'center', marginTop:'2%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Add Vaccination')}>
              <Text style = {{fontSize:35}}>+</Text>
            </TouchableOpacity>
            </Card>

            <Card style = {{width:'20%', marginLeft:'49%', marginTop:'-9%', borderRadius:10}}>
            <TouchableOpacity onPress={insertData}>
              <Text style = {{fontSize:20, alignSelf:'center'}}>SAVE</Text>
            </TouchableOpacity>
            </Card>

            <Card style = {{width:'25%', marginLeft:'71%', marginTop:'-8%', borderRadius:10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Beneficiary_list')}>
              <Text style = {{fontSize:20, alignSelf:'center'}}>CANCEL</Text>
            </TouchableOpacity>
            </Card>

             <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.add_vaccination_id}
            />
            </View>
        
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    image: {
        justifyContent: 'center',
        flex:1
    }

});
export default New_Beneficiary;
