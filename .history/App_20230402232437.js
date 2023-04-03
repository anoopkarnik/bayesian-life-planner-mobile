
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { ConfigContext } from './context/ConfigContext';
import { ActiveContext } from './context/ActiveContext';

export default function App() {
  const [user, setUser] = useState("");
	const [config,setConfig] = useState('https://bayesian-life-planner-backend.anoopkarnik.net');
  const [showActive,setShowActive] = useState(true);

  return (
    <NavigationContainer>
        <ConfigContext.Provider value={{config,setConfig}}>
          <ActiveContext.Provider value={{showActive,setShowActive}}>
            <UserContext.Provider value={{user,setUser: setUser}}>
              <StackNavigator/>
            </UserContext.Provider>
          </ActiveContext.Provider>
        </ConfigContext.Provider>
    </NavigationContainer>
  );
}


