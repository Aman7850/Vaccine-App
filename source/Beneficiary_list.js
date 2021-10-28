import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, FlatList, ImageBackground, Alert, StatusBar, TouchableOpacity} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Button, TextInput} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Card } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'BeneficiaryDatabase.db' });

const image = { uri: "https://media.discordapp.net/attachments/851459670412361751/884697819938684968/pexels-photo-5863400.jpeg" };
const Beneficiary_list = () => {
    const [items, setItems] = useState();
    const isFocused = useIsFocused();
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM Beneficiary_Table',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setItems(temp);
                console.log(temp, 'data table');
              
     
            }
          );
     
        });
      }, [isFocused]);
    const navigation = useNavigation();
      
      
        const renderItem = ({ item }) => (
          <Card style = {{margin:5}}>
              <Text>{item.beneficiary_mobile}</Text>
              <Text>Name:{item.beneficiary_name}</Text>
              <Text>{item.beneficiary_dob}</Text>
              <Text>{item.beneficiary_gender}</Text>
              <Text>{item.beneficiary_id_type}</Text>
              <Text>{item.beneficiary_id_number}</Text>
          </Card>
        );
      
    return (

        <View style = {styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
           
            <Text style = {{fontSize:25, fontStyle:'italic', fontWeight:'bold', alignSelf:'center'}}>Beneficiaries</Text>

            
            <TouchableOpacity onPress={() => navigation.navigate('New Beneficiary')}>
                <Card style = {styles.Card}>
                <Text style = {styles.Text}>+</Text>
                </Card>
            </TouchableOpacity>
            
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.beneficiary_id}
            />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    image: {
        
        flex:1
    },
    Text: {
        fontSize:35,
    },
    Card: {
        width:'12%',
        alignItems:'center',
        marginLeft:'5%'
        
    }

});
export default Beneficiary_list;