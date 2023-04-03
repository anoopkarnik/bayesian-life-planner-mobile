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

    const refreshHabit = async(backend_url,bearerToken,habit,showCurrentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getHabits(config,bearerToken,habit,showCurrentActive);
      setRecords(record);
      setShowAddHabit(false)

    }

    
  return (
    <View >
        <TouchableOpacity 
          onPress={()=>setShowHabit(!showHabit)} className="align-middle p-3 px-10 mx-10 bg-gray-600">
            <Text className="text-xl text-white font-bold">{props.name}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default HabitList