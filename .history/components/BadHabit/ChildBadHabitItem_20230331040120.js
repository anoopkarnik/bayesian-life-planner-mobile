import { View, Text,TextInput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeStat, deleteStat} from '../../api/StatAPI';
import StatDescription from './BadHabitDescription';
import AddChildStatForm from './AddChildStatForm';
// import AddChildStatForm from './AddChildStatForm';
import {PlusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const ChildStatItem = (props) => {
  var one_day = 1000*60*60*24
  var id = props.record.id;
  var createdAt = props.record.createdAt;
  var updatedAt = props.record.updatedAt;
  var name = props.record.name;
  var statTypeName = props.record.statTypeName;
  var description = props.record.description;
  var active = props.record.active;
  var hidden = props.record.hidden;
  var completed = props.record.completed;
  var startDate = props.record.startDate;
  var value = props.record.value;
  var startDate = props.record.startDate;

  const [showChildStats, setShowChildStats] = useState(false);
	const [showAddStat,setShowAddStat] = useState(false);
	const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
  const navigation = useNavigation();


	const onShowDescription = async() =>{

		navigation.navigate("Description",{id,createdAt,updatedAt,name,value,
        statTypeName, description,active,hidden,completed,startDate})
	}

     

  return (
    <View className="flex-row flex ml-9 mr-4 py-2">
        <View className="flex flex-row flex-1">
            <View className="w-3/5 flex-row">
                {/* {props.record.statResponses.length>0?<>
                {showChildStats?
                    <PlusCircleIcon color="black" height={20} width={20}/>:
                    <MinusCircleIcon color="black" height={20} width={20}/>
                }</>:null} */}
                <Text className="text-xl">{props.record.name}</Text>
                <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="black" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
                </TouchableOpacity>
            </View>
            <View className="w-1/5 mx-2 my-2">
              <Text className="text-l">{props.record.value}</Text>
            </View>
        </View>
        {showChildStats?
          <View>
            {props.record.statResponses.map((record)=>(
                <ChildStatItem key={record.id} record={record} refreshFunction={props.refreshFunction}/>
            ))}
          </View>:null}
        {showAddStat?
          <AddChildStatForm refreshFunction={props.refreshFunction} 
          name={props.record.name} type={props.record.statTypeName}/>:null}

    </View>
  )
}

export default ChildStatItem