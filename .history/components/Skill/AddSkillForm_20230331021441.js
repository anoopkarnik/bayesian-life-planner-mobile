import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createRootSkill } from '../../api/SkillAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AddSkillForm = (props) => {

  const [name, setName] = useState('');
	const [timeTaken, setTimeTaken] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useState(true);
	const {showActive} = useContext(ActiveContext);

   const onSubmit =async () =>{
		console.log(weekDays);

		await createRootSkill(config, 'Bearer '+user.accessToken,name,
		props.name,timeTaken,active);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name,showActive);
	}

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2"  placeholder="Time Taken (in mins)"  
          value={timeTaken} Name='text' 
          onChangeText={text => setTimeTaken(text)}/>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setActive(value)} 
          placeholder="Active" selected={active} >
              <SelectPicker.Item className="text-gray-400 " 
              label="Yes" value="true"/>
              <SelectPicker.Item className="text-gray-400 " 
              label="No" value="false"/>
        </SelectPicker>
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Skill</Text>
        </TouchableOpacity>
        
      </View>

    </View>
  )
}

export default AddSkillForm