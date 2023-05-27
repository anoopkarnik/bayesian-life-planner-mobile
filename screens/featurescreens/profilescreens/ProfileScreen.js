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
import { modifyProfileParams } from '../../../api/AuthenticationAPI';
import { ConfigContext } from '../../../context/ConfigContext';


const ProfileScreen = () => {
  const {showActive,setShowActive} = useContext(ActiveContext)
  const {user} = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [panNo, setPanNo] = useState(user.panNo);
  const [isEditing,setIsEditing] = useState(false);
  const {config} = useContext(ConfigContext);
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
    const onUpdate= async()=>{
      if(isEditing===true){
        await modifyProfileParams(config,'Bearer '+user.accessToken,panNo)
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
      
    } 

  return (
    <SafeAreaView className="bg-black flex-1">
        <View className="flex-row mt-8 mb-3">
                <TouchableOpacity className="flex-1 " onPress={()=>navigation.toggleDrawer()}>
                    <Bars3Icon color="white" size={30}/>
                </TouchableOpacity>
        </View>
        <View className="my-5 mx-1 flex-row align-middle">
          <TouchableOpacity onPress={onUpdate}
          className="bg-gray-600 mx-2 rounded-lg p-2">
            {isEditing?
            <Text className="text-xl text-white">Update Profile</Text>:
            <Text className="text-xl text-white">Edit Profile</Text>}
          </TouchableOpacity>
        </View>
        <View className="my-5 justify-center">
          <View className="flex-row py-2">
            <Text className="text-white text-xl">Name : {name}</Text>
          </View>
          <View className="flex-row  py-2">
            <Text className="text-white text-xl">Email : {user.email}</Text>
          </View>
          <View className="flex-row py-2">
            <Text className="text-white text-xl">Pan No : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={panNo}  value={panNo} Name='text' 
            onChangeText={text => setPanNo(text)}/>:
            <Text className="text-white text-xl">{panNo}</Text>}
          </View>
          <TouchableOpacity  onPress={logout}
            className="bg-gray-600 mx-2 mt-5 rounded-lg p-2">
            <Text className="text-white text-xl"> LOGOUT </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen