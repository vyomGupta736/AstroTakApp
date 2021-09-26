import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Screens/Home';
import TalkToAstrologer from './src/Screens/TalkToAstrologer';
import Report from './src/Screens/Report';
import AskQuestion from './src/Screens/AskQuestion';
import { verticalScale, scale } from "./src/Components/Exports";
import TabBarIcon from './src/Components/TabBarIcon';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
          screenOptions={({route}) => ({
                tabBarIcon : ({focused,size}) => {
                    return (
                    <TabBarIcon focused={focused} routeName = {route.name} focusedBackgroundColor='turquoise' bluredBackgroundColor='rgb(212,212,212)' size={size} />
                    )
                },
                "tabBarHideOnKeyboard": true,
                "tabBarActiveTintColor": "rgb(255,255,255)",
                "tabBarInactiveTintColor": "rgb(190,190,190)",
                "tabBarAllowFontScaling": false,
                "tabBarShowLabel": false,
                "tabBarStyle": [
                  {
                    "display": "flex",
                    "height" : verticalScale(70)
                  },
                  null
                ]
            })
          }
        backBehavior="none"

        >
        <Tab.Screen name="Home" component={Home} options={{headerShown : false}} />
        <Tab.Screen name="TalkToAstrologer" component={TalkToAstrologer} options={{headerShown : false}} />
        <Tab.Screen name="AskQuestion" component={AskQuestion} options={{headerShown : false}} />
        <Tab.Screen name="Report" component={Report} options={{headerShown : false}}outub />
      </Tab.Navigator>
    </NavigationContainer>
  );
}