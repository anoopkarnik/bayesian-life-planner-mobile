import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import { useAuth } from '../hooks/useAuth'

const LoginScreen = () => {
    const {user} = useAuth();
    console.log(user);
  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center">
        <View>
            <View>

            </View>
            <View>

            </View>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen