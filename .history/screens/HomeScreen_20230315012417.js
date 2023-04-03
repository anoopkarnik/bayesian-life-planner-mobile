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
        <View className="bg-white relative ">
            <View className="flex-1">

            </View>
            <View className="bg-black absolute inset-x-0 bottom-0 h-50">
                <Text className="text-white">Profile</Text>
            
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen