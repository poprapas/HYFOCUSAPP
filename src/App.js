import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetail from "./JobDetail"
import RoomDetail from "./RoomDetail"
import NewDetail from "./NewDetail"
import Tab from './Tab'
import ContentDetail from "./ContentDetail"
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tab" headerMode="none">
        <Stack.Screen name="Tab" component={Tab} />
        <Stack.Screen name="NewDetail" component={NewDetail} />
        <Stack.Screen name="JobDetail" component={JobDetail} />
        <Stack.Screen name="RoomDetail" component={RoomDetail} />
        <Stack.Screen name="ContentDetail" component={ContentDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// const AppNavigator = createStackNavigator({
//     Tab: { screen: Tab },
//     NewDetail: { screen: NewDetail },
//     JobDetail: { screen: JobDetail },
//     RoomDetail: { screen: RoomDetail },
//     ContentDetail: { screen: ContentDetail },
// },
//     {
//         initialRouteName: "Tab",
//         swipeEnabled: false,
//         headerMode: "none",
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: 'black',
//                 borderBottomColor: 'black',
//             },
//             headerBackTitleStyle: {
//                 color: 'white'
//             }
//         },
//         transitionConfig: () => ({
//             screenInterpolator: sceneProps => {
//                 const { layout, position, scene } = sceneProps;
//                 const { index } = scene;

//                 const translateX = position.interpolate({
//                     inputRange: [index - 1, index, index + 1],
//                     outputRange: [layout.initWidth, 0, 0]
//                 });

//                 const opacity = position.interpolate({
//                     inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
//                     outputRange: [0, 1, 1, 0.3, 0]
//                 });

//                 return { opacity, transform: [{ translateX }] }
//             }
//         })
//     });


export default App
