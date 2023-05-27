import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../../context/UserContext';
import { getAllTypes,getAllNames } from '../../../api/RuleEngineAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { createCriteria } from '../../../api/RuleEngineAPI';

const AddCriteriaForm = (props) => {

  const [name, setName] = useState('');
	const [active, setActive] = useState('true');
	const [criteriaType, setCriteriaType] = useState(props.name);
	const [condition, setCondition] = useState('');
	const [category, setCategory] = useState('');
	const [value, setValue] = useState('');
	const [categoryName, setCategoryName] = useState('')
	const [weightage, setWeightage] = useState('');
	const { user, setUser } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [conditionOptions, setConditionOptions] = useState([])
	const [categoryOptions, setCategoryOptions] = useState([])
	const [categoryNameOptions, setCategoryNameOptions] = useState([])

	useEffect(() => {
		refreshCriteriaForm(config, 'Bearer ' + user.accessToken, props.name)
	},[])

	const refreshCriteriaForm = async (backend_url,bearerToken,name) => {
		await updateConditions();
		const categories = await getAllTypes(backend_url,bearerToken,name)
		setCategoryOptions(categories);

	}
	const updateConditions = async () => {
		if (criteriaType === 'TASK') {
			setConditionOptions(taskOptions);
		}
		else if (criteriaType === 'ACCOUNT') {
			setConditionOptions(accountOptions);
		}
		else if (criteriaType === 'BAD_HABIT') {
			setConditionOptions(badHabitOptions);
		}
		else if (criteriaType === 'BUDGET') {
			setConditionOptions(budgetOptions);
		}
		else if (criteriaType === 'FUND') {
			setConditionOptions(fundOptions)
		}
		else if (criteriaType === 'HABIT') {
			setConditionOptions(habitOptions)
		}
		else if (criteriaType === 'SKILL') {
			setConditionOptions(skillOptions)
		}
		else if (criteriaType === 'STAT') {
			setConditionOptions(statOptions)
		}
	}
	const taskOptions = [
		{ value: 'TASK_COMPLETED', label: 'Completed' }
	]
	const habitOptions = [
		{ value: 'HABIT_TOTAL_TIMES', label: 'Total Times' },
		{ value: 'HABIT_STREAK', label: 'Streak' },
		{ value: 'HABIT_TOTAL_TIME_SPENT', label: 'Total Time Spent' },
		{ value: 'HABIT_TOTAL_TIME_WEEKLY', label: 'Total Times Weekly' },
		{ value: 'HABIT_TOTAL_TIME_MONTHLY', label: 'Total Times Monthly' }
	]
	const badHabitOptions = [
		{ value: 'BAD_HABIT_WEEKLY', label: 'Weekly times repeated' },
		{ value: 'BAD_HABIT_MONTHLY', label: 'Monthly times repeated' },
		{ value: 'BAD_HABIT_YEARLY', label: 'Yearly times repeated' },
		{ value: 'BAD_HABIT_LAST_TIME', label: 'Last time completed' }
	]

	const statOptions = [
		{ value: 'STAT_HIGHER_PREFERRED', label: 'Higher is acceptable' },
		{ value: 'STAT_LOWER_PREFERRED', label: 'Lower is accepatable' }
	]

	const skillOptions = [
		{ value: 'SKILL_COMPLETED', label: 'Skill is Completed' },
		{ value: 'SKILL_TOTAL_TIME_SPENT', label: 'Total time spent for skill' }
	]

	const fundOptions = [
		{ value: 'FUND_REACHED', label: 'Fund Reached' }
	]

	const accountOptions = [
		{ value: 'ACCOUNT_REACHED', label: 'Account Reached' }
	]

	const budgetOptions = [
		{ value: 'DELIGHT_BUDGET_MAINTAINED', label: 'Delight Budget is Maintained' },
		{ value: 'LIVING_BUDGET_MAINTAINED', label: 'Living Budget is Maintained' },
		{ value: 'GROWTH_BUDGET_MAINTAINED', label: 'Growth Budget is Maintained' },
	]

	const onSubmit = async () => {
		await createCriteria(config, 'Bearer ' + user.accessToken, name, criteriaType,
			condition, category, weightage, value, categoryName);
		props.refreshFunction(config, 'Bearer ' + user.accessToken,props.name)
	}

	const onCategoryChange = async (value) => {
		setCategory(value);
		const data = await getAllNames(config, 'Bearer ' + user.accessToken, criteriaType,value)
		setCategoryNameOptions(data);
	}

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setCondition(value)} 
          placeholder="Condition" selected={condition} >
            {conditionOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
      </View>
      <View className="flex-row ">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={onCategoryChange} 
          placeholder="Category Type" selected={category} >
            {categoryOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
          </SelectPicker>
          <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setCategoryName(value)} 
          placeholder="Category Name" selected={categoryName} >
            {categoryNameOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
          </SelectPicker>
      </View>
      <View className="flex-row ">
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
          <Text>Add Criteria</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCriteriaForm