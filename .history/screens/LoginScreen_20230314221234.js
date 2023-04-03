import { View, Text,SafeAreaView ,TextInput,Button,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import * as Animatable from 'react-native-animatable';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
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
                    className="bg-gray-900 mx-5 p-3 border-white border-solid border-1"
                    placeholder="Email."
                    placeholderTextColor="#FFF"
                    onChangeText={(email) => setEmail(email)}
                    /> 
                </View> 
                <View >
                    <TextInput
                    className="bg-gray-900 mx-5 p-3"
                    placeholder="Password."
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    /> 
                </View> 
                <View>
                    <TouchableOpacity className="my-3 justify-center items-center">
                        <Text className="text-white">Forgot Password?</Text> 
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity className="my-5 mx-3 justify-center items-center">
                        <Button color="#000" className="text-white" title="LOGIN"/>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-black my-5 mx-3 justify-center items-center">
                        <Button color="#000" className="text-white" title="SIGNUP"/>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen