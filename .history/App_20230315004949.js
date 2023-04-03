
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { ConfigContext } from './context/ConfigContext';
import { ActiveContext } from './context/ActiveContext';
import localStorage from 'react-native-expo-localstorage'


export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
	const [config,setConfig] = useState('http://43.205.23.12:8083');
  const [showActive,setShowActive] = useState(true);

  const setUserInfo = (data) =>{
		localStorage.setItem("user", JSON.stringify(data));
		setUser(data);
	}
  return (
    <NavigationContainer>
        <ConfigContext.Provider value={{config,setConfig}}>
          <ActiveContext.Provider value={{showActive,setShowActive}}>
            <UserContext.Provider value={{user,setUser: setUserInfo}}>
              <StackNavigator/>
            </UserContext.Provider>
          </ActiveContext.Provider>
        </ConfigContext.Provider>
    </NavigationContainer>
  );
}


