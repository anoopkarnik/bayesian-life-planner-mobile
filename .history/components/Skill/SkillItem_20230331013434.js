import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeSkill, deleteSkill} from '../../api/SkillAPI';
import SkillDescription from './SkillDescription';
import ChildSkillItem from './ChildSkillItem';
import AddChildSkillForm from './AddChildSkillForm';
// import AddChildSkillForm from './AddChildSkillForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const SkillItem = (props) => {
    var one_day = 1000*60*60*24
    var id = props.record.id;
    var createdAt = props.record.createdAt;
    var updatedAt = props.record.updatedAt;
    var name = props.record.name;
    var scheduleType = props.record.scheduleType;
    var timeOfDay = props.record.timeOfDay;
    var timeTaken = props.record.timeTaken;
    var startDate = props.record.startDate;
    var dueDate = props.record.dueDate;
    var skillTypeName = props.record.skillTypeName;
    var streak = props.record.streak;
    var totalTimes = props.record.totalTimes;
    var description = props.record.description;
    var active = props.record.active;
    var hidden = props.record.hidden;
    var completed = props.record.completed;
    var every = props.record.every;
    var daysOfWeek = props.record.daysOfWeek;
    var totalTimeSpent = props.record.totalTimeSpent;

	const [showDescription, setShowDescription] =useState(false);
	const [showChildSkills, setShowChildSkills] = useState(false);
	const [showAddSkill,setShowAddSkill] = useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const urgent ={backgroundColor:"#F2A10F"}
	const medium ={backgroundColor:"#FFFF99"}
	const low ={backgroundColor:"#FFF"}
	var dueDateTime = new Date(props.record.dueDate)
	var dueDateTime2 = new Date(dueDateTime.getFullYear(),dueDateTime.getMonth(),dueDateTime.getDate()).getTime()
	var currentTime = new Date()
	var currentTime2 = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()).getTime()
	const daysLeft = (dueDateTime2-currentTime2)/one_day
	const {showActive} = useContext(ActiveContext);
    const navigation = useNavigation();

	const onComplete = async() => {
		await completeSkill(config,'Bearer '+user.accessToken,props.record.id,user.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.skillTypeName,showActive)
	}

	const onShowDescription = async() =>{

		navigation.navigate("Description",{id,createdAt,updatedAt,name,scheduleType,
        timeOfDay,timeTaken,startDate,dueDate,skillTypeName,streak,totalTimes,
        totalTimeSpent, description,active,hidden,completed,every,daysOfWeek})
	}

     

  return (
    <View className="flex">
        <View className="flex flex-row flex-1">
            <View className="w-3/5 flex-row">
                {props.record.skillResponses.length>0?<>
                {showChildSkills?
                    <MinusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildSkills(false)}/>:
                    <PlusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildSkills(true)}/>
                }</>:null}
                <Text className="text-xl">{props.record.name}</Text>
                <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="black" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
                </TouchableOpacity>
            </View>
            <View className="w-1/5 mx-2">
                <CheckIcon color="black" height={30} width={20}
                    onPress={onComplete}/>
            </View>
            <View className="w-1/5">
              <TouchableOpacity
                   onPress={()=>{setShowAddSkill(!showAddSkill)}}>
                  <PlusCircleIcon color="white" size={30}/>
              </TouchableOpacity>
            </View>
        </View>
        {showChildSkills?
          <View>
            {props.record.skillResponses.map((record)=>(
                <ChildSkillItem key={record.id} record={record} refreshFunction={props.refreshFunction}/>
            ))}
          </View>:null}
        {showAddSkill?
          <AddChildSkillForm refreshFunction={props.refreshFunction} 
          name={props.record.name} type={props.record.skillTypeName}/>:null}

    </View>
  )
}

export default SkillItem