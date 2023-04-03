
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';


export default function App() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
	const [config,setConfig] = useState('http://localhost:8083');
  const [showActive,setShowActive] = useState(true);
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


