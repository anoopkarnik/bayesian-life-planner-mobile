import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
TouchableOpacity } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../../../context/ConfigContext';
import { UserContext } from '../../../context/UserContext';
import HabitList from '../../../components/Habit/HabitList';
import { getTotalHabits } from '../../../api/AdminAPI';
import { ActiveContext } from '../../../context/ActiveContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Bars3BottomLeftIcon} from 'react-native-heroicons/solid';
import {Bars3BottomRightIcon} from 'react-native-heroicons/solid';
import { Menu,MenuTrigger,MenuOptions,MenuOption } from 'react-native-popup-menu';

const HabitScreen = () => {
    const navigation = useNavigation();
    const [habits,setHabits] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const isFocused = useIsFocused();
    const [showMenu,setShowMenu] = useState(false);
    const {showActive,setShowActive} = useContext(ActiveContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])

    useEffect(() => {
      isFocused && refreshHabitPage(config,'Bearer '+user.accessToken);
      }, [isFocused]);

    const refreshHabitPage = async(backend_url,bearerToken) =>{
      const {habit,habitOptions} = await getTotalHabits(config,'Bearer '+user.accessToken);
      setHabits(habit);
    }

    const Stack = createNativeStackNavigator();

  return (
    
    <SafeAreaView className="bg-black flex-1">
      <ScrollView>
        {habits.map(habit=>
            <HabitList key={habit.name} habit={habit} refreshFunction={refreshHabitPage}/>)} 
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitScreen