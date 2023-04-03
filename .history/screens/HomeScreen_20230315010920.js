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
    <SafeAreaView className="bg-black pt-5">
        <View >
            <View className="flex-1">

            </View>
            <View className="flex-row-reverse justify-center items-center">
                {/* <TouchableOpacity className="bg-black"
                onPress={()=> navigation.navigate("Profile")}>
                    <Text>Profile</Text>
                </TouchableOpacity> */}
                <Text className="text-white">Profile</Text>
            
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen