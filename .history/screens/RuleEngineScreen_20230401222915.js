import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
    CheckBox
  } from 'react-native'
  import React, { useState,useContext } from 'react'
  import SelectPicker from 'react-native-form-select-picker';
  import { deleteGoal } from '../../api/GoalAPI';
  import { useLayoutEffect } from 'react';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { ArrowLeftIcon } from 'react-native-heroicons/solid';
  import { modifyGoalParams } from "../../api/GoalAPI";
  import { modifyGoalSchedule } from "../../api/GoalAPI";
  import { UserContext } from '../../context/UserContext';
  import { ConfigContext } from '../../context/ConfigContext';
  import { ActiveContext } from '../../context/ActiveContext';
  import DateTimePicker from 'react-native-modal-datetime-picker';
  
  const RuleEngineScreen = () => {
    const {params:{id,createdAt,updatedAt,name,dueDate,
      goalTypeName,active,hidden,completed,completedPercentage,workPercentage,
      description,startDate,timeTaken}} = useRoute();
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const [createAtState,setCreatedAt] = useState(createdAt);
      const [updatedAtState,setUpdatedAt] = useState(updatedAt);
      const [nameState,setName] = useState(name);
      const [timeTakenState,setTimeTaken] = useState(timeTaken);
      const [startDateState, setStartDate] = useState(new Date(startDate));
      const [dueDateState,setDueDate] = useState(new Date(dueDate));
      const [descriptionState,setDescription] = useState(description);
      const [activeState, setActive] = useState(active);
      const [hiddenState, setHidden] = useState(hidden);
      const [completedState,setCompleted] = useState(completed);
      const [isEditing,setIsEditing] = useState(false);
      const [showStartDate,setShowStartDate] = useState(false);
      const [showDueDate,setShowDueDate] = useState(false);
  
      const handleStartDate = (date) => {
        setStartDate(date)
      };
      const handleDueDate = (date) => {
        setDueDate(date)
      };
     
      function formatDate(newDate) {
        const months = {0: 'January',1: 'February',2: 'March',3: 'April',
        4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September',
          9: 'October', 10: 'November',  11: 'December' }
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const year = newDate.getFullYear()
        const date = newDate.getDate()
        const monthIndex = newDate.getMonth()
        const monthName = months[newDate.getMonth()]
        const dayName = days[newDate.getDay()] // Thu
        const formatted = `${dayName}, ${date} ${monthName} ${year}`
        return formatted.toString()
      }
  
      if(startDate!==null){
        const total_completion_time = new Date(dueDate) - new Date(startDate)
        const time_left = new Date(dueDate) - new Date()
        var expected_level = (total_completion_time-time_left)*100/total_completion_time;
      }
      else{
        var expected_level=0
      }
  

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      });
    }, [])
    const navigation = useNavigation();
  
    return (
      <SafeAreaView className="bg-black flex-1">
        <ScrollView className="my-10">
          <View className='relative'>
            <TouchableOpacity onPress={navigation.goBack}>
              <ArrowLeftIcon size={20} color='white'/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default RuleEngineScreen;