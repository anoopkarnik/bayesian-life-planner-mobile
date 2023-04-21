import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { createFund } from '../../api/FundAPI';


const AddFundForm = (props) => {

  const [name, setName] = useState('');
	const [amountAllocated,setAmountAllocated] = useState('');
  const [amountNeeded,setAmountNeeded] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

   const onSubmit =async () =>{

		await createFund(config, 'Bearer '+user.accessToken,name,
    amountAllocated,amountNeeded);
    props.refreshFunction(config,'Bearer '+user.accessToken)
	}


  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Amount Allocated"  
          value={amountAllocated} Name='text' 
          onChangeText={text => setAmountAllocated(text)}/>
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Amount Needed"  
          value={amountNeeded} Name='text' 
          onChangeText={text => setAmountNeeded(text)}/>
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Fund</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddFundForm