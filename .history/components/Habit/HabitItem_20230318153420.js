import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useContext} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeHabit, deleteHabit} from '../../api/HabitAPI';
// import HabitDescription from './HabitDescription';
// import ChildHabitItem from './ChildHabitItem';
// import AddChildHabitForm from './AddChildHabitForm';
import {PlusCircleIcon,MinusCircleIcon,PencilIcon,XCircleIcon, PlusIcon, TrashIcon}  
from "react-native-heroicons/solid";

const HabitItem = (props) => {
    var one_day = 1000*60*60*24
	const [name,setName] = useState(props.record.name);
	const [showDescription, setShowDescription] =useState(false);
	const [showChildHabits, setShowChildHabits] = useState(false);
	const [showAddHabit,setShowAddHabit] = useState(false);
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

	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteHabit(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.habitTypeName,showActive)
		}
	}

	const onComplete = async() => {
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive)
	}

	const onRefresh = async() =>{
		setShowAddHabit(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.habitTypeName,showActive)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

	const onShow = async() => {
		setShowChildHabits(!showChildHabits)
	}

	const onshowAddHabit = async() =>{
		setShowAddHabit(true);
	  }
	
	  const onHideAddHabit= async() =>{
		setShowAddHabit(false);
	  }

  return (
    <View className="flex-row flex">
        <View className="flex-row w-2/3">
            <View className="flex-1">
                {props.record.habitResponses.length>0?<>
                {showChildHabits?
                    <PlusCircleIcon color="black" height={20} width={20}/>:
                    <MinusCircleIcon color="black" height={20} width={20}/>
                }</>:null}
                <Text className="text-xl">{props.record.name}</Text>
            </View>
            <View>
                <Text>
                    {props.record.streak}
                    <TouchableOpacity>
                        <PlusIcon color="black" size={15} onPress={onComplete}/>
                    </TouchableOpacity>
                    {props.record.totalTimes}
                </Text>
            </View>
        </View>

        <View>
            <TouchableOpacity>
                <TrashIcon color="black" size={15} onPress={onDelete}/>
            </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={onEdit}>
            <PencilIcon color="black" height={20} width={20}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
            <XCircleIcon color="black" height={20} width={20}/>
        </TouchableOpacity> */}
    </View>
  )
}

export default HabitItem