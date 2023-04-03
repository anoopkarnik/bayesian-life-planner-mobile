import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React,{useState,useContext} from 'react'
import ConfigureItem from './ConfigureItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

const ConfigureList = (props) => {
    const [newName,setNewName] = useState('');
    const [key,setKey] = useState('Add '+props.name)
    const {user, setUser} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [show, setShow] = useState(false);

    const onCreate = async() =>{
        await props.createFunction(config,'Bearer '+user.accessToken,newName)
        await props.refreshFunction(config,'Bearer '+user.accessToken)
        setKey('Add '+props.name);
    }

    
  return (
    <View >
        <TouchableOpacity 
        onPress={()=>setShow(!show)} className="align-middle p-3 px-10 mx-10 bg-gray-600">
            <Text 
            className="text-xl text-white font-bold">{props.name}</Text>
        </TouchableOpacity>
      {show?
      <View>
        <View className="bg-gray-400 p-3 px-10 mx-10">
            {props.records.map((record)=>(
                <ConfigureItem name={props.name} record={record} 
                    createFunction={props.createFunction} 
                    deleteFunction={props.deleteFunction} 
                    refreshFunction={props.refreshFunction} 
                    editFunction={props.editFunction}/>
            ))}
        </View>
        <View>
            <TextInput
                className="bg-gray-900 p-3 px-10 mx-10 text-white border-solid border-1 border-violet-200"
                placeholder="Name"  placeholderTextColor="#FFF" value={newName}
                onChangeText={text => setNewName(text)}/>    
        </View>
      </View>:null}
    </View>
  )
}

export default ConfigureList