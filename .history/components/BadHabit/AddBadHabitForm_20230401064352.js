import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createRootBadHabit } from '../../api/BadHabitAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AddBadHabitForm = (props) => {

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useState(true);
	const {showActive} = useContext(ActiveContext);
  const [showStartDate,setShowStartDate] = useState(false);

  const onSubmit =async () =>{

		await createRootBadHabit(config, 'Bearer '+user.accessToken,name,
		startDate,props.name,active);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name,showActive);
	}

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TouchableOpacity onPress={()=>setShowStartDate(!showStartDate)}
          className="mx-2 bg-white p-2" placeholder="Start Date">
          <Text className="text-gray-400">{startDate.getDate()}-
          {startDate.getMonth()}-{startDate.getFullYear()}</Text>  
        </TouchableOpacity>
        {showStartDate?
            <DateTimePicker
            isVisible={showStartDate}
            mode="date"
            onConfirm={handleStartDate}
            onCancel={()=>showStartDate(false)}
          />
         :null}
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