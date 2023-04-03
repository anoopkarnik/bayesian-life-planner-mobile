import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import TaskItem from './TaskItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { getTasks } from '../../api/TaskAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import AddTaskForm from './AddTaskForm';
import { useIsFocused } from '@react-navigation/native';

const TaskList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const {showActive} = useContext(ActiveContext);
  const isFocused = useIsFocused();

    const onCreate = async() =>{
        await props.createFunction(config,'Bearer '+user.accessToken,newName)
        await props.refreshFunction(config,'Bearer '+user.accessToken)
        setKey('Add '+props.name);
    }
    useEffect(() => {
      isFocused && refreshTask(config,'Bearer '+user.accessToken,props.task,showActive)
    }, [showActive,isFocused]);

    const refreshTask = async(backend_url,bearerToken,task,showCurrentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,task)
      const record = await getTasks(config,bearerToken,task,showCurrentActive);
      setRecords(record);
      setShowAddTask(false)
    }

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-gray-600">
        <TouchableOpacity 
          onPress={()=>setShowTask(!showTask)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.task}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddTask(!showAddTask)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showTask?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <TaskItem record={record} key={record.id}
                refreshFunction={refreshTask}/>
            ))}
        </View>
      </View>:null}
      {showAddTask?
      <AddTaskForm refreshFunction={refreshTask} name={props.task}/>:null}
    </View>
  )
}

export default TaskList