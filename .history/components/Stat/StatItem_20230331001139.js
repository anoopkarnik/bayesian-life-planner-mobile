import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeStat, deleteStat} from '../../api/StatAPI';
import StatDescription from './StatDescription';
import ChildStatItem from './ChildStatItem';
import AddChildStatForm from './AddChildStatForm';
// import AddChildStatForm from './AddChildStatForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const StatItem = (props) => {
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
    <View className="flex">
        <View className="flex flex-row flex-1">
            <View className="w-3/5 flex-row">
                {props.record.statsResponses.length>0?<>
                {showChildStats?
                    <MinusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildStats(false)}/>:
                    <PlusCircleIcon color="black" height={30} width={20}
                    onPress={()=>setShowChildStats(true)}/>
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
                   onPress={()=>{setShowAddStat(!showAddStat)}}>
                  <PlusCircleIcon color="white" size={30}/>
              </TouchableOpacity>
            </View>
        </View>
        {showChildStats?
          <View>
            {props.record.statsResponses.map((record)=>(
                <ChildStatItem key={record.id} record={record} refreshFunction={props.refreshFunction}/>
            ))}
          </View>:null}
        {showAddStat?
          <AddChildStatForm refreshFunction={props.refreshFunction} 
          name={props.record.name} type={props.record.statsTypeName}/>:null}

    </View>
  )
}

export default StatItem