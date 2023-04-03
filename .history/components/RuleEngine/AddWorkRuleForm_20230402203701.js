import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { getTotalTasks,getTotalHabits,getTotalStats,getTotalSkills,
  getTotalBadHabits } from '../../api/AdminAPI';
import { createWorkRule,getAllTypes,getAllNames } from '../../api/RuleAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AddWorkRuleForm = (props) => {

  const [ruleType,setRuleType] = useState('')
	const [name, setName] = useState('');
	const [value, setValue ] = useState('');
	const [id, setId] = useState('');
	const [goalId, setGoalId] = useState(props.id)
	const [conditionType, setConditionType] = useState('');
  const [categoryType,setCategoryType] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [conditionOptions, setConditionOptions] = useState([]);
	const [totalTypes, setTotalTypes]  = useState([]);
	const [names, setNames] = useState([]);
	const [weightage,setWeightage] = useState(1);
	

	const ruleOptions = [
		{value:'task', label: 'Task'},
		{value:'habit', label:'Habit'},
		{value:'badHabit',label:'Bad Habit'}
	  ]

	const taskOptions1 = [
		{value:'TASK_COMPLETED', label: 'Completed'}
	]
	const habitOptions1 = [
		{value:'HABIT_TOTAL_TIMES', label: 'Total Times'},
		{value:'HABIT_STREAK', label: 'Streak'},
		{value:'HABIT_TOTAL_TIME_SPENT', label: 'Total Time Spent'}
	]
	const badHabitOptions1 = [
		{value:'BAD_HABIT_MONTHLY', label: 'Monthly times repeated'},
		{value:'BAD_HABIT_YEARLY', label: 'Yearly times repeated'},
		{value:'BAD_HABIT_LAST_TIME', label: 'Last time completed'}
	]


	const onRuleTypeChange = async(value)=>{
		setRuleType(value);
		const types = await getAllTypes(config,'Bearer '+user.accessToken,value)
		setTotalTypes(types);
		if (value ==="task"){
			setConditionOptions(taskOptions1);
		}
		else if(value ==="habit"){
			setConditionOptions(habitOptions1);
		}
		else if(value ==="badHabit"){
			setConditionOptions(badHabitOptions1);
		}
		else if(value ==="skill"){

		}
	}

	const onCategoryTypeChange = async(value) =>{
		const data = await getAllNames(config,'Bearer '+user.accessToken,ruleType,value)
		setNames(data);
	}

	const onSubmit = async() =>{
		await createCompletedRule(config,'Bearer '+user.accessToken,
		ruleType,name,id,props.id,value,conditionType,weightage);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.id);
	}
  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={onRuleTypeChange} 
          placeholder="Rule Type" selected={ruleType} >
            {ruleOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setConditionType(value)} 
          placeholder="Condition Type" selected={conditionType} >
            {conditionOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
      </View>
      <View className="flex-row my-2">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={onCategoryTypeChange} 
          placeholder="Category Type" selected={categoryType} >
            {totalTypes.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setId(value)} 
          placeholder="Rule Type" selected={ruleType} >
            {names.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
      </View>
      <View className="flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2"  placeholder="Value"  
          value={value} Name='text' 
          onChangeText={text => setValue(String(text))}/>
        <TextInput 
          className="flex-1 mx-2 w-1/3 bg-white p-2"
          placeholder="Weightage"  value={weightage} Name='text' 
          onChangeText={text => setWeightage(String(text))}/>        
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Rule</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddWorkRuleForm