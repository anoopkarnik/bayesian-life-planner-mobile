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
            <View>
                <View>
                    <TextInput
                    className="bg-white m-5 p-5"
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                    /> 
                </View> 
                <View >
                    <TextInput
                    className="bg-white m-5 p-5"
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    /> 
                </View> 
                <TouchableOpacity>
                    <Text className="text-white">Forgot Password?</Text> 
                </TouchableOpacity> 
                <TouchableOpacity>
                    <Text className="text-white">LOGIN</Text> 
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen