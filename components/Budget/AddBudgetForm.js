import { View, Text,TouchableOpacity,CheckBox } from 'react-native'
import React, { useState,useContext,useEffect }  from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../context/UserContext';
import { createBudget } from '../../api/BudgetAPI';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import SelectPicker from 'react-native-form-select-picker';
import { getTotalCategories,getTotalSubCategories } from '../../api/AdminAPI';

const AddBudgetForm = (props) => {

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
	const [expenseName, setExpenseName] = useState(props.expenseName);
	const [categoryName, setCategoryName] = useState('');
	const [subCategoryName, setSubCategoryName] = useState('');
  const [categoryOptions,setCategoryOptions] = useState([])
  const [subCategoryOptions,setSubCategoryOptions] = useState([]);
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

   const onSubmit =async () =>{
		await createBudget(config,'Bearer '+user.accessToken,name,cost,expenseName,
    categoryName,subCategoryName);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
	}


  const refreshBudgetDescriptionPage = async(backend_url,bearerToken) =>{
    const {categories,categoryOptions} = await getTotalCategories(backend_url,bearerToken);
    const {subCategories,subCategoryOptions} = await getTotalSubCategories(backend_url,bearerToken);
    setCategoryOptions(categoryOptions);    
    setSubCategoryOptions(subCategoryOptions);    
  }

  useEffect(() => {
    refreshBudgetDescriptionPage(config,'Bearer '+user.accessToken);
  }, []);

  return (
    <View className="py-3 px-2 bg-gray-600">
      <View className=" flex-row ">
        <TextInput className="flex-1 mx-2 w-1/2 bg-white p-2" placeholder="Budget Amount"  
          value={cost} Name='text' 
          onChangeText={text => setCost(text)}/>
          <SelectPicker onValueChange={(value)=>setCategoryName(value)} 
            selected={categoryName?.toString()} placeholder="Category"
            className="flex-1 mx-2 w-1/2 bg-white text-xl">
              {categoryOptions?.map(option=>(
                <SelectPicker.Item label={option.name} value={option.name}/>
              ))}
          </SelectPicker> 
          <SelectPicker onValueChange={(value)=>setSubCategoryName(value)} 
            selected={subCategoryName?.toString()} placeholder="Sub Category"
            className="flex-1 mx-2 w-1/2 bg-white text-xl">
              {subCategoryOptions?.map(option=>(
                <SelectPicker.Item label={option.name} value={option.name}/>
              ))}
          </SelectPicker> 
      </View>
      <View className="flex">
        <TouchableOpacity onPress={onSubmit} className="items-center mx-2 my-3 bg-gray-300 p-2 ">
          <Text>Add Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddBudgetForm