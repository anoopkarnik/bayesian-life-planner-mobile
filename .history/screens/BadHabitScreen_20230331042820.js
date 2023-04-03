import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useBadHabite,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../context/ConfigContext';
  import { UserContext } from '../context/UserContext';
  import BadHabitList from '../components/BadHabit/BadHabitList';
  import { getTotalBadHabits } from '../api/AdminAPI';
  import { ActiveContext } from '../context/ActiveContext';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const BadHabitScreen = () => {
      const navigation = useNavigation();
      const [badHabits,setBadHabits] = useState([]);
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          isFocused && refreshBadHabitPage(config,'Bearer '+user.accessToken);
        }, [isFocused]);
  
      const refreshBadHabitPage = async(backend_url,bearerToken) =>{
        const {badHabit,badHabitOptions} = await getTotalBadHabits(config,'Bearer '+user.accessToken);
        setBadHabits(badHabit);
      }
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView className="my-10">
          {badHabits?.map(badHabit=>
              <BadHabitList key={badHabit.name} badHabit={badHabit} refreshFunction={refreshBadHabitPage}/>)} 
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default BadHabitScreen