import { View, Text,SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { getTotalTasks,getTotalHabits,createTaskType,
  createHabitType,deleteTaskType,deleteHabitType,
  editTaskType,editHabitType,getTotalJournals,createJournalType,
  deleteJournalType,editJournalType,getTotalStats,createStatsType,
  editStatsType,deleteStatsType,getTotalSkills,createSkillType,
  editSkillType,deleteSkillType, getTotalGoals,createGoalType,
  editGoalType,deleteGoalType, getTotalBadHabits,editBadHabitType,
  createBadHabitType,deleteBadHabitType
 } from '../../../api/AdminAPI';
 import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ConfigureList from '../../../components/Configure/ConfigureList';
import { Bars3Icon } from 'react-native-heroicons/solid';

const ConfigureScreen = () => {
  const [taskOptions, setTaskOptions] = useState([]);
    const [habitOptions,setHabitOptions] = useState([]);
    const [badHabitOptions,setBadHabitOptions] = useState([]);
    const [journalOptions, setJournalOptions] = useState([]);
    const [statsOptions, setStatsOptions] = useState([]);
    const [skillOptions,setSkillOptions] = useState([]);
    const [goalOptions,setGoalOptions] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);


    useEffect(() => {
        refreshAdminPage(config,'Bearer '+user.accessToken);
      }, []);

      const navigation = useNavigation();
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])

    const refreshAdminPage = async(backend_url,bearerToken) =>{
      const {task,taskOptions} = await getTotalTasks(backend_url,bearerToken);
      const {habit,habitOptions} = await getTotalHabits(backend_url,bearerToken);
      const {journal,journalOptions} = await getTotalJournals(backend_url,bearerToken);
      const {stats,statsOptions} = await getTotalStats(backend_url,bearerToken);
      const {skill,skillOptions} = await getTotalSkills(backend_url,bearerToken);
      const {goal,goalOptions} = await getTotalGoals(backend_url,bearerToken);
      const {badHabits, badHabitOptions} = await getTotalBadHabits(backend_url,bearerToken);
      setTaskOptions(taskOptions);  
      setHabitOptions(habitOptions);
      setJournalOptions(journalOptions);
      setStatsOptions(statsOptions);
      setSkillOptions(skillOptions);
      setGoalOptions(goalOptions);
      setBadHabitOptions(badHabitOptions);
    }
  return (
    <SafeAreaView className="bg-black flex-1">
              <View className="flex-row mt-8 mb-3">
                <TouchableOpacity className="flex-1 " onPress={()=>navigation.toggleDrawer()}>
                    <Bars3Icon color="white" size={30}/>
                </TouchableOpacity>

            </View>
      <ScrollView>
          <ConfigureList name="Task Types" 
          records={taskOptions} 
            createFunction={createTaskType} 
            refreshFunction={refreshAdminPage} 
            deleteFunction={deleteTaskType} editFunction={editTaskType}/>
          <ConfigureList name="Habit Types" records={habitOptions} 
            createFunction={createHabitType} 
            refreshFunction={refreshAdminPage} 
            deleteFunction={deleteHabitType} editFunction={editHabitType}/>
          <ConfigureList name="Journal Types" records={journalOptions} 
            createFunction={createJournalType} 
            refreshFunction={refreshAdminPage} 
            deleteFunction={deleteJournalType} editFunction={editJournalType}/>
          <ConfigureList name="Stats Types" records={statsOptions} 
            createFunction={createStatsType} 
            refreshFunction={refreshAdminPage} 
            deleteFunction={deleteStatsType} editFunction={editStatsType}/>
          <ConfigureList name="Skill Types" records={skillOptions} 
            createFunction={createSkillType} 
            refreshFunction={refreshAdminPage} 
            deleteFunction={deleteSkillType} editFunction={editSkillType}/>
          <ConfigureList name="Bad Habit Types" records={badHabitOptions} 
            createFunction={createBadHabitType} 
            refreshFunction={refreshAdminPage} 
            deleteFunction={deleteBadHabitType} editFunction={editBadHabitType}/>
      </ScrollView>      
    </SafeAreaView>
  )
}

export default ConfigureScreen