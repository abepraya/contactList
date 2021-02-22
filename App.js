/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './screen/Dashboard/Home';
import AddUser from './screen/AddUser/AddUser';
import FormUpdate from './screen/Update/FormUpdate';
import Information from './screen/Information/Information';
// import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';

const Stack = createStackNavigator();
class App extends Component {
  // componentDidMount() {
  //   console.log('Start !');
  //   firestore()
  //     .collection('users')
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log('Total users: ', querySnapshot.size);

  //       querySnapshot.forEach((documentSnapshot) => {
  //         console.log(
  //           'User ID: ',
  //           documentSnapshot.id,
  //           documentSnapshot.data(),
  //         );
  //       });
  //     });
  // }

  
  render() {
    return (
      <View>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Users" component={Home}></Stack.Screen>
            <Stack.Screen name="Form" component={AddUser}></Stack.Screen>
            <Stack.Screen name="Update" component={FormUpdate}></Stack.Screen>
            <Stack.Screen name="Information" component={Information}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default App;
