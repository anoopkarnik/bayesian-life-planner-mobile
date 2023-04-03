import { View, Text,SafeAreaView ,TextInput,Button,Alert,TouchableOpacity} from 'react-native'
import React, { useState,useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { signin } from '../api/AuthenticationAPI';
import { ConfigContext } from '../context/ConfigContext';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const {config} = useContext(ConfigContext);
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = async()=>{
		try{
      		const user = await signin(config,name,password)
	  		setUser(user);
	  		setLoggedIn(true);
      		navigation.navigate("Home")
		}
		catch{
			Alert.alert("Username/Password not found")
		}
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center">
        <View>
            <View>
                <Animatable.Image 
                    source={require("../assets/logo.gif")} 
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
                <View >
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
                    <TouchableOpacity onPress={()=> {onSubmit}} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                        <Text className="text-white"> LOGIN </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> navigation.navigate("Signup")}
                     className="bg-black p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                        <Text className="text-white"> SIGNUP </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen