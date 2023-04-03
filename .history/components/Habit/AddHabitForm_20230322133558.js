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

  const handleScheduleTypeChange = async(value) =>{
    console.log(value)
    setScheduleType(value);
    if(value==="weekly"){
      setShowDays(true);
    }
    else{
      setShowDays(false);
    }
  }

  const [scheduleTypes,setScheduleTypes] = useState(['onetime','daily','weekly',
  'monthly','yearly']);

  const [weekDays,setWeekDays] = useState([
    {value:'MONDAY',label:'M',isChecked:false},
    {value:'TUESDAY',label:'T',isChecked:false},
    {value:'WEDNESDAY',label:'W',isChecked:false},
    {value:'THURSDAY',label:'T',isChecked:false},
    {value:'FRIDAY',label:'F',isChecked:false},
    {value:'SATURDAY',label:'S',isChecked:false},
    {value:'SUNDAY',label:'S',isChecked:false},
  ]);

  const onhandleWeekDayChange = (value) =>{
    let temp = weekDays.map((weekDay)=>{
     if(value === weekDay.value){
       return {...weekDay,isChecked:!weekDay.isChecked};
     }
     return weekDay
    });
    let temp2 = temp.map((weekDay)=>{
     if (weekDay.isChecked){
       return weekDay.value
     }
    })
    var temp3 = temp2.filter(elm=>elm);
    setWeekDays(temp);
    setDaysOfWeek(temp3);
   }

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2"  placeholder="Time Of Day"  
          value={timeOfDay} Name='text' 
          onChangeText={text => setTimeOfDay(text)}/>
      </View>
      <View className="flex-row">
            <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
            onValueChange={(value)=>handleScheduleTypeChange(value)} 
            placeholder="Schedule Type"
                  selected={scheduleType} >
                    {scheduleTypes.map((schedule)=>(
                         <SelectPicker.Item className="text-gray-400 " label={schedule} value={schedule}/>
                    ))}
            </SelectPicker>
            <TextInput 
                className="flex-1 mx-2 w-1/2 bg-white p-2"
                placeholder="Every"  value={every} Name='text' 
                onChangeText={text => setEvery(String(text))}/>
      </View>
      {showDays?
          <View className="my-3 flex-row">
            {weekDays.map((x,i)=>(
              <Text>
              <CheckBox
              className="flex-1 text-xl"
                isChecked={x.isChecked}
                onClick={()=>onhandleWeekDayChange(x.value)}
              />  
              <Text className="text-white text-xl font-bold">{x.label}</Text>
              </Text>
            
            ))}
          </View>:null}
      <View className="flex-row">
        <TouchableOpacity onPress={()=>setShowStartDate(!showStartDate)}
        className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Start Date">
          <Text className="text-gray-400">Start Date</Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setShowDueDate(!showDueDate)}
        className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Due Date">
          <Text className="text-gray-400">Due Date</Text>
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