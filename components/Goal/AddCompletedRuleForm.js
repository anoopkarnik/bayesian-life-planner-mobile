import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { addCompletedRule } from '../../api/GoalAPI';
import { getAllCriteria,getAllCriteriaSet,getAllRule,getAllRuleSet } from '../../api/RuleEngineAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ruleEngineOptions,criteriaOptions } from '../../variables';

const AddCompletedRuleForm = (props) => {

  const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [ruleEngineType, setRuleEngineType] = useState('')
	const [criteriaType,setCriteriaType] = useState('')
	const [ruleEngineReference,setRuleEngineReference] = useState('')
	const [ruleEngineReferenceOptions,setRuleEngineReferenceOptions] = useState([])

	const onSubmit = async() =>{
		await addCompletedRule(config,'Bearer '+user.accessToken,
		props.id,ruleEngineReference);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.id);
	}

	const updateRuleEngineType = async(value) =>{
		setRuleEngineType(value)
		var ruleEngineReferenceOptions = new Array();
		if (value==="Criteria Set"){
			const ruleEngineReferenceList = await getAllCriteriaSet(config,'Bearer '+user.accessToken)
			for(var j =0;j<ruleEngineReferenceList.length;j++){
				let json = {
					'label':ruleEngineReferenceList[j]['name'],
					'value':ruleEngineReferenceList[j]['id']
				}
				ruleEngineReferenceOptions.push(json)
			  }
			setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
		}
		else if(value==="Rule"){
			const ruleEngineReferenceList = await getAllRule(config,'Bearer '+user.accessToken)
			for(var j =0;j<ruleEngineReferenceList.length;j++){
				let json = {
					'label':ruleEngineReferenceList[j]['name'],
					'value':ruleEngineReferenceList[j]['id']
				}
				ruleEngineReferenceOptions.push(json)
			  }
			  setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
		}
		else if(value==="Rule Set"){
			const ruleEngineReferenceList = await getAllRuleSet(config,'Bearer '+user.accessToken)
			for(var j =0;j<ruleEngineReferenceList.length;j++){
				let json = {
					'label':ruleEngineReferenceList[j]['name'],
					'value':ruleEngineReferenceList[j]['id']
				}
				ruleEngineReferenceOptions.push(json)
			  }
			  setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
		}
		// props.refreshFunction(config, 'Bearer ' + user.accessToken)
		
	}
	
	const updateCriteriaType = async(value) =>{
		setCriteriaType(value)
		const ruleEngineReferenceOptions = getAllCriteria(config, 'Bearer ' + user.accessToken,value)
		setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
	}

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
            onValueChange={updateRuleEngineType} 
            placeholder="Rule Engine Type" selected={ruleEngineType} >
              {ruleEngineOptions.map((option)=>(
                <SelectPicker.Item className="text-gray-400 " 
                label={option.label} value={option.value}/>
              ))}
          </SelectPicker>
          {ruleEngineType==='Criteria'?
          <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
            onValueChange={(value)=>setCriteriaType(value)} 
            placeholder="Critria Type" selected={criteriaType} >
              {criteriaOptions.map((option)=>(
                <SelectPicker.Item className="text-gray-400 " 
                label={option.label} value={option.value}/>
              ))}
          </SelectPicker>:null}
      </View>
      <View className=" flex-row ">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
            onValueChange={(value)=>setRuleEngineReference(ruleEngineType+'/'+value)} 
            placeholder="Rule Engine Reference" selected={ruleEngineReference} >
              {ruleEngineReferenceOptions.map((option)=>(
                <SelectPicker.Item className="text-gray-400 " 
                label={option.label} value={option.value}/>
              ))}
          </SelectPicker>
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCompletedRuleForm