import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { carriedOutBadHabit, deleteBadHabit} from '../../api/BadHabitAPI';
import BadHabitDescription from './BadHabitDescription';
import ChildBadHabitItem from './ChildBadHabitItem';
import AddChildBadHabitForm from './AddChildBadHabitForm';
// import AddChildBadHabitForm from './AddChildBadHabitForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const BadHabitItem = (props) => {
    var one_day = 1000*60*60*24
    var id = props.record.id;
    var createdAt = props.record.createdAt;
    var updatedAt = props.record.updatedAt;
    var name = props.record.name;
    var badHabitTypeName = props.record.badHabitTypeName;
    var description = props.record.description;
    var active = props.record.active;
    var hidden = props.record.hidden;
    var completed = props.record.completed;
    var startDate = props.record.startDate;
    var totalTimes = props.record.totalTimes;

	const [showChildBadHabits, setShowChildBadHabits] = useState(false);
	const [showAddBadHabit,setShowAddBadHabit] = useState(false);
	const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
  const navigation = useNavigation();
  const SECOND = 1000;
	const MINUTE = SECOND*60;
	const HOUR = MINUTE*60;
	const DAY = HOUR*24

  const [time,setTime]= useState(Date.now() - Date.parse(props.record.updatedAt))

	const onShowDescription = async() =>{
		navigation.navigate("Description",{id,createdAt,updatedAt,name,totalTimes,
        badHabitTypeName, description,active,hidden,completed,startDate})
	}

  const onComplete = async() => {
		await carriedOutBadHabit(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.badHabitTypeName,showActive)
		setTime(Date.now() - Date.parse(props.record.updatedAt));
	}

	const onRefresh = async() =>{
		setShowAddBadHabit(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.badHabitTypeName,showActive)
	}

  useEffect(() => {
		const interval = setInterval(() => 
		setTime(Date.now() - new Date(Date.parse(props.record.updatedAt))), 60000);
	
		return () => clearInterval(interval);
	  }, [Date.parse(props.record.updatedAt)]);

     

  return (
    <View className="flex">
        <View className="flex flex-row flex-1">
            <View className="w-3/5 flex-row">
                {props.record.badHabitResponses.length>0?<>
                {showChildBadHabits?
                    <MinusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildBadHabits(false)}/>:
                    <PlusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildBadHabits(true)}/>
                }</>:null}
                <Text className="text-xl">{props.record.name}</Text>
                <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="black" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
                </TouchableOpacity>
            </View>
            <View className="w-1/5 mx-2 my-2">
              <Text className="text-l">{props.record.value}</Text>
            </View>
            <View className="w-1/5">
              <TouchableOpacity
                   onPress={()=>{setShowAddBadHabit(!showAddBadHabit)}}>
                  <PlusCircleIcon color="white" size={30}/>
              </TouchableOpacity>
            </View>
        </View>
        {showChildBadHabits?
          <View>
            {props.record.badHabitResponses.map((record)=>(
                <ChildBadHabitItem key={record.id} record={record} refreshFunction={props.refreshFunction}/>
            ))}
          </View>:null}
        {showAddBadHabit?
          <AddChildBadHabitForm refreshFunction={props.refreshFunction} 
          name={props.record.name} type={props.record.badHabitsTypeName}/>:null}

    </View>
  )
}

export default BadHabitItem