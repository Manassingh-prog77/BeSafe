import { Text, View } from "react-native";
import Login from './components/Login';
import {auth} from '../FirebaseConfig';
import { Redirect } from "expo-router";
import CreateRoom from './components/CreateRoom';
import { NativeRouter, Routes, Route } from 'react-router-native';

export default function Index() {

  const user = auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     {user?
     <Redirect href={'/Home'} />:
     <Login /> 
    }
    </View>
  );
}
