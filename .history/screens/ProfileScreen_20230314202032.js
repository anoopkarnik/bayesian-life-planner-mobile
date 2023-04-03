import { View, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'



const ProfileScreen = () => {
    const navigation = useNavigation();
    

  return (
    <SafeAreaView className="bg-white pt-5">
        <Text className="text-red-500">Profile Screen</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen