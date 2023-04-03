import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import HabitItem from './HabitItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { getHabits } from '../../api/HabitAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import AddHabitForm from './AddHabitForm';

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
    }, [showActive,records[0]?.name]);

    const refreshHabit = async(backend_url,bearerToken,habit,showCurrentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getHabits(config,bearerToken,habit,showCurrentActive);

      setRecords(record);
      setShowAddHabit(false)

    }

    
  return (
    <View >
      <View className="flex-row py-3 px-2 bg-gray-600">
        <TouchableOpacity 
          onPress={()=>setShowHabit(!showHabit)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.habit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddHabit(!showAddHabit)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showHabit?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <HabitItem record={record} 
                refreshFunction={refreshHabit}/>
            ))}
        </View>
      </View>:null}
      {showAddHabit?
      <AddHabitForm refreshFunction={refreshHabit} name={props.habit}/>:null}
    </View>
  )
}

export default HabitList