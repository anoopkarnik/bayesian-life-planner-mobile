import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import JournalItem from './JournalItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { getJournals } from '../../api/JournalAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';

import { useIsFocused } from '@react-navigation/native';
import AddJournalForm from './AddJournalForm';

const JournalList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showJournal, setShowJournal] = useState(false);
  const [showAddJournal, setShowAddJournal] = useState(false);
  const isFocused = useIsFocused();

    useEffect(() => {
      isFocused && refreshJournal(config,'Bearer '+user.accessToken,props.journal)
    }, [isFocused]);

    const refreshJournal = async(backend_url,bearerToken,journal) =>{
      // await props.refreshFunction(backend_url,bearerToken,journal)
      const record = await getJournals(config,bearerToken,journal);
      setRecords(record);
      setShowAddJournal(false);
    }

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowJournal(!showJournal)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.journal}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddJournal(!showAddJournal)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showJournal?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <JournalItem record={record} key={record.id}
                refreshFunction={refreshJournal}/>
            ))}
        </View>
      </View>:null}
      {showAddJournal?
      <AddJournalForm refreshFunction={refreshJournal} name={props.journal}/>:null}
    </View>
  )
}

export default JournalList