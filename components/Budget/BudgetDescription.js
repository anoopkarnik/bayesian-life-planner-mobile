import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
  CheckBox
} from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import SelectPicker from 'react-native-form-select-picker';
import { deleteBudget } from '../../api/BudgetAPI';
import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { modifyBudgetParams } from "../../api/BudgetAPI";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {getTotalExpenses,
getTotalCategories,getTotalSubCategories } from '../../api/AdminAPI';
import AddTransactionForm from './AddTransactionForm';

const BudgetDescription = () => {
  const {params:{id,createdAt,updatedAt,name,startDate,
    categoryName,expenseName,subCategoryName,description,
    active,hidden,completed,cost,amountSpent}} = useRoute();
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [nameState,setName] = useState(name);
    const [activeState, setActive] = useState(active);
    const [hiddenState, setHidden] = useState(hidden);
    const [completedState, setCompleted] = useState(completed);
    const [isEditing,setIsEditing] = useState(false);
    const [categoryNameState,setCategoryName] = useState(categoryName);
    const [expenseNameState,setExpenseName] = useState(expenseName);
    const [subCategoryNameState,setSubCategoryName] = useState(subCategoryName);
    const [descriptionState,setDescription] = useState(description);
    const [costState,setCost] = useState(String(cost));
    const [startDateState,setStartDate] = useState(startDate);
    const [expenseOptions,setExpenseOptions] = useState([])
    const [categoryOptions,setCategoryOptions] = useState([])
    const [subCategoryOptions,setSubCategoryOptions] = useState([]);
    const [showTransactionForm,setShowTransactionForm] = useState(false);

    const onUpdate = async() =>{
      // await props.refreshFunction(config,'Bearer '+ user.accessToken)
      if(isEditing){
        await modifyBudgetParams(config, 'Bearer '+user.accessToken,
        id,createdAt,updatedAt,nameState,startDateState,categoryNameState,
        expenseNameState,subCategoryNameState,descriptionState,costState,
        activeState,hiddenState,completedState,user.id);
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

  const refreshBudgetDescriptionPage = async(backend_url,bearerToken) =>{
    const {expenses,expenseOptions} = await getTotalExpenses(backend_url,bearerToken);
    const {categories,categoryOptions} = await getTotalCategories(backend_url,bearerToken);
    const {subCategories,subCategoryOptions} = await getTotalSubCategories(backend_url,bearerToken);
    setExpenseOptions(expenseOptions);  
    setCategoryOptions(categoryOptions);    
    setSubCategoryOptions(subCategoryOptions);    
  }

  useEffect(() => {
    refreshBudgetDescriptionPage(config,'Bearer '+user.accessToken);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown:false,
    });
  }, [])
  const navigation = useNavigation();


  const onDelete = async() =>{
			await deleteBudget(config,'Bearer '+user.accessToken,id)
      navigation.navigate("Normal")
	}

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
            <Text className="text-lg text-white">Update Item</Text>:
            <Text className="text-lg text-white">Edit Item</Text>}
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
          onPress={onDelete}>
          <Text className="text-lg text-white">Delete</Text>
          </TouchableOpacity>
        <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
          onPress={()=>setShowTransactionForm(!showTransactionForm)}>
          {showTransactionForm?<Text className="text-lg text-white">
            Hide Transaction
            </Text>:
            <Text className="text-lg text-white">
            Show Transaction
            </Text>}
        </TouchableOpacity>
        </View>
        {showTransactionForm?
        <AddTransactionForm cost={costState} expenseName={expenseNameState}
        categoryName={categoryNameState} subCategoryName={subCategoryNameState}/>:null}
        <View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">id : {id}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">Amount Spent : {String(amountSpent)}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">createdAt : {formatDate(new Date(createdAt))}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">updatedAt : {formatDate(new Date(updatedAt))}</Text>
            </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">Budget Amount : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={costState}  value={costState} Name='text' 
            onChangeText={text => setCost(text)}/>:
            <Text className="text-white text-xl">{costState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">Expense Name : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setExpenseName(value)} 
                  selected={expenseNameState?.toString()} placeholder="Expense"
                  className="flex-1 bg-white text-xl">
                  {expenseOptions?.map(option=>(
                     <SelectPicker.Item label={option.name} value={option.name}/>
                  ))}
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{expenseNameState?.toString()}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">Category Name : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setCategoryName(value)} 
                  selected={categoryNameState?.toString()} placeholder="Category"
                  className="flex-1 bg-white text-xl">
                  {categoryOptions?.map(option=>(
                     <SelectPicker.Item label={option.name} value={option.name}/>
                  ))}
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{categoryNameState?.toString()}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">Sub Category Name : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setSubCategoryName(value)} 
                  selected={subCategoryNameState?.toString()} placeholder="Sub Category"
                  className="flex-1 bg-white text-xl">
                  {subCategoryOptions?.map(option=>(
                     <SelectPicker.Item label={option.name} value={option.name}/>
                  ))}
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{subCategoryNameState?.toString()}</Text>}
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

export default BudgetDescription;