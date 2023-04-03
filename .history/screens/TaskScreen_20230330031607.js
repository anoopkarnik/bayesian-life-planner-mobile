import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../context/ConfigContext';
  import { UserContext } from '../context/UserContext';r
  import TaskList from '../components/Task/TaskList';
  import { getTotalTasks } from '../api/AdminAPI';
  import { ActiveContext } from '../context/ActiveContext';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const TaskScreen = () => {
      const navigation = useNavigation();
      const [tasks,setTasks] = useState([]);
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          refreshTaskPage(config,'Bearer '+user.accessToken);
        }, []);
  
      const refreshTaskPage = async(backend_url,bearerToken) =>{
        const {task,taskOptions} = await getTotalTasks(config,'Bearer '+user.accessToken);
        setTasks(task);
      }
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView className="my-10">
          {tasks.map(task=>
              <TaskList key={task.name} task={task} refreshFunction={refreshTaskPage}/>)} 
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default TaskScreen