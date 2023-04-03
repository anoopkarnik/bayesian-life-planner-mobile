import { View, Text,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import Ionicons from 'react-native-vector-icons/Ionicons'

const ConfigureItem = (props) => {
    const [isEditing,setIsEditing] = useState(false);
	const [name,setName] = useState(props.record.name);
	const {user,setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

    const onEdit = async() =>{
        if(isEditing){
            await props.editFunction(config,'Bearer '+user.accessToken,props.record.id,name)
		    await props.refreshFunction(config,'Bearer '+user.accessToken)
        }
        setIsEditing(!isEditing);
	}


	const onDelete = async() =>{
        await props.deleteFunction(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+user.accessToken)
	}
  return (
    <View className="divide divide-gray-200 min-w-full border">
        {isEditing?
		    <TextInput required='required' Name='text' 
				id='name' placeholder='name' value={name} 
				onChange={(event) => setName(event.target.value)}/>:
						<Text>{props.record.name}</Text>
		}
        <Ionicons name="create-outline" size="10" color="gray"/>
        <Ionicons name="close-circle-outline" size="10" color="gray"/>
    </View>
  )
}

export default ConfigureItem