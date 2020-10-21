import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetail from "./JobDetail"
import RoomDetail from "./RoomDetail"
import NewDetail from "./NewDetail"
import Tab from './Tab'
import ContentDetail from "./ContentDetail"
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
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

export default App
