import { View, Text,SafeAreaView,Image, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation,StackActions } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { useState,useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useAuth } from '../../../context/UserContext';
import {Bars3BottomRightIcon,Bars3Icon} from 'react-native-heroicons/solid';
import { Menu,MenuTrigger,MenuOptions,MenuOption } from 'react-native-popup-menu';
import { ActiveContext } from '../../../context/ActiveContext';

const ProfileScreen = () => {
  const {showActive,setShowActive} = useContext(ActiveContext)
  const {user} = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const {setUser} = useAuth();
  const navigation = useNavigation();
  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      });
  }, [])

  const logout = async()=>{
		try{
	  		setUser(false);
		}
		catch{
			Alert.alert("Username/Password not found")
		}
    }

  return (
    <SafeAreaView className="bg-black flex-1">
        <View className="flex-row mt-8 mb-3">
                <TouchableOpacity className="flex-1 " onPress={()=>navigation.toggleDrawer()}>
                    <Bars3Icon color="white" size={30}/>
                </TouchableOpacity>

            </View>
        <View className="mt-20 justify-center items-center">
          <View className="my-5 ">
            <Text className="text-white text-l">Name : {name}</Text>
            <Text className="text-white text-l">Email : {user.email}</Text>
          </View>
          <TouchableOpacity  onPress={logout}
            className="bg-black p-3 my-5 mx-3 justify-center items-center border-solid border-2 border-violet-400">
            <Text className="text-white"> LOGOUT </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen