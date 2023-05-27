import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import AccountItem from './AccountItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { getAccounts } from '../../api/AccountAPI';
import { PlusCircleIcon,ArrowTopRightOnSquareIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import AddAccountForm from './AddAccountForm';
import DateToString from '../utils/DateToString';
import { useNavigation } from '@react-navigation/native';

const AccountList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const isFocused = useIsFocused();

  var name = props.record.name;
  var description = props.record.description;
  var id = props.record.id;
  var createdAt = props.record.createdAt;
  var updatedAt = props.record.updatedAt;
  const navigation = useNavigation();

  useEffect(() => {
    isFocused && refreshAccount(config,'Bearer '+user.accessToken,props.record.name)
  }, [isFocused]);

  const refreshAccount = async(backend_url,bearerToken,account) =>{
    // await props.refreshFunction(backend_url,bearerToken,habit)
    const record = await getAccounts(config,bearerToken,props.record.name);
    setRecords(record);
    setShowAddAccount(false)

  }

  const onShowDescription = async() =>{
		navigation.navigate("TypeDescription",{id,createdAt,updatedAt,name,
    description})
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
        <View className="flex-1 flex-row">
        <TouchableOpacity className="mx-2"
          onPress={()=>setShowAccount(!showAccount)} >
            <Text className="text-xl text-white font-bold">{props.record.name}</Text>
        </TouchableOpacity>
          <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="white" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
            </TouchableOpacity>
        </View>
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
      <AddAccountForm refreshFunction={refreshAccount} name={props.record.name}/>:null}
    </View>
  )
}

export default AccountList