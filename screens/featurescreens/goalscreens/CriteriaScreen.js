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
import CriteriaList from '../../../components/RuleEngine/Criteria/CriteriaList';
  
  const CriteriaScreen = () => {
      const navigation = useNavigation();
      const [goals,setGoals] = useState([]);
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();

      const criteriaOptions = [
        {value:'TASK', label: 'Task'},
        {value:'HABIT', label:'Habit'},
        {value:'BAD_HABIT',label:'Bad Habit'},
        {value:'SKILL',label:'Skill'},
        {value:'STAT',label:'Stat'},
        {value:'ACCOUNT',label:'Account'},
        {value:'FUND',label:'Fund'},
        {value:'BUDGET_PLAN',label:'Budget Plan'},
        {value:'TRANSACTION',label:'Transaction'},
        {value:'MONTHLY_BUDGET',label:'Monthly Budget'}
      ]
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          isFocused
        }, [isFocused]);

  
      const Stack = createNativeStackNavigator();
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          {criteriaOptions?.map(record=>
             <CriteriaList record={record}/>)}
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default CriteriaScreen