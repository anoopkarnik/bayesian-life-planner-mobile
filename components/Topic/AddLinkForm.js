import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { addLinkToTopic, addSubTopicToTopic } from '../../api/TopicAPI';
import { PlusIcon } from 'react-native-heroicons/solid';


const AddTopicForm = (props) => {

	const [name, setName] = useState('');
	const [url,setUrl] = useState('')
	const [manualSummary, setManualSummary] = useState('')
	const [aiSummary,setAiSummary] = useState('')
	const [transcript,setTranscript] = useState('')
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	

	const onSubmit =async () =>{
		await addLinkToTopic(config, 'Bearer '+user.accessToken,props.topicId,name,url,manualSummary,
    aiSummary,transcript);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.topicId);
	}
  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
      </View>
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Url"  
          value={url} Name='text' 
          onChangeText={text => setUrl(text)}/>
      </View>
	  <View className="align-center my-2">
            <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder="Manual Summary"  value={manualSummary} Name='text' 
                onChangeText={text => setManualSummary(text)}/>
        </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Link</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default AddTopicForm