import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { getAllCompletedRules,getAllWorkRules } from '../../api/RuleAPI';
import AddCompletedRuleForm from './AddCompletedRuleForm';
import AddWorkRuleForm from './AddWorkRuleForm';
import RuleItem from './RuleItem';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';

const RuleList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [completedRecords, setCompletedRecords] = useState(props.completedRecords);
  const [workRecords, setWorkRecords] = useState(props.workRecords);
  const [showCompletedRule, setShowCompletedRule] = useState(false);
  const [showAddCompletedRule,setShowAddCompletedRule] = useState(false);
  const [showWorkRule, setShowWorkRule] = useState(false);
  const [showAddWorkRule,setShowAddWorkRule] = useState(false);
  const isFocused = useIsFocused();
  
    useEffect(() => {
      isFocused && refreshGoal(config,'Bearer '+user.accessToken,props.goal,showActive)
    }, [showActive,isFocused]);

    const refreshGoalDescription = async(backend_url,bearerToken,id) => {
      const completedRecord = await getAllCompletedRules(config,'Bearer '+user.accessToken,
      props.record.id);
      const workRecord = await getAllWorkRules(config,'Bearer '+user.accessToken,
      props.record.id);
      setCompletedRecords(completedRecord);
      setWorkRecords(workRecord);
      setShowAddCompletedRule(false);
      setShowAddWorkRule(false);
    }

    useEffect(() => {
      refreshGoalDescription(config,'Bearer '+user.accessToken,
      props.record.id);
    }, []);

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-gray-600">
        <TouchableOpacity 
          onPress={()=>setShowCompletedRule(!showCompletedRule)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">Completion Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddCompletedRule(!showAddCompletedRule)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      <View className="flex-row py-3 px-2 bg-gray-600">
        <TouchableOpacity 
          onPress={()=>setShowWorkRule(!showWorkRule)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">Work Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddWorkRule(!showAddWorkRule)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showCompletedRule?
        <View>
          {completedRecords?.map((record)=>(
            <RuleItem key={record.id} record={record} refreshFunction={refreshGoalDescription}/>
          ))}          
      </View>:null}


    </View>
  )
}

export default GoalList