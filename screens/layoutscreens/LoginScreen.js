import {View, Text,SafeAreaView ,TextInput,Button,Alert,TouchableOpacity,Platform} from 'react-native'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { signin } from '../../api/AuthenticationAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { useAuth } from '../../context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../../context/UserContext';
import { EyeIcon } from 'react-native-heroicons/solid';
import * as Notifications from "expo-notifications";
import * as Device from "expo-notifications";
import { useNotifications } from '../../hooks/useNotifications';
import { credentials } from '../../variables';


Notifications.setNotificationHandler({
    handleNotification:async() =>({
        shouldShowAlert:true,
        shouldPlaySound:true,
        shouldSetBadge:true,
    })
})

async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

const LoginScreen = () => {
    const navigation = useNavigation();
    const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const {config} = useContext(ConfigContext);
    const [name,setName] = useState(credentials.username);
    const [password,setPassword] = useState(credentials.password);
    const {setUser} = useAuth();
    const {user} = useContext(UserContext);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const {registerForPushNotificationsAsync} = useNotifications();
  
    useEffect(() => {
        registerForPushNotificationsAsync().then(token=>setExpoPushToken(String(token)));
        // alert(expoPushToken)
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    const onSubmit = async()=>{
		try{
      		const user = await signin(config,name,password)
	  		setUser(user);
	  		setLoggedIn(true);
      		navigation.navigate("Container")
		}
		catch{
			Alert.alert("Username/Password not found")
		}
    }

    const guestLogin = async() =>{
        const user = await signin(config,"guest","password")
        setUser(user);
        setLoggedIn(true);
        navigation.navigate("Container")
    }

    const GodLogin = async() =>{
        const user = await signin(config,"God","password")
        setUser(user);
        setLoggedIn(true);
        navigation.navigate("Container")
    }

    const MarkZuckerburgLogin = async() =>{
        const user = await signin(config,"MarkZuckerburg","password")
        setUser(user);
        setLoggedIn(true);
        navigation.navigate("Container")
    }

    const ARRahmanLogin = async() =>{
        const user = await signin(config,"ARRahman","password")
        setUser(user);
        setLoggedIn(true);
        navigation.navigate("Container")
    }

    const JackieChanLogin = async() =>{
        const user = await signin(config,"JackieChan","password")
        setUser(user);
        setLoggedIn(true);
        navigation.navigate("Container")
    }
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center">
        <ScrollView>
            <View>
                <Animatable.Image 
                    source={require("../../assets/logo.gif")} 
                    animation="slideInUp"
                    iterationCount={1}
                    className="h-96 w-96"/> 
            </View>
            <View className="flex-1">
                <View>
                    <TextInput
                    className="bg-gray-900 text-white mx-5 my-3 p-3 border-solid border-2 border-violet-400"
                    placeholder="Name"
                    placeholderTextColor="#FFF"
                    onChangeText={(name) => setName(name)}
                    /> 
                </View> 
                <View className>
                    <TextInput
                    className="bg-gray-900 text-white mx-5 my-3 p-3 border-solid border-2 border-violet-400"
                    placeholder="Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    /> 
                </View> 
                <View>
                    <TouchableOpacity onPress={()=> navigation.navigate("ForgotPassword")} 
                    className="my-3 justify-center items-center">
                        <Text className="text-white">Forgot Password?</Text> 
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={onSubmit} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                        <Text className="text-white"> LOGIN </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> navigation.navigate("Signup")}
                     className="bg-black p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                        <Text className="text-white"> SIGNUP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={async () => {await sendPushNotification(expoPushToken);}}
                     className="bg-black p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                        <Text className="text-white"> Push Notification</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text className="text-white text-2xl flex-1 justify-center items-center text-center my-5 p-3">Existing profiles</Text>
            <View className="flex-row justify-center items-center">
                <TouchableOpacity onPress={guestLogin} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                    <Text className="text-white"> Guest</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={GodLogin} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                    <Text className="text-white"> God</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center">
                <TouchableOpacity onPress={ARRahmanLogin} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                    <Text className="text-white"> AR Rahman</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={JackieChanLogin} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                    <Text className="text-white"> Jackie Chan</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center">
                <TouchableOpacity onPress={MarkZuckerburgLogin} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                    <Text className="text-white"> Mark Zuckerburg</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen