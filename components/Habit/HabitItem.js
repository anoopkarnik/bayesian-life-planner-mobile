import { View, Text,TextInput,TouchableOpacity,RefreshControl,Modal } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeHabit, deleteHabit} from '../../api/HabitAPI';
// import AddChildHabitForm from './AddChildHabitForm';
import {PlusCircleIcon,MinusCircleIcon,PencilIcon,XCircleIcon,ArrowTopRightOnSquareIcon,
     PlusIcon, TrashIcon, WalletIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import { CurrentDateContext } from '../../context/CurrentDateContext';

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
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	var dueDateTime = new Date(props.record.dueDate)
	var dueDateTime2 = new Date(dueDateTime.getFullYear(),dueDateTime.getMonth(),dueDateTime.getDate()).getTime() - ((5*60)+30)*60*1000
	var currentTime = new Date()
	var currentTime2 = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()).getTime()
	const daysLeft = (dueDateTime2-currentTime2)/one_day
	const {showActive} = useContext(ActiveContext);
    const navigation = useNavigation();
    const [showPopup,setShowPopup] = useState(false);
	const {currentDate} = useContext(CurrentDateContext);

    const onComplete = async() => {
        setShowPopup(false)
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Complete',currentDate)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive,currentDate)
	}

	const onAtomicComplete = async() => {
        setShowPopup(false)
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Atomic',currentDate)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive,currentDate)
	}

	const onConditionalComplete = async() => {
        setShowPopup(false)
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Condition',currentDate)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive,currentDate)
	}

	const onShowDescription = async() =>{

		navigation.navigate("Description",{id,createdAt,updatedAt,name,scheduleType,
        timeOfDay,timeTaken,startDate,dueDate,habitTypeName,streak,totalTimes,
        totalTimeSpent, description,active,hidden,completed,every,daysOfWeek})
	}

     

  return (
    <View className="flex">
        <View className="flex flex-row flex-1 border-solid border-1">
            <View className="w-3/5 flex-row">
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
                    <View className="bg-[#556581] justify-center align-middle m-20 p-3">
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
        </View>
    </View>
  )
}

export default HabitItem