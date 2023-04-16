import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { UserContext } from '../../../context/UserContext';
  import GoalList from '../../../components/Goal/GoalList';
  import { getTotalGoals } from '../../../api/AdminAPI';
  import { ActiveContext } from '../../../context/ActiveContext';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const GoalScreen = () => {
      const navigation = useNavigation();
      const [goals,setGoals] = useState([]);
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          isFocused && refreshGoalPage(config,'Bearer '+user.accessToken);
        }, [isFocused]);
  
      const refreshGoalPage = async(backend_url,bearerToken) =>{
        const {goal,goalOptions} = await getTotalGoals(config,'Bearer '+user.accessToken);
        setGoals(goal);
      }
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          {goals?.map(goal=>
              <GoalList key={goal.name} goal={goal} refreshFunction={refreshGoalPage}/>)} 
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default GoalScreen