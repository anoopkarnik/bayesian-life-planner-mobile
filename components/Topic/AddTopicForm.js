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
	const [paragraph,setParagraph] = useState('')
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [topicTypeEnum,setTopicTypeEnum] = useState('')
	const [items,setItems] = useState([])
	const [showParagraph, setShowParagraph] = useState(false)
	const [showItems,setShowItems] = useState(false)
	const [item,setItem] = useState('')
	
	useEffect(()=>{

	},[items])

	const onTopicTypeChange = async(value) => {
		setTopicTypeEnum(value);
		if(value==='TOPIC_PARAGRAPH'){
			setShowParagraph(true)
		}
		else if(value==='TOPIC_LIST'){
			setShowItems(true)
		}
		else if(value==='TOPIC_URL'){
			setShowItems(true)
		}

	}

	const addItems = async() =>{
		setItems(items =>[...items,item])
	}

	const onSubmit =async () =>{
		await createTopic(config, 'Bearer '+user.accessToken,name,
		props.name,topicTypeEnum,paragraph,items);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name);
	}
  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className="flex-row ">
        <TextInput className="flex-1 mx-2 w-1/3 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={onTopicTypeChange} 
          placeholder="Topic Type" selected={topicTypeEnum} >
            {topicTypeOptions.map((option)=>(
              <SelectPicker.Item className="text-gray-400 " 
              label={option.label} value={option.value}/>
            ))}
        </SelectPicker>
      </View>
	  {showParagraph?
	  <View className="align-center">
                <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={paragraph}  value={paragraph} Name='text' 
                onChangeText={text => setParagraph(text)}/>
        </View>:null}
		{showItems?
		<View>
			{items.map((item,index)=>(
				<View className="flex-row">
					<Text className="text-xl text-white">{index}. {item}</Text>
				</View>
			))}
			<View className="flex-row">
			<TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={5}
                placeholder={item}  value={item} Name='text' 
                onChangeText={text => setItem(text)}/>
			</View>
			<View className="flex-row">
				<TouchableOpacity onPress={addItems} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
				<Text>Add Item</Text>
				</TouchableOpacity>
			</View>
		</View>:null}
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Topic</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddTopicForm