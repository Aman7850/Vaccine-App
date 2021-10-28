import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView, View, Image, ImageBackground, TouchableOpacity, Alert, SafeAreaView, StatusBar, Dimensions} from 'react-native';
import { Button, Card, TextInput} from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { openDatabase } from 'react-native-sqlite-storage';
import {Picker} from '@react-native-picker/picker';

var db = openDatabase({ name: 'AddVaccinationDatabase.db' });

const image = { uri: "https://media.discordapp.net/attachments/851459670412361751/884697819938684968/pexels-photo-5863400.jpeg" };

let width = Dimensions.get('window').width

const Add_Vaccination = () => { 
  const [dropdown, setDropdown] = useState();
  const [dialog, setDialog] = useState();
    const navigation = useNavigation();

    const [Add_V_Vaccine, setAdd_V_Vaccine] = useState('');
    const [Add_V_Vaccine_Date, setAdd_V_Vaccine_Date] = useState('');
    const [Add_V_Dose_Type, setAdd_V_Dose_Type] = useState('');
    const [Add_V_Dose, setAdd_V_Dose] = useState('');
    const [Add_V_Vaccinated_By, setAdd_V_Vaccinated_By] = useState('');
    const [Add_V_Vaccination_Center, setAdd_V_Vaccination_Center] = useState('');
    const [Add_V_Vaccination_Country, setAdd_V_Vaccination_Country] = useState('');
    const [Add_V_Vaccination_State, setAdd_V_Vaccination_State] = useState('');
    const [Add_V_Vaccination_City_District, setAdd_V_Vaccination_City_District] = useState('');
    const [Add_V_Pin_Code, setAdd_V_Pin_Code] = useState('');


    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='add_vaccination_Table'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS add_vaccination_Table(add_vaccination_id INTEGER PRIMARY KEY AUTOINCREMENT, add_vaccination_vaccine VARCHAR(30), add_vaccination_vaccine_date INTEGER(50), add_vaccination_dose_type VARCHAR(255), add_vaccination_dose VARCHAR(255), add_vaccination_vaccinated_by VARCHAR(255), add_vaccination_vaccination_center VARCHAR(255), add_vaccination_vaccination_country VARCHAR(50), add_vaccination_vaccination_state VARCHAR(50), add_vaccination_vaccination_city_district VARCHAR(50), add_vaccination_pin_code INTEGER(20))',
                  []
                );
              }
            }
          );
        })
     
      }, []);

      const insertData = () => {
   
        if (Add_V_Vaccine == '' || Add_V_Vaccine_Date == '' || Add_V_Dose_Type == '' || Add_V_Dose == '' || Add_V_Vaccinated_By == '' || Add_V_Vaccination_Center == '' || Add_V_Vaccination_Country == '' || Add_V_Vaccination_State == '' || Add_V_Vaccination_City_District == '' || Add_V_Pin_Code == '') {
            console.log(Add_V_Vaccine, Add_V_Vaccine_Date, Add_V_Dose_Type, Add_V_Dose, Add_V_Vaccinated_By, Add_V_Vaccination_Center, Add_V_Vaccination_Country, Add_V_Vaccination_State, Add_V_Vaccination_City_District, Add_V_Pin_Code);
          Alert.alert('Please Enter All the Values');
          
        } else {
     
          db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO add_vaccination_Table (Add_Vaccination_Vaccine, Add_Vaccination_Vaccine_Date, Add_Vaccination_Dose_Type, Add_Vaccination_Dose, Add_Vaccination_Vaccinated_By, Add_Vaccination_Vaccination_Center, Add_Vaccination_Vaccination_Country, Add_Vaccination_Vaccination_State, Add_Vaccination_Vaccination_City_District, Add_Vaccination_Pin_Code) VALUES (?,?,?,?,?,?,?,?,?,?)',
              [Add_V_Vaccine, Add_V_Vaccine_Date, Add_V_Dose_Type, Add_V_Dose, Add_V_Vaccinated_By, Add_V_Vaccination_Center, Add_V_Vaccination_Country, Add_V_Vaccination_State, Add_V_Vaccination_City_District, Add_V_Pin_Code],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    navigation.navigate('New Beneficiary')
                  Alert.alert('Data Inserted Successfully....');
                } else Alert.alert('Failed....');
              }
            );
          });
     
        }
      }
    
    
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>

            <Text style = {{textAlign:'center', fontSize:25, fontWeight:'bold', fontStyle: 'italic'}}>Add Vaccination</Text>
            <View style = {{marginLeft:25, width:'90%', marginTop:10}}>
            <Text style = {{fontWeight:'bold', fontSize:20}}>Vaccine</Text>
            
                <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
                <View style = {{marginTop:-12}}>
                <Picker
                    selectedValue={Add_V_Vaccine}
                    onValueChange={(itemValue) =>
                    setAdd_V_Vaccine(itemValue)
                    
              } mode = {dialog, dropdown}>
              <Picker.Item label="--SELECT OPTION--" value="--SELECT OPTION--" />
              <Picker.Item label="COVAXIN" value="COVAXIN" />
              <Picker.Item label="COVISHIELD" value="COVISHIELD" />
              <Picker.Item label="MODERNA" value="MODERNA" />
              <Picker.Item label="PYZER" value="PYZER" />
              <Picker.Item label="SPUTNIK" value="SPUTNIK" />
              
            </Picker>
            </View>
            </Card>
            
            <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Vaccine Date</Text>
            <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} value = {Add_V_Vaccine_Date} onChangeText = {(text) => setAdd_V_Vaccine_Date(text)}></TextInput>

            <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Dose Type</Text>
            <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
            <View style = {{marginTop:-12}}>
            <Picker
                    selectedValue={Add_V_Dose_Type}
                    onValueChange={(itemValue) =>
                    setAdd_V_Dose_Type(itemValue)
              }>
              <Picker.Item label="--SELECT OPTION--" value="--SELECT OPTION--" />
              <Picker.Item label="FIRST DOSE" value="FIRST DOSE" />
              <Picker.Item label="SECOND DOSE" value="SECOND DOSE" />
              
            </Picker>
            </View>
            </Card>

            <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Dose</Text>
            <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
            <View style = {{marginTop:-12}}>
            <Picker
                    selectedValue={Add_V_Dose}
                    onValueChange={(itemValue) =>
                    setAdd_V_Dose(itemValue)
              }>
              <Picker.Item label="--SELECT OPTION--" value="--SELECT OPTION--" />
              <Picker.Item label="FIRST" value="FIRST" />
              <Picker.Item label="SECOND" value="SECOND" />
              
            </Picker>
            </View>
            </Card>

                <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Vaccinated By</Text>
                <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} value = {Add_V_Vaccinated_By} onChangeText = {(text) => setAdd_V_Vaccinated_By(text)}></TextInput>

                <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Vaccination Center</Text>
                <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} value = {Add_V_Vaccination_Center} onChangeText = {(text) => setAdd_V_Vaccination_Center(text)}></TextInput>

                <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Vaccination Country</Text>
                <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
                <View style = {{marginTop:-12}}>
                <Picker
                    selectedValue={Add_V_Vaccination_Country}
                    onValueChange={(itemValue) =>
                    setAdd_V_Vaccination_Country(itemValue)
              }>
              <Picker.Item label="--SELECT OPTION--" value="--SELECT OPTION--" />
              <Picker.Item label="INDIA" value="INDIA" />
              <Picker.Item label="AMERICA" value="AMERICA" />
              <Picker.Item label="FRANCE" value="FRANCE" />
              <Picker.Item label="CHINA" value="CHINA" />
              <Picker.Item label="PAKISTAN" value="PAKISTAN" />
              <Picker.Item label="AUSTRALIA" value="AUSTRALIA" />
              <Picker.Item label="GERMANY" value="GERMANY" />
              <Picker.Item label="JAPAN" value="JAPAN" />
              
            </Picker>
            </View>
            </Card>
                
                <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Vaccination State</Text>
                <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
                <View style = {{marginTop:-12}}>
                <Picker
                    selectedValue={Add_V_Vaccination_State}
                    onValueChange={(itemValue) =>
                    setAdd_V_Vaccination_State(itemValue)
              }>
              <Picker.Item label="--SELECT OPTION--" value="--SELECT OPTION--" />
              <Picker.Item label="UTTAR PRADESH" value="UTTAR PRADESH" />
              <Picker.Item label="KARNATAKA" value="KARNATAKA" />
              <Picker.Item label="MAHARASTRA" value="MAHARASTRA" />
              <Picker.Item label="GUJARAT" value="GUJARAT" />
              <Picker.Item label="RAJASTHAN" value="RAJASTHAN" />
              <Picker.Item label="TAMIL NADU" value="TAMIL NADU" />
              <Picker.Item label="KERALA" value="KERALA" />
              <Picker.Item label="BIHAR" value="BIHAR" />
              
            </Picker>
            </View>
            </Card>
                
                <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Vaccination City/District</Text>
                <Card style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}}>
                <View style = {{marginTop:-12}}>
                <Picker
                    selectedValue={Add_V_Vaccination_City_District}
                    onValueChange={(itemValue) =>
                    setAdd_V_Vaccination_City_District(itemValue)
              }>
              <Picker.Item label="--SELECT OPTION--" value="--SELECT OPTION--" />
              <Picker.Item label="AGRA" value="AGRA" />
              <Picker.Item label="ALIGARH" value="ALIGARH" />
              <Picker.Item label="SONEBHADRA" value="SONEBHADRA" />
              <Picker.Item label="PRAYAGRAJ" value="PRAYAGRAJ" />
              <Picker.Item label="BALLIA" value="BALLIA" />
              <Picker.Item label="LUCKNOW" value="LUCKNOW" />
              <Picker.Item label="BARABANKI" value="BARABANKI" />
              <Picker.Item label="CHITRAKOOT" value="CHITRAKOOT" />
              
            </Picker>
            </View>
            </Card>


                <Text style = {{fontWeight:'bold', marginTop:10, fontSize:20}}>Pin Code</Text>
                <TextInput style = {{marginTop:1, width:350, height:30, marginLeft:2, justifyContent:'center'}} placeholder = "1100092" value = {Add_V_Pin_Code} onChangeText = {(text) => setAdd_V_Pin_Code(text)}></TextInput>
                
                <Card style = {{width:'40%',marginTop:'5%', marginLeft:'-3%', borderRadius:10}}>
                <TouchableOpacity>                
                  <Text style = {{fontSize:16, alignSelf:'center'}}>SAVE & APPROVE</Text>
                </TouchableOpacity>
                </Card>
                
                <Card style = {{width:'30%', marginLeft:'39%', marginTop:'-6.5%', borderRadius:10}}>
                <TouchableOpacity onPress={insertData}>
                  <Text style = {{fontSize:15, alignSelf:'center'}}>SAVE & CLOSE</Text>  
                </TouchableOpacity>
                </Card>
                
                <Card style = {{width:'30%', marginBottom:25, marginTop:'-6%', marginLeft:'70%', borderRadius:10}}>
                <TouchableOpacity onPress={() => navigation.navigate('New Beneficiary')}>
                  <Text style = {{fontSize:16, alignSelf:'center'}}>CANCEL</Text>
                </TouchableOpacity>
                </Card>
               
            </View>
           
        </ImageBackground>
        </ScrollView>
        </SafeAreaView>
    )
}
                            
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
    },
    scrollView: {
    
      marginHorizontal: 0,
    },
    
    button: {
        marginBottom: 20,
        width:125,
        marginLeft:8.5,
        marginTop:10,
        padding:'-50%',
    },
    image: {
        flex: 1,
        width: null, 
        height: null
    },

});
export default Add_Vaccination;


