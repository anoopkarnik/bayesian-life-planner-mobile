import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createAccount } from '../../api/AccountAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';

const AddAccountForm = (props) => {

	const [name, setName] = useState('');
	const [balance, setBalance] = useState('');
	const [liquidity, setLiquidity] = useState('');
	const [freeLiquidity, setFreeLiquidity] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

   const onSubmit =async () =>{

		await createAccount(config,'Bearer '+user.accessToken,name,balance,
    props.name,liquidity,freeLiquidity);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
    
	}

  const handleStartDate = (date) => {
    setStartDate(date)
  };
  const handleDueDate = (date) => {
    setDueDate(date)
  };

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Balance"  
          value={balance} Name='text' 
          onChangeText={text => setBalance(text)}/>
      </View>
      <View className=" flex-row ">
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setLiquidity(value)} 
          placeholder="Liquidity" selected={liquidity} >
              <SelectPicker.Item className="text-gray-400 " 
              label="Yes" value="true"/>
              <SelectPicker.Item className="text-gray-400 " 
              label="No" value="false"/>
        </SelectPicker>
        <SelectPicker className="flex-1 mx-2 w-1/2 bg-white p-2"
          onValueChange={(value)=>setFreeLiquidity(value)} 
          placeholder="Free Liquidity" selected={freeLiquidity} >
              <SelectPicker.Item className="text-gray-400 " 
              label="Yes" value="true"/>
              <SelectPicker.Item className="text-gray-400 " 
              label="No" value="false"/>
        </SelectPicker>
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddAccountForm