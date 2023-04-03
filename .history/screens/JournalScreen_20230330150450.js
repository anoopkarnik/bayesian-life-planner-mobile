import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../context/ConfigContext';
  import { UserContext } from '../context/UserContext';
  import JournalList from '../components/Journal/JournalList';
  import { getTotalJournals } from '../api/AdminAPI';
  import { ActiveContext } from '../context/ActiveContext';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const JournalScreen = () => {
      const navigation = useNavigation();
      const [tasks,setJournals] = useState([]);
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          isFocused && refreshJournalPage(config,'Bearer '+user.accessToken);
        }, [isFocused]);
  
      const refreshJournalPage = async(backend_url,bearerToken) =>{
        const {task,taskOptions} = await getTotalJournals(config,'Bearer '+user.accessToken);
        setJournals(task);
      }
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView className="my-10">
          {tasks.map(task=>
              <JournalList key={task.name} task={task} refreshFunction={refreshJournalPage}/>)} 
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default JournalScreen