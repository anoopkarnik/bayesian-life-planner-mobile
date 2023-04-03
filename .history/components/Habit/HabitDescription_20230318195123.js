import { View, Button,Text } from 'react-native'
import React from 'react'

import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const HabitDescription = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown:false,
    });
  }, [])
  const navigation = useNavigation();


  return (
    <View>
      <View>
        <Text>Here is the content inside panel</Text>
      </View>

  </View>
  )
}

export default HabitDescription