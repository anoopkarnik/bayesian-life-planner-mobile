import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { UserContext } from '../../../context/UserContext';
  import SkillList from '../../../components/Skill/SkillList';
  import { getTotalSkills } from '../../../api/AdminAPI';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const SkillScreen = () => {
      const navigation = useNavigation();
      const [skills,setSkills] = useState([]);
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          isFocused && refreshSkillPage(config,'Bearer '+user.accessToken);
        }, [isFocused]);
  
      const refreshSkillPage = async(backend_url,bearerToken) =>{
        const {skills,skillOptions} = await getTotalSkills(config,'Bearer '+user.accessToken);
        setSkills(skills);
      }
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          {skills?.map(skill=>
          <View>
              <SkillList key={skill} skill={skill} refreshFunction={refreshSkillPage}/> 
          </View>)}
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default SkillScreen