import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import { getAllCriteriaSet,getAllRule,getAllRuleSet} from '../../../api/RuleEngineAPI';
import AddRuleEngineForm from './AddRuleEngineForm';
import RuleEngineItem from './RuleEngineItem';
import ChildRuleEngineItem from './ChildRuleEngineItem';

const RuleEngineList = (props) => {

  const {user} = useContext(UserContext);
  const [showDescription, setShowDescription] =useState(false);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showRuleEngine, setShowRuleEngine] = useState(false);
  const [showAddRuleEngine, setShowAddRuleEngine] = useState(false);
  const isFocused = useIsFocused();
  
  const refreshRuleEngine = async(backend_url,bearerToken) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      if(props.name==="Criteria Set"){
        const record = await getAllCriteriaSet(config,'Bearer '+user.accessToken)
        setRecords(record);
      }
      else if(props.name==="Rule"){
        const record = await getAllRule(config,'Bearer '+user.accessToken)
        setRecords(record);
      }
      else if(props.name==="Rule Set"){
        const record = await getAllRuleSet(config,'Bearer '+user.accessToken)
        setRecords(record);
      }
      setShowAddRuleEngine(false)
    }

    useEffect(() => {
      isFocused && refreshRuleEngine(config,'Bearer '+user.accessToken);
    }, [isFocused]);

    const onshowAddRuleEngine = async() =>{
      setShowAddRuleEngine(true);
    }
  
    const onHideAddRuleEngine= async() =>{
      setShowAddRuleEngine(false);
    }	

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowRuleEngine(!showRuleEngine)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddRuleEngine(!showAddRuleEngine)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showRuleEngine?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <RuleEngineItem record={record} key={record.id} name={props.name}
                refreshFunction={refreshRuleEngine}/>
            ))}
        </View>
      </View>:null}
      {showAddRuleEngine?
      <AddRuleEngineForm refreshFunction={refreshRuleEngine} name={props.name}/>:null}
    </View>
  )
}

export default RuleEngineList