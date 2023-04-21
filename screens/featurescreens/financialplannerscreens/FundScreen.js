import { View,Butchildton, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { UserContext } from '../../../context/UserContext';
  import FundList from '../../../components/Fund/FundList';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { getFundSummary } from '../../../api/FundAPI';
  const FundScreen = () => {
      const navigation = useNavigation();
      const {user} = useContext(UserContext);
      const [fundSummary, setFundSummary] = useState('');
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
      const [showFundSummary,setShowFundSummary] = useState(false)
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      const Stack = createNativeStackNavigator();

      useEffect(() => {
        refreshFundsPage(config,'Bearer '+user.accessToken);
      }, []);

      function chunkArray(arr, size) {
        var groupedArray = [];
        for(var i = 0; i < arr.length; i += size) {
          groupedArray.push(arr.slice(i, i+size));
        }
        return groupedArray ;
      }
  

  const refreshFundsPage = async(backend_url,bearerToken) =>{
    var fund_summary = await getFundSummary(config,'Bearer '+user.accessToken);
    setFundSummary(fund_summary)
  }
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          <View className="flex-row py-3 px-2 bg-[#556581]">
            <TouchableOpacity 
                  onPress={()=>setShowFundSummary(!showFundSummary)} className="flex-1 ">
                <Text className="text-xl text-white font-bold">Show Fund Summary</Text>
            </TouchableOpacity>
          </View>
          {showFundSummary?<View>
          <View className="flex-row align-middle justify-center">
            <View className="flex-1 bg-gray-400 py-3 px-2">
              <Text>
                Portfolio Amount (in Rs): 
                {String(fundSummary.totalAmount)}
              </Text>
            </View> 
          </View>
          <View className="flex-row align-middle justify-center">
            <View className="flex-1 bg-gray-400 py-3 px-2">
              <Text>
                Amount Available to invest in funds (in Rs): 
                {String(fundSummary.amountAvailable)}
              </Text>
            </View> 
          </View>
          <View className="flex-row align-middle justify-center">
            <View className="flex-1 bg-gray-400 py-3 px-2">
              <Text>
                Amount Allocated in funds (in Rs): 
                {String(fundSummary.amountAllocated)}
              </Text>
            </View> 
          </View>
          <View className="flex-row align-middle justify-center">
            <View className="flex-1 bg-gray-400 py-3 px-2">
              <Text>
              Financial Independence Amount (in Rs): 
                {String(fundSummary.financialIndependenceAmount)}
              </Text>
            </View> 
          </View>
          <View className="flex-row align-middle justify-center">
            <View className="flex-1 bg-gray-400 py-3 px-2">
              <Text>
              Financial Independence Percentage: 
                {String(fundSummary.financialIndependencePercentage)}
              </Text>
            </View> 
          </View>
          <View className="flex-row align-middle justify-center">
            <View className="flex-1 bg-gray-400 py-3 px-2">
              <Text>
              Time left for Financial Independence (in years): 
                {String(fundSummary.timeLeft)}
              </Text>
            </View> 
          </View>
          </View>:null}


          <FundList/>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default FundScreen