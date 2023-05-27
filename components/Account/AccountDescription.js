import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
  CheckBox
} from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import SelectPicker from 'react-native-form-select-picker';
import { deleteAccount } from '../../api/AccountAPI';
import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { modifyAccountParams } from "../../api/AccountAPI";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {getTotalExpenses,
getTotalCategories,getTotalSubCategories } from '../../api/AdminAPI';

const AccountDescription = () => {
  const {params:{id,createdAt,updatedAt,name,startDate,
    accountTypeName,description,balance,liquidity,freeLiquidity,
    active,hidden,completed,nomineeName,maturityDate,stockCode,schemeCode}} = useRoute();
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [nameState,setName] = useState(name);
    const [activeState, setActive] = useState(active);
    const [hiddenState, setHidden] = useState(hidden);
    const [completedState, setCompleted] = useState(completed);
    const [isEditing,setIsEditing] = useState(false);
    const [accountTypeNameState,setAccountTypeName] = useState(accountTypeName);
    const [descriptionState,setDescription] = useState(description);
    const [balanceState,setBalance] = useState(String(balance));
    const [liquidityState,setLiquidity] = useState(liquidity);
    const [freeLiquidityState,setFreeLiquidity] = useState(freeLiquidity);
    const [startDateState,setStartDate] = useState(startDate);
    const [nomineeNameState, setNomineeName] = useState(nomineeName);
    const [maturityDateState, setMaturityDate] = useState(maturityDate);
    const [stockCodeState, setStockCode] = useState(stockCode);
    const [schemeCodeState, setSchemeCode] = useState(schemeCode);
    const [showMaturityDate, setShowMaturityDate] = useState(false);

    const onUpdate = async() =>{
      // await props.refreshFunction(config,'Bearer '+ user.accessToken)
      if(isEditing){
        await modifyAccountParams(config, 'Bearer '+user.accessToken,
        id,createdAt,updatedAt,nameState,startDateState,
        accountTypeNameState,descriptionState,balanceState,liquidityState,
        freeLiquidityState,activeState,hiddenState,completedState,user.id,nomineeNameState,
        maturityDateState,stockCodeState,schemeCodeState);
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
  };
  function formatDate(newDate) {
    const months = {0: 'January',1: 'February',2: 'March',3: 'April',
    4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September',
      9: 'October', 10: 'November',  11: 'December' }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const year = newDate.getFullYear()
    const date = newDate.getDate()
    const monthIndex = newDate.getMonth()
    const monthName = months[newDate.getMonth()]
    const dayName = days[newDate.getDay()] // Thu
    const formatted = `${dayName}, ${date} ${monthName} ${year}`
    return formatted.toString()
  }


  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown:false,
    });
  }, [])
  const navigation = useNavigation();


  const onDelete = async() =>{
			await deleteAccount(config,'Bearer '+user.accessToken,id)
      navigation.navigate("Normal")
	}

  const handleMaturityDate = (date) => {
    setMaturityDate(date)
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView>
        <View className='relative'>
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color='white'/>
          </TouchableOpacity>
        </View>
        <View className="my-5 mx-1 flex-row align-middle">
          <TouchableOpacity onPress={onUpdate}
          className="bg-gray-600 mx-2 rounded-lg p-2">
            {isEditing?
            <Text className="text-xl text-white">Update Item</Text>:
            <Text className="text-xl text-white">Edit Item</Text>}
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
          onPress={onDelete}>
          <Text className="text-xl text-white">Delete</Text>
        </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">Account Type Name : {accountTypeNameState}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">id : {id}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">createdAt : {formatDate(new Date(createdAt))}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">updatedAt : {formatDate(new Date(updatedAt))}</Text>
            </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">name : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={nameState}  value={nameState} Name='text' 
            onChangeText={text => setName(text)}/>:
            <Text className="text-white text-xl">{nameState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">balance : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={balanceState}  value={balanceState} Name='text' 
            onChangeText={text => setBalance(text)}/>:
            <Text className="text-white text-xl">{balanceState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">Liquidity : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setLiquidity(value)} 
                  selected={liquidityState?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{liquidityState?.toString()}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">Partial Liquidity: </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setFreeLiquidity(value)} 
                  selected={freeLiquidityState?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{freeLiquidityState?.toString()}</Text>}
          </View>          
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">active : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setActive(value)} 
                  selected={activeState?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{activeState?.toString()}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">hidden : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setHidden(value)} 
                  selected={hiddenState?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{hiddenState?.toString()}</Text>}
          </View>
          {isEditing?
          <View className='flex-row bg-gray-800 py-2'>
            <Text className="text-white text-xl ">Maturity Date: </Text>
              <TouchableOpacity onPress={()=>setShowMaturityDate(!showMaturityDate)}
              className="flex-1 bg-white text-xl" placeholder="Start Date">
                <Text className="text-xl">{formatDate(new Date(maturityDateState))}</Text>  
              </TouchableOpacity>       
            {showMaturityDate?
              <DateTimePicker
              isVisible={showMaturityDate}
              mode="date"
              onConfirm={handleMaturityDate}
              onCancel={()=>showMaturityDate(false)}
            />
         :null}
          </View>:
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">Maturity Date : {formatDate(new Date(maturityDateState))}
              </Text>
          </View>}
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">Nominee Name : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={nomineeNameState}  value={nomineeNameState} Name='text' 
            onChangeText={text => setNomineeName(text)}/>:
            <Text className="text-white text-xl">{nomineeNameState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">Stock Code : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={stockCodeState}  value={stockCodeState} Name='text' 
            onChangeText={text => setStockCode(text)}/>:
            <Text className="text-white text-xl">{stockCodeState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">Scheme Code : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={schemeCodeState}  value={schemeCodeState} Name='text' 
            onChangeText={text => setSchemeCode(text)}/>:
            <Text className="text-white text-xl">{schemeCodeState}</Text>}
          </View>
        </View>
        <View className="align-center">
            <Text className="text-white text-xl font-bold">Description</Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={String(descriptionState)}  value={descriptionState} Name='text' 
                onChangeText={text => setDescription(text)}/>:
                <Text className="text-white text-xl">{descriptionState}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountDescription;