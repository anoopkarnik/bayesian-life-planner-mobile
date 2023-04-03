import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native-web';

const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
    

  return (
    <SafeAreaView >
        <View className="w-full h-screen">
            <View className="flex-1">

            </View>
            <View className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                <Text className="text-white">Profile</Text>
            
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen