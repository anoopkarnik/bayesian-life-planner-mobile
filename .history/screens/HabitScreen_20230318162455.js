import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../context/ConfigContext';
import { UserContext } from '../context/UserContext';
import HabitList from '../components/Habit/HabitList';
import { getTotalHabits } from '../api/AdminAPI';
import { ActiveContext } from '../context/ActiveContext';

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
    <SafeAreaView className="bg-black flex-1">
      <ScrollView className="my-10">
        <Text>dfd</Text>
        {habits.map(habit=>
            <HabitList habit={habit} refreshFunction={refreshHabitPage}/>)} 
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitScreen