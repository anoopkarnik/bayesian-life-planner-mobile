import { View, Text,SafeAreaView ,TextInput,Button,TouchableOpacity} from 'react-native'
import React, { useState,useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import {XMarkIcon} from "react-native-heroicons/solid"
import { ScrollView } from 'react-native-gesture-handler';
import { signup } from '../../api/AuthenticationAPI';
import { ConfigContext } from '../../context/ConfigContext';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState(['user'])
    const {config} = useContext(ConfigContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])

    const onSubmit = async()=>{
        await signup(config,name,email,password,role)
        navigation.navigate("Login")
      } 

  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center">
        <ScrollView>
        <View className="mx-2 my-8">
            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                    <XMarkIcon color="white" size={30}/>
                </TouchableOpacity>
            </View>
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
                <View>
                    <TextInput
                    className="bg-gray-900 text-white mx-5 my-3 p-3 border-solid border-2 border-violet-400"
                    placeholder="Email"
                    placeholderTextColor="#FFF"
                    onChangeText={(email) => setEmail(email)}
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
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity  onPress={onSubmit} className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                        <Text className="text-white"> REGISTER </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignupScreen