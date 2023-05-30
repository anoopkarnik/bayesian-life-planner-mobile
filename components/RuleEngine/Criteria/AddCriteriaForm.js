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
import { taskOptions,badHabitOptions,budgetOptions,fundOptions,
habitOptions,skillOptions,statOptions,accountOptions } from '../../../variables';

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
	const [showCategory,setShowCategory] = useState(false);
	const [showCategoryName, setShowCategoryName] = useState(false)

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
			setShowCategoryName(true)
		}
		else if (criteriaType === 'ACCOUNT') {
			setConditionOptions(accountOptions);
		}
		else if (criteriaType === 'BAD_HABIT') {
			setConditionOptions(badHabitOptions);
			setShowCategoryName(true)
		}
		else if (criteriaType === 'BUDGET') {
			setConditionOptions(budgetOptions);
			setShowCategoryName(true)
		}
		else if (criteriaType === 'FUND') {
			setConditionOptions(fundOptions)
		}
		else if (criteriaType === 'HABIT') {
			setConditionOptions(habitOptions)
			setShowCategoryName(true)
		}
		else if (criteriaType === 'SKILL') {
			setConditionOptions(skillOptions)
			setShowCategoryName(true)
		}
		else if (criteriaType === 'STAT') {
			setConditionOptions(statOptions)
			setShowCategoryName(true)
		}
		setShowCategory(true);
	}

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
		{showCategory?
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={onCategoryChange} 
          placeholder="Category Type" selected={category} >
            {categoryOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
          </SelectPicker>:null}
		  {showCategoryName?
          <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setCategoryName(value)} 
          placeholder="Category Name" selected={categoryName} >
            {categoryNameOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
          </SelectPicker>:null}
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