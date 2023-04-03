import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { getTotalTasks,getTotalHabits,getTotalStats,getTotalSkills,
  getTotalBadHabits } from '../../api/AdminAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AddCompletedRuleForm = (props) => {

  const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
  const [dueDate, setDueDate] = useState(new Date());
	const [active, setActive] = useState(true);
	const {showActive} = useContext(ActiveContext);
  const [showDueDate,setShowDueDate] = useState(false);

   const onSubmit =async () =>{
		await createRootGoal(config, 'Bearer '+user.accessToken,name,
		props.name,dueDate,active);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name,showActive);
	}

  const handleDueDate = (date) => {
    setDueDate(date)
  };
  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setActive(value)} 
          placeholder="Active" selected={active} >
              <SelectPicker.Item className="text-gray-400 " 
              label="Yes" value="true"/>
              <SelectPicker.Item className="text-gray-400 " 
              label="No" value="false"/>
        </SelectPicker>
        <TouchableOpacity onPress={()=>setShowDueDate(!showDueDate)}
        className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Due Date">
          <Text className="text-gray-400">{dueDate.getDate()}-
          {dueDate.getMonth()}-{dueDate.getFullYear()}</Text>
        </TouchableOpacity>
      </View>
      {showDueDate?
            <DateTimePicker
            isVisible={showDueDate}
            mode="date"
            onConfirm={handleDueDate}
            onCancel={()=>showDueDate(false)}
          />
         :null}
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCompletedRuleForm