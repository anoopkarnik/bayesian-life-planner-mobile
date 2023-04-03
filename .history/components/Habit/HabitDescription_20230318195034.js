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
    <View style={styles.container}>
        <Button title='Show panel' onPress={() => this._panel.show()} />
            <SlidingUpPanel ref={c => this._panel = c}>
      <View style={styles.container}>
        <Text>Here is the content inside panel</Text>
        <Button title='Hide' onPress={() => this._panel.hide()} />
      </View>
    </SlidingUpPanel>
  </View>
  )
}

export default HabitDescription