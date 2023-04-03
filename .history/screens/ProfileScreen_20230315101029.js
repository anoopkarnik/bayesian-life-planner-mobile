import { View, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { UserCircleIcon } from 'react-native-heroicons/solid';



const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      });
  }, [])
    

  return (
    <SafeAreaView className="bg-white pt-5">
        <View>
          <Text>User Name - {name}</Text>
          <Text>User Email - {user.email}</Text>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen