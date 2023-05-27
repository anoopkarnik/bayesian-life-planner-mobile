import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import { getAllCriteria } from '../../../api/RuleEngineAPI';
import CriteriaItem from './CriteriaItem';
import CriteriaDescription from './CriteriaDescription';
import AddCriteriaForm from './AddCriteriaForm';

const CriteriaList = (props) => {

  const {user} = useContext(UserContext);
  const [showDescription, setShowDescription] =useState(false);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showCriteria, setShowCriteria] = useState(false);
  const [showAddCriteria, setShowAddCriteria] = useState(false);
  const isFocused = useIsFocused();
  
      const refreshCriteria = async(backend_url,bearerToken,value) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getAllCriteria(config,'Bearer '+user.accessToken,value)
      setRecords(record);
      setShowAddCriteria(false)
    }

    useEffect(() => {
      isFocused && refreshCriteria(config,'Bearer '+user.accessToken,props.record.value);
    }, [isFocused]);

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowCriteria(!showCriteria)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.record.value}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddCriteria(!showAddCriteria)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showCriteria?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <CriteriaItem record={record} key={record.id}
                refreshFunction={refreshCriteria}/>
            ))}
        </View>
      </View>:null}
      {showAddCriteria?
      <AddCriteriaForm refreshFunction={refreshCriteria} name={props.record.value}/>:null}
    </View>
  )
}

export default CriteriaList