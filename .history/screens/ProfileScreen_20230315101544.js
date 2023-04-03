import { View, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { useState,useContext } from 'react';
import { UserContext } from '../context/UserContext';


const ProfileScreen = () => {
  const {user} = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const navigation = useNavigation();
  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      });
  }, [])
    

  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center">
        <View className="my-5">
          <Text className="text-white text-xl">User Name - {name}</Text>
          <Text className="text-white text-xl">User Email - {user.email}</Text>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen