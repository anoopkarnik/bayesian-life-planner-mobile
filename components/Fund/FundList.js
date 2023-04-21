import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import FundItem from './FundItem';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import AddFundForm from './AddFundForm';
import { getFunds } from '../../api/FundAPI';
import DateToString from '../utils/DateToString';
const FundList = (props) => {

  const isFocused = useIsFocused()

  const [funds, setFunds] = useState([]);
  const [showAddFund, setShowAddFund] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext);

    useEffect(() => {
      isFocused && refreshFundListPage(config,'Bearer '+user.accessToken);
    }, [isFocused]);

  const refreshFundListPage = async(backend_url,bearerToken) =>{
    var fund_list = await getFunds(config,'Bearer '+user.accessToken);
    setFunds(fund_list)
    setShowAddFund(false);
}

  return (
    <View >
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {funds?.map((record)=>(
                <FundItem record={record} key={record.id}
                refreshFunction={refreshFundListPage}/>
            ))}
        </View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581] justify-center items-center ">
        <TouchableOpacity
             onPress={()=>{setShowAddFund(!showAddFund)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showAddFund?
      <AddFundForm refreshFunction={refreshFundListPage}/>:null}
    </View>
  )
}

export default FundList