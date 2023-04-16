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
        onPress={()=>setShow(!show)} className="flex-row py-3 px-2 bg-[#556581]">
            <Text 
            className="text-xl text-white font-bold">{props.name}</Text>
        </TouchableOpacity>
        {show?
          <View>
            <View className="bg-gray-400 py-3 px-2">
                {props.records.map((record)=>(
                    <ConfigureItem name={props.name} record={record} 
                        createFunction={props.createFunction} 
                        deleteFunction={props.deleteFunction} 
                        refreshFunction={props.refreshFunction} 
                        editFunction={props.editFunction}/>
                ))}
            </View>
            <View className="flex-row bg-gray-400 justify-center items-center ">
              <View className=" py-3 px-2 flex-1" >
                <TextInput
                    className="text-black "
                    placeholder="Type New Category"  placeholderTextColor="#222" value={newName}
                    onChangeText={text => setNewName(text)}/>  
              </View>  
              <View>
                <TouchableOpacity className="bg-gray-700 p-3 px-10 mr-2 " onPress={onCreate}>
                  <Text className="text-white" >Add</Text>
                </TouchableOpacity>
                </View>
            </View>
          </View>:null}
    </View>
  )
}

export default ConfigureList