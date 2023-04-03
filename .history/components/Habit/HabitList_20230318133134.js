import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import HabitItem from './HabitItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

const HabitList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showHabit, setShowHabit] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const {showActive} = useContext(ActiveContext);

    const onCreate = async() =>{
        await props.createFunction(config,'Bearer '+user.accessToken,newName)
        await props.refreshFunction(config,'Bearer '+user.accessToken)
        setKey('Add '+props.name);
    }
    useEffect(() => {
      refreshHabit(config,'Bearer '+user.accessToken,props.habit,showActive)
    }, [showActive]);

    
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
                <HabitItem name={props.name} record={record} 
                    createFunction={props.createFunction} 
                    deleteFunction={props.deleteFunction} 
                    refreshFunction={props.refreshFunction} 
                    editFunction={props.editFunction}/>
            ))}
        </View>
        <View className="flex-row">
            <TextInput
                className="flex-1 bg-gray-400 p-3 px-10 ml-10 text-black border-solid border-2 border-black"
                placeholder="Name"  placeholderTextColor="#FFF" value={newName}
                onChangeText={text => setNewName(text)}/>    
            <TouchableOpacity className="flex-1 bg-gray-700 p-3 px-10 mr-10 border-solid border-2 border-black" onPress={onCreate}>
              <Text className="text-white" >Add</Text>
            </TouchableOpacity>
        </View>
      </View>:null}
    </View>
  )
}

export default HabitList