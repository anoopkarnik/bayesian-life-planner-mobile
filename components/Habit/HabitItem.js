import { View, Text,TextInput,TouchableOpacity,RefreshControl,Modal } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeHabit, deleteHabit} from '../../api/HabitAPI';
import HabitDescription from './HabitDescription';
import ChildHabitItem from './ChildHabitItem';
import AddChildHabitForm from './AddChildHabitForm';
// import AddChildHabitForm from './AddChildHabitForm';
import {PlusCircleIcon,MinusCircleIcon,PencilIcon,XCircleIcon,ArrowTopRightOnSquareIcon,
     PlusIcon, TrashIcon, WalletIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const HabitItem = (props) => {
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
    var habitTypeName = props.record.habitTypeName;
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
	const [showChildHabits, setShowChildHabits] = useState(false);
	const [showAddHabit,setShowAddHabit] = useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const urgent = "flex flex-row flex-1 bg-[#F2A10F] border-solid border-1"
	const medium ="flex flex-row flex-1 bg-[#FFFF99] border-solid border-1"
	const low ="flex flex-row flex-1 bg-gray-400 border-solid border-1"
	var dueDateTime = new Date(props.record.dueDate)
	var dueDateTime2 = new Date(dueDateTime.getFullYear(),dueDateTime.getMonth(),dueDateTime.getDate()).getTime() - ((5*60)+30)*60*1000
	var currentTime = new Date()
	var currentTime2 = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()).getTime()
	const daysLeft = (dueDateTime2-currentTime2)/one_day
	const {showActive} = useContext(ActiveContext);
    const navigation = useNavigation();
    const [showPopup,setShowPopup] = useState(false);

    const onComplete = async() => {
        setShowPopup(false)
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Complete')
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive)
	}

	const onAtomicComplete = async() => {
        setShowPopup(false)
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Atomic')
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive)
	}

	const onConditionalComplete = async() => {
        setShowPopup(false)
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Condition')
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive)
	}

	const onShowDescription = async() =>{

		navigation.navigate("Description",{id,createdAt,updatedAt,name,scheduleType,
        timeOfDay,timeTaken,startDate,dueDate,habitTypeName,streak,totalTimes,
        totalTimeSpent, description,active,hidden,completed,every,daysOfWeek})
	}

    const refreshForm = async() =>{
        setShowAddHabit(false);
        await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive);
        setShowChildHabits(true);
    }

     

  return (
    <View className="flex">
        <View className={daysLeft<1?urgent:daysLeft<7?medium:low}>
            <View className="w-3/5 flex-row">
                {props.record.habitResponses.length>0?<>
                {showChildHabits?
                    <MinusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildHabits(false)}/>:
                    <PlusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildHabits(true)}/>
                }</>:null}
                <Text className="text-xl">{props.record.name}</Text>
                <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="black" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
                </TouchableOpacity>
            </View>
            <View className="w-1/5 mx-2">
                <Text className="text-l">
                    {props.record.streak}
                    <TouchableOpacity>
                        <PlusIcon color="black" size={20} onPress={()=>setShowPopup(true)}/>
                    </TouchableOpacity>
                    {props.record.totalTimes}
                </Text>
            </View>
            <View className="justify-center align-middle">
                <Modal animationType="slide" transparent={true} visible={showPopup} 
                onRequestClose={()=>setShowPopup(false)}>
                    <View className="bg-[#556581] justify-center align-middle m-20">
                        <Text className="text-white text-lg">Select Completion Type</Text>
                        <TouchableOpacity onPress={onComplete} className="bg-gray-500">
                            <Text className="text-white">Complete </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onAtomicComplete} className="bg-gray-500">
                            <Text className="text-white">Atomic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConditionalComplete} className="bg-gray-500">
                            <Text className="text-white">Conditional</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            {/* <View className="w-1/5">
              <TouchableOpacity
                   onPress={()=>{setShowAddHabit(!showAddHabit)}}>
                  <PlusCircleIcon color="white" size={30}/>
              </TouchableOpacity>
            </View> */}
        </View>
        {/* {showChildHabits?
          <View>
            {props.record.habitResponses.map((record)=>(
                <ChildHabitItem key={record.id} record={record} refreshFunction={props.refreshFunction}/>
            ))}
          </View>:null}
        {showAddHabit?
          <AddChildHabitForm refreshFunction={refreshForm} 
          name={props.record.name} type={props.record.habitTypeName}/>:null} */}

    </View>
  )
}

export default HabitItem