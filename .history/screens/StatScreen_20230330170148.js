import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../context/ConfigContext';
  import { UserContext } from '../context/UserContext';
  import StatList from '../components/Stat/StatList';
  import { getTotalStats } from '../api/AdminAPI';
  import { ActiveContext } from '../context/ActiveContext';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const StatScreen = () => {
      const navigation = useNavigation();
      const [stats,setStats] = useState([]);
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          isFocused && refreshStatPage(config,'Bearer '+user.accessToken);
        }, [isFocused]);
  
      const refreshStatPage = async(backend_url,bearerToken) =>{
        const {stat,statOptions} = await getTotalStats(config,'Bearer '+user.accessToken);
        setStats(stat);
      }
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView className="my-10">
          {stats.map(stat=>
              <StatList key={stat.name} stat={stat} refreshFunction={refreshStatPage}/>)} 
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default StatScreen