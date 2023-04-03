import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeGoal, deleteGoal} from '../../api/GoalAPI';
import GoalDescription from './GoalDescription';
import ChildGoalItem from './ChildGoalItem';
import AddChildGoalForm from './AddChildGoalForm';
// import AddChildGoalForm from './AddChildGoalForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const GoalItem = (props) => {
    var one_day = 1000*60*60*24
    var id = props.record.id;
    var createdAt = props.record.createdAt;
    var updatedAt = props.record.updatedAt;
    var name = props.record.name;
    var timeTaken = props.record.timeTaken;
    var startDate = props.record.startDate;
    var goalTypeName = props.record.goalTypeName;
    var description = props.record.description;
    var active = props.record.active;
    var hidden = props.record.hidden;
    var completed = props.record.completed;
    var completedPercentage = props.record.completedPercentage;
    var workPercentage = props.record.workPercentage;
    var dueDate = props.record.dueDate;

	const [showDescription, setShowDescription] =useState(false);
	const [showChildGoals, setShowChildGoals] = useState(false);
	const [showAddGoal,setShowAddGoal] = useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
  const navigation = useNavigation();

	const onShowDescription = async() =>{
    navigation.navigate("Description",{id,createdAt,updatedAt,name,
      timeTaken,startDate,goalTypeName,description,active,hidden,
      completed,dueDate})
	}

     

  return (
    <View className="flex">
        <View className="flex flex-row flex-1">
            <View className="w-3/5 flex-row">
                {props.record.goalResponses.length>0?<>
                {showChildGoals?
                    <MinusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildGoals(false)}/>:
                    <PlusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildGoals(true)}/>
                }</>:null}
                <Text className="text-xl">{props.record.name}</Text>
                <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="black" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
                </TouchableOpacity>
            </View>
            <View className="w-1/5">
              <TouchableOpacity
                   onPress={()=>{setShowAddGoal(!showAddGoal)}}>
                  <PlusCircleIcon color="white" size={30}/>
              </TouchableOpacity>
            </View>
        </View>
        {showChildGoals?
          <View>
            {props.record.goalResponses.map((record)=>(
                <ChildGoalItem key={record.id} record={record} refreshFunction={props.refreshFunction}/>
            ))}
          </View>:null}
        {showAddGoal?
          <AddChildGoalForm refreshFunction={props.refreshFunction} 
          name={props.record.name} type={props.record.goalTypeName}/>:null}

    </View>
  )
}

export default GoalItem