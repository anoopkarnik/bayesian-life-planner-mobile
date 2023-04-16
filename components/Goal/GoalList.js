import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import GoalItem from './GoalItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { getGoals } from '../../api/GoalAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import AddGoalForm from './AddGoalForm';
import { useIsFocused } from '@react-navigation/native';

const GoalList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showGoal, setShowGoal] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const {showActive} = useContext(ActiveContext);
  const isFocused = useIsFocused();
  
    useEffect(() => {
      isFocused && refreshGoal(config,'Bearer '+user.accessToken,props.goal,showActive)
    }, [showActive,isFocused]);

    const refreshGoal = async(backend_url,bearerToken,goal,showCurrentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,goal)
      const record = await getGoals(config,bearerToken,goal,showCurrentActive);
      setRecords(record);
      setShowAddGoal(false)
    }

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowGoal(!showGoal)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.goal}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddGoal(!showAddGoal)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showGoal?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <GoalItem record={record} key={record.id}
                refreshFunction={refreshGoal}/>
            ))}
        </View>
      </View>:null}
      {showAddGoal?
      <AddGoalForm refreshFunction={refreshGoal} name={props.goal}/>:null}
    </View>
  )
}

export default GoalList