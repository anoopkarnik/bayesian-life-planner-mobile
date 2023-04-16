import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer'
import { UserCircleIcon } from 'react-native-heroicons/solid'

const CustomDrawer = (props) => {
  return (
    <View className="flex-1 bg-[#556581] ">
    <DrawerContentScrollView {...props}>
        <View className="mb-10 ">
            <UserCircleIcon color="white" size ={100}/>
        </View>
        <View className="text-white">
            <DrawerItemList {...props}/>
        </View>
    </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer