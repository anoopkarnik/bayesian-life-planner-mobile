import { View,Butchildton, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { UserContext } from '../../../context/UserContext';
  import BudgetList from '../../../components/Budget/BudgetList';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { getBudgetPlans,getIncomes,deleteIncome } from '../../../api/BudgetAPI';
  import { PlusCircleIcon,TrashIcon } from 'react-native-heroicons/solid';
import AddIncomeForm from '../../../components/Budget/AddIncomeForm';
import IncomeItem from '../../../components/Budget/IncomeItem';
import PlanPercentageItem from '../../../components/Budget/PlanPercentage';

  const BudgetScreen = () => {
      const navigation = useNavigation();
      const isFocused = useIsFocused();
      const [budgetPlans,setBudgetPlans] = useState([]);
      const [showAddBudget, setShowAddBudget] = useState(false);
      const [showAddIncome, setShowAddIncome] = useState(false);
      const [showIncome,setShowIncome] = useState(false);
      const {user, setUser} = useContext(UserContext);
      const [incomes, setIncomes] = useState([])
      const {config} = useContext(ConfigContext);

      function chunkArray(arr, size) {
        var groupedArray = [];
        for(var i = 0; i < arr.length; i += size) {
          groupedArray.push(arr.slice(i, i+size));
        }
        return groupedArray ;
      }
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])

      useEffect(() => {
        isFocused && refreshBudgetPage(config,'Bearer '+user.accessToken);
      }, [isFocused]);

    const refreshBudgetPage = async(backend_url,bearerToken) =>{
      var budget_plans = await getBudgetPlans(config,'Bearer '+user.accessToken);
      var income = await getIncomes(config,'Bearer '+user.accessToken);
      setBudgetPlans(budget_plans);
      setIncomes(income);
    }

 
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          <View>
            {chunkArray(budgetPlans, 2).map(budgetPlans =>
              <View className="flex-row align-middle justify-center">
                {budgetPlans?.map(budget=>
                  <PlanPercentageItem budget={budget} 
                  refreshFunction={refreshBudgetPage}/>
                )}
              </View>
              )}
          </View>
          <View className="flex-row py-3 px-2 bg-[#556581]">
                <TouchableOpacity 
                  onPress={()=>setShowIncome(!showIncome)} className="flex-1 ">
                    <Text className="text-xl text-white font-bold">Monthly Income</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{setShowAddIncome(!showAddIncome)}}>
                  <PlusCircleIcon color="white" size={30}/>
                </TouchableOpacity>
          </View>
          <View>
            {showIncome?
                <View>
                  {incomes?.map((income)=>(
                    <IncomeItem income={income} refreshFunction={refreshBudgetPage}/>
                  ))}
                </View>:null}
          </View>
          <View>
            {showAddIncome?
              <AddIncomeForm refreshFunction={refreshBudgetPage}/>:null
            }
          </View>
          <View className="my-10">
            {budgetPlans?.map((budget)=>(
              <BudgetList 
                refreshFunction={refreshBudgetPage}
                name={budget.expenseName} 
                value1={budget.transactionTotal} 
                value2={budget.planTotal} 
                value3={budget.allottedTotal}
                />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

 export default BudgetScreen