import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { createCriteriaSet,createRule,createRuleSet, getAllCriteria, getAllCriteriaSet, getAllRule, modifyCriteriaSetParams, modifyRuleParams, modifyRuleSetParams } from '../../../api/RuleEngineAPI';

const AddChildRuleEngineForm = (props) => {

	const [name, setName] = useState(props.record.name);
	const [childrenOptions, setChildrenOptions] = useState([])
	const [childIds, setChildIds] = useState([]);
	const { user, setUser } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [children,setChildren] = useState(props.children)
	const [criteria,setCriteria] = useState('')

	const criteriaOptions = [
		{value:'TASK', label: 'Task'},
		{value:'HABIT', label:'Habit'},
		{value:'BAD_HABIT',label:'Bad Habit'},
		{value:'SKILL',label:'Skill'},
		{value:'STAT',label:'Stat'},
		{value:'ACCOUNT',label:'Account'},
		{value:'FUND',label:'Fund'},
		{value:'BUDGET_PLAN',label:'Budget Plan'},
		{value:'TRANSACTION',label:'Transaction'},
		{value:'MONTHLY_BUDGET',label:'Monthly Budget'}
	  ]

	useEffect(()=>{
		updateChildren();
		currentChildIds();
	},[])

	const updateCriteria = async(value)=>{
		setCriteria(value);
		const criteriaList = await getAllCriteria(config, 'Bearer ' + user.accessToken,value)
			var options = new Array();
			for(var j =0;j<criteriaList.length;j++){
				let json = {
					'label':criteriaList[j]['name'],
					'value':criteriaList[j]['id']
				}
				options.push(json)
		  	}
		setChildrenOptions(options)
	}

	const updateChildren =async()=>{
		if(props.name==="Rule"){
			const criteriaSetList = await getAllCriteriaSet(config, 'Bearer ' + user.accessToken)
			var options = new Array();
			for(var j =0;j<criteriaSetList.length;j++){
				let json = {
					'label':criteriaSetList[j]['name'],
					'value':criteriaSetList[j]['id']
				}
				options.push(json)
		  	}
			setChildrenOptions(options)
		}
		else if(props.name==="Rule Set"){
			const ruleList = await getAllRule(config, 'Bearer ' + user.accessToken)
			var options = new Array();
			for(var j =0;j<ruleList.length;j++){
				let json = {
					'label':ruleList[j]['name'],
					'value':ruleList[j]['name']
				}
				options.push(json)
		  	}
			setChildrenOptions(options)
		}
	}

	const currentChildIds= ()=>{
		const childrenIds = []
		props.children.map((child)=>{
			childrenIds.push(child.id)
		})
		setChildIds(childrenIds)
	}

	const updateChildIds = async(value)=>{
		setChildIds(childIds=>[...childIds,value])
	}

	const onSubmit = async () => {
		if (props.name==="Criteria Set"){
			await modifyCriteriaSetParams(config, 'Bearer ' + user.accessToken, 
			props.record.id,name,childIds);
		}
		else if(props.name==="Rule"){
			await modifyRuleParams(config, 'Bearer ' + user.accessToken, 
			props.record.id,name,childIds);
		}
		else if(props.name==="Rule Set"){
			await modifyRuleSetParams(config, 'Bearer ' + user.accessToken,
			props.record.id,name,childIds);
		}
		props.refreshFunction()
	}

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
		{props.name==='Criteria Set'?
	  	<SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={updateCriteria} 
          placeholder="Criteria" selected={criteria} >
            {criteriaOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>:null}
		<SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={updateChildIds} 
          placeholder="Children Options" selected={children} >
            {childrenOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
		</View>
		<View className="flex-row ">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add {props.name} </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddChildRuleEngineForm