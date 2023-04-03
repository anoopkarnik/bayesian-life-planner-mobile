import { View, Text } from 'react-native'
import React from 'react'
import SlidingUpPanel from 'rn-sliding-up-panel';

const HabitDescription = () => {
  return (
    <SlidingUpPanel>
        <View className="bg-white">
            <Text>HabitDescription</Text>
        </View>
    </SlidingUpPanel>
  )
}

export default HabitDescription