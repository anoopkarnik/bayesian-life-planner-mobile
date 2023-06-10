import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import { getTopic } from '../../api/TopicAPI';
import TopicItem from './TopicItem';
import AddTopicForm from './AddTopicForm';

const TopicList = (props) => {

  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showTopic, setShowTopic] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    isFocused && refreshTopic(config,'Bearer '+user.accessToken,props.skill)
  }, [isFocused]);

  const refreshTopic = async(backend_url,bearerToken,skill) =>{
    // await props.refreshFunction(backend_url,bearerToken,habit)
    const record = await getTopic(config,bearerToken,skill);
    setRecords(record);
    setShowAddTopic(false)

  }

  const onshowAddTopic = async() =>{
    setShowAddTopic(true);
  }

  const onHideAddTopic= async() =>{
    setShowAddTopic(false);
  }	



  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowTopic(!showTopic)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.skill}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddTopic(!showAddTopic)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showTopic?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <TopicItem record={record} key={record.id}
                refreshFunction={refreshTopic}/>
            ))}
        </View>
      </View>:null}
      {showAddTopic?
      <AddTopicForm refreshFunction={refreshTopic} name={props.skill}/>:null}
    </View>
  )
}

export default TopicList