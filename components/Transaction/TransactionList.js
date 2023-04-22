import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import TransactionItem from './TransactionItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { getTransactions } from '../../api/TransactionAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import AddTransactionForm from './AddTransactionForm';
import { getTotalExpenses,getTotalAccounts,
getTotalCategories,getTotalSubCategories } from '../../api/AdminAPI';
import DateToString from '../utils/DateToString';
import MultiSelect from 'react-native-multiple-select';
import SelectPicker from 'react-native-form-select-picker';
import {startOfWeek,endOfWeek,startOfMonth,endOfMonth,
  startOfQuarter,endOfQuarter,startOfYear,endOfYear} from "date-fns";

const TransactionList = (props) => {

  const totalExpenses = "Total Expenses (based on below displayed transactions)";
  const startDateKey = "Start Date";
  const endDateKey = "End Date";
  const [showAddTransaction,setShowAddTransaction] = useState(false)
  const [accountTypes, setAccountTypes] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [subCategoryTypes, setSubCategoryTypes] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [expenseOptions, setExpenseOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [dateFrom,setDateFrom] = useState('');
  const [dateTo,setDateTo] = useState('');
  const [transactions,setTransactions] = useState([]);
  const [expenses,setExpenses] = useState('');
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const isFocused = useIsFocused();
  const [timePeriod,setTimePeriod] = useState('This Month')
  const timePeriods = [
    {value:'This Week',label:'This Week'},
    {value:'This Month',label:'This Month'},
    {value:'This Quarter',label:'This Quarter'},
    {value:'This Year',label:'This Year'}]

    useEffect(() => {
      isFocused && refreshTransactionsPage(config,'Bearer '+user.accessToken);
    }, [isFocused]);


  const refreshTransactionsPage = async(backend_url,bearerToken) =>{
    const {expenses,expenseOptions} = await getTotalExpenses(backend_url,bearerToken);
    const {accounts,accountOptions} = await getTotalAccounts(backend_url,bearerToken);
    const {categories,categoryOptions} = await getTotalCategories(backend_url,bearerToken);
    const {subCategories,subCategoryOptions} = await getTotalSubCategories(backend_url,bearerToken);
    setExpenseTypes(expenses);
    setAccountTypes(accounts);
    setCategoryTypes(categories);
    setSubCategoryTypes(subCategories);
    setExpenseOptions(expenseOptions);
    setAccountOptions(accountOptions);    
    setCategoryOptions(categoryOptions);    
    setSubCategoryOptions(subCategoryOptions);    
    setDateFrom(startOfMonth(new Date()));
    setDateTo(endOfMonth(new Date()))
    setShowAddTransaction(false);
    await refreshTransactions(backend_url,bearerToken,expenses,accounts,
      categories,subCategories,dateFrom,dateTo)
  }


  const refreshTransactions = async(backend_url=config,bearerToken,
    expenses=expenseTypes,accounts=accountTypes,
    categories=categoryTypes,subCategories=subCategoryTypes,
    dateFrom=dateFrom,dateTo=dateTo)=>{
        const {expense,transactions} = await getTransactions(backend_url,
          bearerToken,expenses,accounts,categories,subCategories,
          dateFrom,dateTo)
          setExpenses(expense);
          setTransactions(transactions);
  };


  const handleTimePeriodChange = async(value) =>{
    setTimePeriod(value)
    if(value=="This Week"){
      setDateFrom(startOfWeek(new Date(),{weekStartsOn:1}));
      setDateTo(endOfWeek(new Date(),{weekStartsOn:1}))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfWeek(new Date(),{weekStartsOn:1}),
      endOfWeek(new Date(),{weekStartsOn:1}))
  
    }
    else if (value=="This Month"){
      setDateFrom(startOfMonth(new Date()));
      setDateTo(endOfMonth(new Date()))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfMonth(new Date()),endOfMonth(new Date()))
  
    }
    else if (value=="This Quarter"){
      setDateFrom(startOfQuarter(new Date()));
      setDateTo(endOfQuarter(new Date()))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfQuarter(new Date()),endOfQuarter(new Date()))
  
    }
    else if (value=="This Year"){
      setDateFrom(startOfYear(new Date()));
      setDateTo(endOfYear(new Date()))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfYear(new Date()),endOfYear(new Date()))  
    }
  }

  const onSelectExpenseTypes = async(selectedValues)=>{
    setExpenseTypes(selectedValues)
    refreshTransactions(config,'Bearer '+user.accessToken,
    selectedValues,accountTypes,categoryTypes,subCategoryTypes,
    dateFrom,dateTo)

  }

  const onSelectAccountTypes = async(event)=>{
    const selectedValues = []
    for(let i =0;i<event.length;i++){
      selectedValues.push(event[i].name)
    }
    setAccountO
    refreshTransactions(config,'Bearer '+user.accessToken,
    expenseTypes,selectedValues,categoryTypes,subCategoryTypes,
    dateFrom,dateTo)

  }

  const onSelectCategoryTypes = async(event)=>{
    const selectedValues = []
    for(let i =0;i<event.length;i++){
      selectedValues.push(event[i].name)
    }
    setCategoryTypes(selectedValues)
    refreshTransactions(config,'Bearer '+user.accessToken,
    expenses,accountTypes,selectedValues,subCategoryTypes,
    dateFrom,dateTo)

  }

  const onSelectSubCategoryTypes = async(event)=>{
    const selectedValues = []
    for(let i =0;i<event.length;i++){
      selectedValues.push(event[i].name)
    }
    setSubCategoryTypes(selectedValues)
    refreshTransactions(config,'Bearer '+user.accessToken,
    expenseTypes,accountTypes,categoryTypes,selectedValues,
    dateFrom,dateTo)

  }

  return (
    <View >
      <View className="bg-gray-400 rounded-xl py-3 px-2 my-4 mx-3">
        <Text>
          Total Expenses (based on below displayed transactions) : {String(expenses)}
        </Text>
      </View>
      <View className="mb-5">
        <MultiSelect hideTags items={expenseOptions} 
        selectedItems={expenseTypes} selectedItemTextColor="#94a3b8"
        selectedItemIconColor='#000' selectText='Select Expense Types'
        onSelectedItemsChange={onSelectExpenseTypes} uniqueKey="name" 
        displayKey='name'/>
        <MultiSelect hideTags items={categoryOptions} 
        selectedItems={categoryTypes} selectedItemTextColor="#94a3b8"
        selectedItemIconColor='#000' selectText='Select Category Types'
        onSelectedItemsChange={onSelectCategoryTypes} uniqueKey="name" 
        displayKey='name'/>
        <MultiSelect hideTags items={subCategoryOptions} 
        selectedItems={subCategoryTypes} selectedItemTextColor="#94a3b8"
        selectedItemIconColor='#000' selectText='Select Sub Category Types'
        onSelectedItemsChange={onSelectSubCategoryTypes} uniqueKey="name" 
        displayKey='name'/>
        <MultiSelect hideTags items={accountOptions} 
        selectedItems={accountTypes} selectedItemTextColor="#94a3b8"
        selectedItemIconColor='#000' selectText='Select Account Types'
        onSelectedItemsChange={onSelectAccountTypes} uniqueKey="name" 
        displayKey='name'/>
        <SelectPicker onValueChange={handleTimePeriodChange} 
            selected={timePeriod} className="flex-1 bg-white text-xl">
                  {timePeriods?.map(option=>(
            <SelectPicker.Item label={option.label} value={option.value}/>
                  ))}
        </SelectPicker> 
      </View>
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {transactions?.map((record)=>(
                <TransactionItem record={record} key={record.id}
                refreshFunction={refreshTransactionsPage}/>
            ))}
        </View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581] justify-center items-center ">
        <TouchableOpacity
             onPress={()=>{setShowAddTransaction(!showAddTransaction)}}>
              <PlusCircleIcon color="white" size={30}/>
        </TouchableOpacity>
      </View>
      {showAddTransaction?
      <AddTransactionForm refreshFunction={refreshTransactionsPage}/>:null}
    </View>
  )
}

export default TransactionList