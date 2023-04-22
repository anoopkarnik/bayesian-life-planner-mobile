import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect,useNavigation }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createTransaction } from '../../api/TransactionAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import { getTotalAccounts } from '../../api/AdminAPI';
import { getAccounts } from '../../api/AccountAPI';

const AddTransactionForm = (props) => {

	const [name, setName] = useState('');
	const [cost, setCost] = useState(props.cost);
	const [accountName, setAccountName] = useState('');
	const [subAccountName, setSubAccountName] = useState('');
  const [accountOptions,setAccountOptions] = useState([])
  const [subAccountOptions,setSubAccountOptions] = useState([]);
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

   const onSubmit =async () =>{
		await createTransaction(config,'Bearer '+user.accessToken,name,cost,
    props.expenseName,accountName,props.categoryName,props.subCategoryName,
    subAccountName);
    props.refreshFunction(config,'Bearer '+user.accessToken)
	}


  const refreshTransactionForm = async(backend_url,bearerToken) =>{
    const {accounts,accountOptions} = await getTotalAccounts(backend_url,bearerToken);
    setAccountOptions(accountOptions);      
  }

  useEffect(() => {
    refreshTransactionForm(config,'Bearer '+user.accessToken);
  }, []);

  const handleAccountNameChange = async(value) => {
    setAccountName(value)
    const record = await getAccounts(config,'Bearer '+user.accessToken,value);
    setSubAccountOptions(record)
  };

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Name"  
          value={name} Name='text' 
          onChangeText={text => setName(text)}/>
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Cost"  
          value={cost} Name='text' 
          onChangeText={text => setCost(text)}/>
      </View>
      <View className=" flex-row ">
        <SelectPicker onValueChange={handleAccountNameChange} 
            selected={accountName?.toString()} placeholder="Account Type"
            className="flex-1 mx-2 w-1/2 bg-white text-xl">
              {accountOptions?.map(option=>(
                <SelectPicker.Item label={option.name} value={option.name}/>
            ))}
        </SelectPicker> 
        <SelectPicker onValueChange={(value)=>setSubAccountName(value)} 
            selected={subAccountName?.toString()} placeholder="Account"
            className="flex-1 mx-2 w-1/2 bg-white text-xl">
              {subAccountOptions?.map(option=>(
                <SelectPicker.Item label={option.name} value={option.name}/>
              ))}
          </SelectPicker> 
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddTransactionForm