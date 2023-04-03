import { View, Text,TouchableOpacity } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createRootHabit } from '../../api/HabitAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import CheckBox from 'react-native-check-box'
import SelectPicker from 'react-native-form-select-picker';
import DatePicker from 'react-native-modern-datepicker';

const AddHabitForm = () => {

  const [name, setName] = useState('');
	const [timeOfDay, setTimeOfDay] = useState('');
	const [dueDate, setDueDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());
	const [every,setEvery] = useState(1);
	const [scheduleType,setScheduleType] = useState('');
	const [daysOfWeek,setDaysOfWeek] = useState([]);
	const [showDays, setShowDays] = useState(false);
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useState(true);
	const {showActive} = useContext(ActiveContext);
  const [showStartDate,setShowStartDate] = useState(false);
  const [showDueDate,setShowDueDate] = useState(false);

  function modifyStartDate(date){
    var parts = date.split('/')
    var year = parts[0];
    var month = parts[1];
    var day = parts[2].split(' ')[0]
    var date = new Date(year,month-1,day)
    setStartDate(date.toString())
  }

  function modifyDueDate(date){
    var parts = date.split('/')
    var year = parts[0];
    var month = parts[1];
    var day = parts[2].split(' ')[0]
    var date = new Date(year,month-1,day)
    setDueDate(date.toString())
  }
  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 bg-white" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 bg-white"  placeholder="Time Of Day"  
          value={timeOfDay} Name='text' 
          onChangeText={text => setTimeOfDay(text)}/>
      </View>
      <View className="flex-row">
        <TouchableOpacity onPress={()=>setShowStartDate(!showStartDate)}
        className="flex-1 mx-2 bg-gray-800">
          <Text className="text-white text-xl">Start Date</Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setShowDueDate(!showDueDate)}
        className="flex-1 mx-2 bg-gray-800">
          <Text className="text-white text-xl">Due Date</Text>
        </TouchableOpacity>
      </View>
      <View>
        {showStartDate?
         <DatePicker onSelectedChange={date=>modifyStartDate(date)} mode="calendar"/>
         :null}
         {showDueDate?
         <DatePicker onSelectedChange={date=>modifyDueDate(date)} mode="calendar"/>
         :null}
      </View>

    </View>
  )
}

export default AddHabitForm