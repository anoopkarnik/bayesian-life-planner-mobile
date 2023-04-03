import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import SkillItem from './SkillItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { getSkills } from '../../api/SkillAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import AddSkillForm from './AddSkillForm';
import { useIsFocused } from '@react-navigation/native';

const SkillList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showSkill, setShowSkill] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const {showActive} = useContext(ActiveContext);
  const isFocused = useIsFocused();

    const onCreate = async() =>{
        await props.createFunction(config,'Bearer '+user.accessToken,newName)
        await props.refreshFunction(config,'Bearer '+user.accessToken)
        setKey('Add '+props.name);
    }
    useEffect(() => {
      isFocused && refreshSkill(config,'Bearer '+user.accessToken,props.skill,showActive)
    }, [showActive,isFocused]);

    const refreshSkill = async(backend_url,bearerToken,skill,showCurrentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,skill)
      const record = await getSkills(config,bearerToken,skill,showCurrentActive);
      setRecords(record);
      setShowAddSkill(false)
    }

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-gray-600">
        <TouchableOpacity 
          onPress={()=>setShowSkill(!showSkill)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.skill}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddSkill(!showAddSkill)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showSkill?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <SkillItem record={record} key={record.id}
                refreshFunction={refreshSkill}/>
            ))}
        </View>
      </View>:null}
      {showAddSkill?
      <AddSkillForm refreshFunction={refreshSkill} name={props.skill}/>:null}
    </View>
  )
}

export default SkillList