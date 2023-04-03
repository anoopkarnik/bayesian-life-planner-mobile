import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useBadHabite,useContext,useEffect} from 'react'
import BadHabitItem from './BadHabitItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { getBadHabits } from '../../api/BadHabitAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import AddBadHabitForm from './AddBadHabitForm';
import { useIsFocused } from '@react-navigation/native';

const BadHabitList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useBadHabite([]);
  const [showBadHabit, setShowBadHabit] = useBadHabite(false);
  const [showAddBadHabit, setShowAddBadHabit] = useBadHabite(false);
  const {showActive} = useContext(ActiveContext);
  const isFocused = useIsFocused();

    const onCreate = async() =>{
        await props.createFunction(config,'Bearer '+user.accessToken,newName)
        await props.refreshFunction(config,'Bearer '+user.accessToken)
        setKey('Add '+props.name);
    }
    useEffect(() => {
      isFocused && refreshBadHabit(config,'Bearer '+user.accessToken,props.badHabit,showActive)
    }, [showActive,isFocused]);

    const refreshBadHabit = async(backend_url,bearerToken,badHabit,showCurrentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,badHabit)
      const record = await getBadHabits(config,bearerToken,badHabit,showCurrentActive);
      setRecords(record);
      setShowAddBadHabit(false)
    }

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-gray-600">
        <TouchableOpacity 
          onPress={()=>setShowBadHabit(!showBadHabit)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.badHabit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddBadHabit(!showAddBadHabit)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showBadHabit?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <BadHabitItem record={record} key={record.id}
                refreshFunction={refreshBadHabit}/>
            ))}
        </View>
      </View>:null}
      {showAddBadHabit?
      <AddBadHabitForm refreshFunction={refreshBadHabit} name={props.badHabit}/>:null}
    </View>
  )
}

export default BadHabitList