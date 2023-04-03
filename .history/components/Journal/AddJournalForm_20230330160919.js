import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createJournal } from '../../api/JournalAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';

const AddJournalForm = (props) => {

  const [name, setName] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [hidden, setHidden] = useState(false);
	const {showActive} = useContext(ActiveContext);
  const {text,setText} = useState('');

   const onSubmit =async () =>{

		await createJournal(config, 'Bearer '+user.accessToken,name,
		text,hidden);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
	}

  const handleStartDate = (date) => {
    setStartDate(date)
  };
  const handleDueDate = (date) => {
    setDueDate(date)
  };

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
      <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setHidden(value)} 
          placeholder="Hidden" selected={hidden} >
              <SelectPicker.Item className="text-gray-400 " 
              label="Yes" value="true"/>
              <SelectPicker.Item className="text-gray-400 " 
              label="No" value="false"/>
        </SelectPicker>
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Journal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddJournalForm