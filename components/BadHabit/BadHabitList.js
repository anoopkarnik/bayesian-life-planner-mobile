import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
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
  const [records, setRecords] = useState([]);
  const [showBadHabit, setShowBadHabit] = useState(false);
  const [showAddBadHabit, setShowAddBadHabit] = useState(false);
  const {showActive} = useContext(ActiveContext);
  const isFocused = useIsFocused();

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
      <View className="flex-row py-3 px-2 bg-[#556581]">
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