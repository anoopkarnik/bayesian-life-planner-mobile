import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback,useEffect} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
// import AddChildGoalForm from './AddChildGoalForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import ChildRuleEngineItem from './ChildRuleEngineItem';
import AddChildRuleEngineForm from './AddChildRuleEngineForm';

const RuleEngineItem = (props) => {
    
  var id = props.record.id
  var createdAt = props.record.createdAt
  var updatedAt = props.record.updatedAt
  var type = props.name
	const [name, setName] = useState(props.record.name);
	const [showDescription, setShowDescription] = useState(false);
	const [childrenLength, setChildrenLength] = useState('')
	const [children, setChildren] = useState([])
	const { user } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [showChild, setShowChild] = useState(false);
	const [showAddChild, setShowAddChild] = useState(false);

  const refreshFunction = async() =>{
		await props.refreshFunction(config, 'Bearer ' + user.accessToken, props.record.criteriaType)
		refreshItem()
	}

  useEffect(() => {
		refreshItem()
	},[])

	const refreshItem = async () => {
		if (props.name === "Criteria Set") {
			setChildrenLength(props.record.criteriaList.length)
			setChildren(props.record.criteriaList)
		}
		else if (props.name === "Rule") {
			setChildrenLength(props.record.criteriaSetList.length)
			setChildren(props.record.criteriaSetList)
		}
		else if (props.name === "Rule Set") {
			setChildrenLength(props.record.ruleList.length)
			setChildren(props.record.ruleList)
		}
		setShowAddChild(false)
	}

  const navigation = useNavigation();

	const onShowDescription = async() =>{
    navigation.navigate("Description",{id,createdAt,updatedAt,name,childrenLength,type})
	}

  return (
    <View className="flex">
      <View className="flex-row">
        <View className="w-4/5 flex-row">
            {childrenLength>0?<>
                  {showChild?
                      <MinusCircleIcon color="black" height={30} width={20}
                      onPress={()=>setShowChild(false)}/>:
                      <PlusCircleIcon color="black" height={30} width={20}
                      onPress={()=>setShowChild(true)}/>
                  }</>:null}
                  <Text className="text-xl">{props.record.name}</Text>
                  <TouchableOpacity >
                      <ArrowTopRightOnSquareIcon color="black" size={20} 
                      onPress={onShowDescription} onClick={onShowDescription}/>
                  </TouchableOpacity>
        </View>
        <View className="ml-10 w-2/5">
            <TouchableOpacity onPress={()=>{setShowAddChild(!showAddChild)}}>
                <PlusCircleIcon color="white" size={25}/>
            </TouchableOpacity>
        </View>
      </View>
      {showChild?
          <View>
            {children.map((record)=>(
                <ChildRuleEngineItem key={record.id} record={record} refreshFunction={props.refreshFunction}/>
            ))}
          </View>:null}
        {showAddChild?
          <AddChildRuleEngineForm refreshFunction={refreshFunction} 
          name={props.name} record={props.record} children={children}/>:null}
    </View>
  )
}

export default RuleEngineItem