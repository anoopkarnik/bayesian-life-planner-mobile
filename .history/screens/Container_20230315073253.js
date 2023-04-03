import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TvIcon } from 'react-native-heroicons/solid';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Container = () => {
    const homeName = 'Home';
    const profileName = 'Profile';
    const Tab = createBottomTabNavigator();
  return (
    <View>
      <Text>Container</Text>
    </View>
  )
}

export default Container