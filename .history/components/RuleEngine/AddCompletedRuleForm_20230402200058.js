import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { getTotalTasks,getTotalHabits,getTotalStats,getTotalSkills,
  getTotalBadHabits } from '../../api/AdminAPI';
import { createCompletedRule,getAllTypes,getAllNames } from '../../api/RuleAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AddCompletedRuleForm = (props) => {

  const [ruleType,setRuleType] = useState('')
	const [name, setName] = useState('');
	const [value, setValue ] = useState('');
	const [id, setId] = useState('');
	const [goalId, setGoalId] = useState(props.id)
	const [conditionType, setConditionType] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [conditionOptions, setConditionOptions] = useState([]);
	const [totalTypes, setTotalTypes]  = useState([]);
	const [names, setNames] = useState([]);
	const [weightage,setWeightage] = useState(1);
	

	const ruleOptions = [
		{value:'task', label: 'Task'},
		{value:'habit', label:'Habit'},
		{value:'badHabit',label:'Bad Habit'},
		{value:'skill',label:'Skill'},
		{value:'stat',label:'Stat'}
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

	const statOptions1 = [
		{value:'STAT_HIGHER_PREFERRED',label: 'Higher is acceptable'},
		{value:'STAT_LOWER_PREFERRED',label: 'Lower is accepatable'}
	]

	const onRuleTypeChange = async(event)=>{
		setRuleType(event.value);
		const types = await getAllTypes(config,'Bearer '+user.accessToken,event.value)
		setTotalTypes(types);
		if (event.value ==="task"){
			setConditionOptions(taskOptions1);
		}
		else if(event.value ==="habit"){
			setConditionOptions(habitOptions1);
		}
		else if(event.value ==="badHabit"){
			setConditionOptions(badHabitOptions1);
		}
		else if(event.value ==="skill"){

		}
		else if(event.value ==="stat"){
			setConditionOptions(statOptions1);
		}
	}

	const onCategoryTypeChange = async(event) =>{
		const data = await getAllNames(config,'Bearer '+user.accessToken,ruleType,event.value)
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
          placeholder="Condition Type">
            {conditionOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
      </View>
      <View className="flex-row ">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={onCategoryTypeChange} 
          placeholder="Category Type" selected={categoryType} >
            {totalTypes.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={onC} 
          placeholder="Rule Type" selected={ruleType} >
            {names.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCompletedRuleForm