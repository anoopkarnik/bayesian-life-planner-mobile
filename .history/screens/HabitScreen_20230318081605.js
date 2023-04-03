import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native-web';
import { useState } from 'react';

const HabitScreen = () => {
    const navigation = useNavigation();
    const [habits,setHabits] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])

    useEffect(() => {
        refreshHabitPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshHabitPage = async(backend_url,bearerToken) =>{
      const {habit,habitOptions} = await getTotalHabits(backend_url,bearerToken);
      setHabits(habit);
    }
    

  return (
    <SafeAreaView >
        <View className="w-full h-screen">
            <View className="flex-1">

            </View>
            <View className="block fixed inset-x-0 bottom-0 z-10 bg-black shadow">
                <Text className="text-white text-xl">Profile</Text>
            
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HabitScreen