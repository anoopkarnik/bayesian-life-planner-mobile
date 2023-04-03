import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createJournal } from '../../api/JournalAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';

const AddJournalForm = (props) => {

  const [name, setName] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [hidden, setHidden] = useState(false);
	const {showActive} = useContext(ActiveContext);
  const {text,setText} = useState('');

   const onSubmit =async () =>{

		await createJournal(config, 'Bearer '+user.accessToken,name,
		text,hidden);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
	}

  const handleStartDate = (date) => {
    setStartDate(date)
  };
  const handleDueDate = (date) => {
    setDueDate(date)
  };

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2"  placeholder="Time Taken (in mins)"  
          value={timeTaken} Name='text' 
          onChangeText={text => setTimeTaken(text)}/>
        <TextInput 
          className="flex-1 mx-2 w-1/3 bg-white p-2"
          placeholder="Every"  value={every} Name='text' 
          onChangeText={text => setEvery(String(text))}/>
      </View>
      <View className="flex-row my-2">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>handleScheduleTypeChange(value)} 
          placeholder="Schedule Type" selected={scheduleType} >
            {scheduleTypes.map((schedule)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={schedule} value={schedule}/>
            ))}
        </SelectPicker>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setActive(value)} 
          placeholder="Active" selected={scheduleType} >
              <SelectPicker.Item className="text-gray-400 " 
              label="Yes" value="true"/>
              <SelectPicker.Item className="text-gray-400 " 
              label="No" value="false"/>
        </SelectPicker>

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
          <Text className="text-gray-400">{startDate.getDate()}-
          {startDate.getMonth()}-{startDate.getFullYear()}</Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setShowDueDate(!showDueDate)}
        className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Due Date">
          <Text className="text-gray-400">{dueDate.getDate()}-
          {dueDate.getMonth()}-{dueDate.getFullYear()}</Text>
        </TouchableOpacity>
      </View>
      <View>
        {showStartDate?
            <DateTimePicker
            isVisible={showStartDate}
            mode="date"
            onConfirm={handleStartDate}
            onCancel={()=>showStartDate(false)}
          />
         :null}
         {showDueDate?
            <DateTimePicker
            isVisible={showDueDate}
            mode="date"
            onConfirm={handleDueDate}
            onCancel={()=>showDueDate(false)}
          />
         :null}
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Journal</Text>
        </TouchableOpacity>
        
      </View>

    </View>
  )
}

export default AddJournalForm