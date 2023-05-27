import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { createCriteriaSet,createRule,createRuleSet } from '../../../api/RuleEngineAPI';

const AddRuleEngineForm = (props) => {

  	const [name, setName] = useState('');
	const { user, setUser } = useContext(UserContext);
	const { config } = useContext(ConfigContext);

	const onSubmit = async () => {
		if (props.name==="Criteria Set"){
			await createCriteriaSet(config, 'Bearer ' + user.accessToken, name);
		}
		else if(props.name==="Rule"){
			await createRule(config, 'Bearer ' + user.accessToken, name);
		}
		else if(props.name==="Rule Set"){
			await createRuleSet(config, 'Bearer ' + user.accessToken, name);
		}
		props.refreshFunction(config, 'Bearer ' + user.accessToken)
	}

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add {props.name} </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddRuleEngineForm