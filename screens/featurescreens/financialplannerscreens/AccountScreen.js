import { View,Butchildton, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { UserContext } from '../../../context/UserContext';
  import AccountList from '../../../components/Account/AccountList';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { getTotalAccounts } from '../../../api/AdminAPI';
  import { getTotalAccountBalances } from '../../../api/AccountAPI';

  const AccountScreen = () => {
      const navigation = useNavigation();
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
      const [accounts,setAccounts] = useState([]);
      const [accountOptions,setAccountOptions] = useState([]);

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
        isFocused && refreshAccountPage(config,'Bearer '+user.accessToken);
      }, [isFocused]);

    const refreshAccountPage = async(backend_url,bearerToken) =>{
      const {accounts,accountOptions} = await getTotalAccounts(backend_url,bearerToken);
      const accountBalances = await getTotalAccountBalances(backend_url,bearerToken)
      setAccounts(accounts);
      setAccountOptions(accountBalances);
    }
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          <View>
            {chunkArray(accountOptions, 2).map(accountOptions =>
              <View className="flex-row align-middle justify-center">
                {accountOptions?.map(account=>
                  <View className="bg-green-200 rounded-xl py-3 px-2 my-4 mx-3">
                    <Text>
                      {account.name}: Rs {String(account.balance)}
                    </Text>
                  </View>
                )}
              </View>
              )}
          </View>
          <View>
            {accounts?.map((account)=>(
              <AccountList account={account} refreshFunction={refreshAccountPage}/>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

 export default AccountScreen