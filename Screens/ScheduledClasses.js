import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import MyHeader from '../Components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { ListItem } from 'react-native-elements';

export default class ScheduledClasses extends Component {
  constructor(){
    super()
    this.state={
      allClasses:[]
    }
  }

  getAllClasses=()=>{
    var allClasses
    db.collection('classes').onSnapshot(snapshot=>{
      snapshot.docs.map(doc=>{var document=doc.data();
      allClasses.push(document)
      this.setState({
        allClasses:allClasses
      })})
    })
  }

  keyExtractor=(index,item)=>{index.toString()}

  renderItem=(item,index)=>{
    return(
      <ListItem
      key={i}
      title={item.student_name}
      subtitle={item.class_date}
      titleStyle={{fontWeight:'bold',color:'black'}}
      rightElement={
        <TouchableOpacity
        style={{width:150,height:40,color:'orange'}}
        onPress={()=>{this.props.navigation.navigate('ClassDetails')}}
        >
          <Text>View</Text>
        </TouchableOpacity>
      }
      />
    )
  }
  
  

  render(){
    return (
      <SafeAreaProvider>
        <ScrollView>
        <View  style={styles.container}>
          <View style={{flex:0.9}}>
        <MyHeader title={"Scheduled Classes"}/>
        <Text style={styles.text}>List of All Scheduled Classes</Text>
        </View>
        <View style={{flex:0.1}}>
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{this.props.navigation.navigate('AddClass')}}
        >
        <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        </View>
       
      </View>
      </ScrollView>
      </SafeAreaProvider>
      
    )
  }
  
}

const styles=StyleSheet.create({
  container:{
    flex:1,
   justifyContent:'center'
  },
  button:{
    backgroundColor:'#3c1361',
    borderRadius:100,
    width:50,
    height:50,
    alignSelf:'flex-end',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:8
    },
    shadowOpacity:0.30,
    shadowRadius:10.32,
    elevation:16,
    padding:10
  },
  buttonText:{
    color:'white',
    alignSelf:'center',
    fontSize:25,
    textAlign:'center',
    paddingBottom:30
  },
  text:{
    alignSelf:'center',
    fontSize:25,
    fontWeight:'bold',
    marginTop:150,
    color:'grey'
  }
})

