import { View, Text,SafeAreaView ,TextInput,Button,TouchableOpacity} from 'react-native'
import React, { useState,useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import {XMarkIcon} from "react-native-heroicons/solid";
import { ScrollView } from 'react-native-gesture-handler';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmNewpassword,setConfirmNewpassword] = useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center">
        <View>
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
                    placeholder="Current Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                    /> 
                </View>
                <View>
                    <TextInput
                    className="bg-gray-900 text-white mx-5 my-3 p-3 border-solid border-2 border-violet-400"
                    placeholder="New Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                    /> 
                </View> 
                <View >
                    <TextInput
                    className="bg-gray-900 text-white mx-5 my-3 p-3 border-solid border-2 border-violet-400"
                    placeholder="Confirm New Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={(confirmNewpassword) => setConfirmNewpassword(confirmNewpassword)}
                    /> 
                </View> 
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity className="p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
                        <Text className="text-white"> Change Password</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen