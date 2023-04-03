import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeJournal, deleteJournal} from '../../api/JournalAPI';
import JournalDescription from './JournalDescription';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const JournalItem = (props) => {
    var one_day = 1000*60*60*24
    var id = props.record.id;
    var createdAt = props.record.createdAt;
    var updatedAt = props.record.updatedAt;
    var name = props.record.name;
    var startDate = props.record.startDate;
    var journalTypeName = props.record.journalTypeName;
    var description = props.record.description;
    var active = props.record.active;
    var hidden = props.record.hidden;
    var completed = props.record.completed;
    var text = props.record.text;

	const [showDescription, setShowDescription] =useState(false);
	const [showAddJournal,setShowAddJournal] = useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
    const navigation = useNavigation();

	const onShowDescription = async() =>{
		navigation.navigate("Description",{id,createdAt,updatedAt,name,startDate,
      journalTypeName,text, description,active,hidden,completed})
	}

     

  return (
    <View className="flex">
        <View className="flex flex-row flex-1">
            <View className="w-3/5 flex-row">
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
                   onPress={()=>{setShowAddJournal(!showAddJournal)}}>
                  <PlusCircleIcon color="white" size={30}/>
              </TouchableOpacity>
            </View>
        </View>

    </View>
  )
}

export default JournalItem