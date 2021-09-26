// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from './Screens/Home';
// import AskQuestion from './Screens/AskQuestion';
// import TalkToExpert from './Screens/TalkToExpert';
// import Report from './Screens/Report';

// const Tab = createBottomTabNavigator();


// class Routes extends React.Component{
//     render(){
//         return (
//             <NavigationContainer>
//                 <Tab.Navigator backBehavior="none"
//                                initialRouteName="Home"
//                                screenOptions={{
//                                 tabBarVisible : false
//                                }} >
//                     <Tab.Screen name="Home" component={Home} />
//                     <Tab.Screen name="TalkToExpert" component={TalkToExpert} />
//                     <Tab.Screen name="AskQuestion" component={AskQuestion} />
//                     <Tab.Screen name="Report" component={Report} />
//                 </Tab.Navigator>
//             </NavigationContainer>
//         )
//     }  
// };


// export default Routes;