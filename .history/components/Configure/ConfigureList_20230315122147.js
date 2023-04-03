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
    <View className="align-middle justify-center">
        <TouchableOpacity className="p-3 px-10 mx-10 my-10 bg-gray-400">
            <Text onPress={()=>setShow(!show)} 
            className="text-xl font-bold">{props.name}</Text>
        </TouchableOpacity>
      {show?<View>
      <View>
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
        className="bg-gray-900 text-white mx-5 my-3 p-3 border-solid border-2 border-violet-400"
        placeholder="Name"  placeholderTextColor="#FFF"
        onChangeText={(name) => setName(name)}/>    
      </View></View>:null}
    </View>
  )
}

export default ConfigureList