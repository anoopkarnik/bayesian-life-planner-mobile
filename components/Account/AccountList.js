import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import AccountItem from './AccountItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { getAccounts } from '../../api/AccountAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import AddAccountForm from './AddAccountForm';
import DateToString from '../utils/DateToString';

const AccountList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && refreshAccount(config,'Bearer '+user.accessToken,props.account)
  }, [isFocused]);

  const refreshAccount = async(backend_url,bearerToken,account) =>{
    // await props.refreshFunction(backend_url,bearerToken,habit)
    const record = await getAccounts(config,bearerToken,props.account);
    setRecords(record);
    setShowAddAccount(false)

  }

  const onshowAddAccount = async() =>{
    setShowAddAccount(true);
  }

  const onHideAddAccount= async() =>{
    setShowAddAccount(false);
  }	

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowAccount(!showAccount)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.account}</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{setShowAddAccount(!showAddAccount)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showAccount?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <AccountItem record={record} key={record.id}
                refreshFunction={refreshAccount}/>
            ))}
        </View>
      </View>:null}
      {showAddAccount?
      <AddAccountForm refreshFunction={refreshAccount} name={props.account}/>:null}
    </View>
  )
}

export default AccountList