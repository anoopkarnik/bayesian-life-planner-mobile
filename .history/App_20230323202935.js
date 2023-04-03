
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import StackNavigator from './StackNavigator';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { ConfigContext } from './context/ConfigContext';
import { ActiveContext } from './context/ActiveContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function App() {
  const [user, setUser] = useState("");
	const [config,setConfig] = useState('http://43.205.23.12:8083');
  const [showActive,setShowActive] = useState(true);

  return (
    <NavigationContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ConfigContext.Provider value={{config,setConfig}}>
          <ActiveContext.Provider value={{showActive,setShowActive}}>
            <UserContext.Provider value={{user,setUser: setUser}}>
              <StackNavigator/>
            </UserContext.Provider>
          </ActiveContext.Provider>
        </ConfigContext.Provider>
      </LocalizationProvider>
    </NavigationContainer>
  );
}


