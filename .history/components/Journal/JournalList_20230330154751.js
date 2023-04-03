import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import JournalItem from './JournalItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { getJournals } from '../../api/JournalAPI';

import { useIsFocused } from '@react-navigation/native';

const JournalList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showJournal, setShowJournal] = useState(false);
  const isFocused = useIsFocused();

    useEffect(() => {
      isFocused && refreshJournal(config,'Bearer '+user.accessToken,props.journal)
    }, [showActive,isFocused]);

    const refreshJournal = async(backend_url,bearerToken,journal) =>{
      // await props.refreshFunction(backend_url,bearerToken,journal)
      const record = await getJournals(config,bearerToken,journal);
      setRecords(record);
    }

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-gray-600">
        <TouchableOpacity 
          onPress={()=>setShowJournal(!showJournal)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.journal}</Text>
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
    </View>
  )
}

export default JournalList