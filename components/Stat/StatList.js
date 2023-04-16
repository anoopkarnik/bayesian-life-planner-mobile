import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import StatItem from './StatItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { getStats } from '../../api/StatAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import AddStatForm from './AddStatForm';
import { useIsFocused } from '@react-navigation/native';

const StatList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showStat, setShowStat] = useState(false);
  const [showAddStat, setShowAddStat] = useState(false);
  const {showActive} = useContext(ActiveContext);
  const isFocused = useIsFocused();

    const onCreate = async() =>{
        await props.createFunction(config,'Bearer '+user.accessToken,newName)
        await props.refreshFunction(config,'Bearer '+user.accessToken)
        setKey('Add '+props.name);
    }
    useEffect(() => {
      isFocused && refreshStat(config,'Bearer '+user.accessToken,props.stat,showActive)
    }, [showActive,isFocused]);

    const refreshStat = async(backend_url,bearerToken,stat,showCurrentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,stat)
      const record = await getStats(config,bearerToken,stat,showCurrentActive);
      setRecords(record);
      setShowAddStat(false)
    }

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowStat(!showStat)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.stat}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddStat(!showAddStat)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showStat?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <StatItem record={record} key={record.id}
                refreshFunction={refreshStat}/>
            ))}
        </View>
      </View>:null}
      {showAddStat?
      <AddStatForm refreshFunction={refreshStat} name={props.stat}/>:null}
    </View>
  )
}

export default StatList