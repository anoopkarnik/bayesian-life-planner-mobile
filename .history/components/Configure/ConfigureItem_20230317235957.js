import { View, Text,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import {PencilIcon,XCircleIcon}  
from "react-native-heroicons/solid";

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
    <View className="flex-row ">
        <View className="flex-1">
            {isEditing?
                <TextInput required='required' Name='text' 
                    id='name' placeholder='name' value={name} 
                    onChangeText={text => setName(text)}/>:
                            <Text className="text-xl">{props.record.name}</Text>
            }
        </View>
        <PencilIcon color="black" height={20} width={20}/>
        <XCircleIcon color="black" height={20} width={20}/>
    </View>
  )
}

export default ConfigureItem