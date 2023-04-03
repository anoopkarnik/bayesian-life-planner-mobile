import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useBadHabite,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createRootBadHabit } from '../../api/BadHabitAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AddBadHabitForm = (props) => {

  const [name, setName] = useBadHabite('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useBadHabite(true);
  const [description,setDescription] = useBadHabite('')
	const {showActive} = useContext(ActiveContext);
  const [value,setValue] = useBadHabite(0);

  const onSubmit =async () =>{

		await createRootBadHabit(config, 'Bearer '+user.accessToken,name,
		props.name,value,description,active);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name,showActive);
	}

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2"  placeholder="Value"  
          value={value} Name='text' 
          onChangeText={text => setValue(text)}/>
        <SelectPicker className="flex-1 mx-2 w-1/3 bg-white p-2"
          onValueChange={(value)=>setActive(value)} 
          placeholder="Active" >
              <SelectPicker.Item className="text-gray-400 " 
              label="Yes" value="true"/>
              <SelectPicker.Item className="text-gray-400 " 
              label="No" value="false"/>
        </SelectPicker>
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add BadHabit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddBadHabitForm