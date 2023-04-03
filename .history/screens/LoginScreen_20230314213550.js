import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'

const LoginScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
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