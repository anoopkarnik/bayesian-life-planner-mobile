import { View, Text } from 'react-native'
import React,{useState,useContext} from 'react'
import ConfigureItem from './ConfigureItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

const ConfigureList = (props) => {
    const [newName,setNewName] = useState('');
    const [key,setKey] = useState('Add '+props.name)
    const {user, setUser} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

    const onCreate = async() =>{
        await props.createFunction(config,'Bearer '+user.accessToken,newName)
        await props.refreshFunction(config,'Bearer '+user.accessToken)
        setKey('Add '+props.name);
    }
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  )
}

export default ConfigureList