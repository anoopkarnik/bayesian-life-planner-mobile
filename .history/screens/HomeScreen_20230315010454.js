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
            <View >

            </View>
            <View className="bg-black">
                <TouchableOpacity className="bg-black"
                onPress={()=> navigation.navigate("Profile")}>
                    Profile
                </TouchableOpacity>
            
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen