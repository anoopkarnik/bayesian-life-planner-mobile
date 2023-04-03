import { View, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {
    const navigation = useNavigation();
    

  return (
    <SafeAreaView className="bg-white pt-5">
        <Text className="text-red-500">Home Screen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen