import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { topicTypeOptions } from '../../variables';
import { createTopic } from '../../api/TopicAPI';

const AddTopicForm = (props) => {

	const [name, setName] = useState('');
	const [description,setDescription] = useState('')
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

	const onSubmit =async () =>{
		await createTopic(config, 'Bearer '+user.accessToken,name,props.name,description);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name);
	}
  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
      </View>
	  <View className="align-center my-2">
                <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder="Description"  value={description} Name='description' 
                onChangeText={text => setDescription(text)}/>
        </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Topic</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddTopicForm