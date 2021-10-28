import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
var db = openDatabase({ name: 'VaccineDatabase.db' });


function HomeScreen({ navigation }) {

    const [S_ID, setId] = useState();
    const [S_EmailID, setEmailID] = useState('');
    const [S_Password, setPassword] = useState('');
  
   
  
    const insertData = () => {
  
      if (V_Id == '' || V_EmailId == '' || V_Password == '') {
        Alert.alert('Please Enter All the Values');
      } else {
  
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO Student_Table (Vaccine_id, Vaccine_EmailID, Vaccine_Password) VALUES (?,?,?)',
            [S_Name, S_Phone, S_Address],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert('Data Inserted Successfully....');
              } else Alert.alert('Failed....');
            }
          );
        });
  
      }
    }
  
    navigateToViewScreen = () => {
  
      navigation.navigate('ViewAllStudentScreen');
    }
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
  
          <Text style={{ fontSize: 24, textAlign: 'center', color: '#000' }}>
            Insert Data Into SQLite Database
          </Text>
  
          <TextInput
            style={styles.textInputStyle}
            onChangeText={
              (text) => setName(text)
            }
            placeholder="Enter Student Name"
            value={S_Name} />
  
          <TextInput
            style={styles.textInputStyle}
            onChangeText={
              (text) => setPhone(text)
            }
            placeholder="Enter Student Phone Number"
            keyboardType={'numeric'}
            value={S_Phone} />
  
          <TextInput
            style={[styles.textInputStyle, { marginBottom: 20 }]}
            onChangeText={
              (text) => setAddress(text)
            }
            placeholder="Enter Student Address"
            value={S_Address} />
  
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={insertData}>
  
            <Text style={styles.touchableOpacityText}> Click Here To Insert Data Into SQLite Database </Text>
  
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.touchableOpacity, { marginTop: 20, backgroundColor: '#33691E' }]}
            onPress={navigateToViewScreen}>
  
            <Text style={styles.touchableOpacityText}> Click Here View All Students List </Text>
  
          </TouchableOpacity>
  
        </View>
  
      </SafeAreaView>
    );
  };