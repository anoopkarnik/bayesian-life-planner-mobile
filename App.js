
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { ConfigContext } from './context/ConfigContext';
import { ActiveContext } from './context/ActiveContext';
import { CurrentDateContext } from './context/CurrentDateContext';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const [user, setUser] = useState("");
	const [config,setConfig] = useState('https://bayesian-life-planner-backend.anoopkarnik.net');
  const [showActive,setShowActive] = useState(true);
  let date = new Date()
  let currentTime = date.getTime()
  let curDate = new Date(currentTime+5.5*60*60*1000)
  const [currentDate,setCurrentDate] = useState(curDate)

  return (
    <NavigationContainer>
        <ConfigContext.Provider value={{config,setConfig}}>
          <ActiveContext.Provider value={{showActive,setShowActive}}>
            <UserContext.Provider value={{user,setUser: setUser}}>
              <CurrentDateContext.Provider value={{currentDate,setCurrentDate}}>
                <MenuProvider>
                  <StackNavigator/>
                </MenuProvider>
              </CurrentDateContext.Provider>
            </UserContext.Provider>
          </ActiveContext.Provider>
        </ConfigContext.Provider>
    </NavigationContainer>
  );
}


