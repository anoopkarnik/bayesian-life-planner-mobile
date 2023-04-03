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
    <SafeAreaView className="bg-black pt-5">
        <View >
            <View >

            </View>
            <View className="bg-black">
                <Button title="Go to Profile Screen" 
                onPress={()=> navigation.navigate("Profile")}/>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen