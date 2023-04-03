import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'

const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
    

  return (
    <SafeAreaView className="bg-white pt-5">
        <Text className="text-red-500">Home Screen</Text>
        <Button title="Go to Profile Screen" 
        onPress={()=> navigation.navigate("Profile")}/>
    </SafeAreaView>
  )
}

export default HomeScreen