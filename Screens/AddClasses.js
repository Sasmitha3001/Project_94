import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../Components/Header'

export default class AddDetails extends Component{

  constructor(){
    super()
    this.state={
      class_date:'',
      class_time:'',
      student_name:'',
      meet_link:''
    }
  }

  scheduleClass=()=>{
    db.collection('classes').add({
      class_date:this.state.class_date,
      class_time:this.state.class_time,
      student_name:this.state.student_name,
      meet_link:this.state.meet_link
    })
    .then(()=>{
      alert("Class Scheduled")
    this.props.navigation.navigate('Home')
    })
    
  }

  render(){
    return (
      <SafeAreaProvider>
        <View style={styles.container}>

        <MyHeader title={"Class Scheduler"}/>

        <TextInput
        style={styles.input}
        placeholder={"Class Date"}
        onChangeText={text=>{this.setState({class_date:text})}}
        />

        <TextInput
        style={styles.input}
        placeholder={"Class Time"}
        onChangeText={text=>{this.setState({class_time:text})}}
        />

        <TextInput
        style={styles.input}
        placeholder={"Student Name"}
        onChangeText={text=>{this.setState({student_name:text})}}
        />

        <TextInput
        style={styles.input}
        placeholder={"Meeting Link"}
        keyboardType={'url'}
        onChangeText={text=>{this.setState({meet_link:text})}}
        />

        <TouchableOpacity
        style={styles.button}
        onPress={()=>{this.scheduleClass()}}
        >
          <Text style={styles.buttonText}>Schedule Class</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    )
  }
  
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  },
  input:{
    width:250,
    height:50,
    borderWidth:1,
    marginTop:25,
    alignSelf:'center'
  },
  button:{
    alignSelf:'center',
    marginTop:15,
    width:150,
    height:40,
    borderRadius:35,
    backgroundColor:'red'
  },
  buttonText:{
    alignSelf:'center',
    fontSize:15,
    color:'white',
    fontWeight:'bold',
    marginTop:5
  }
})

