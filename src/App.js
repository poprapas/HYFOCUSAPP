import { createStackNavigator, createAppContainer } from "react-navigation";
import JobDetail from "./JobDetail"
import RoomDetail from "./RoomDetail"
import NewDetail from "./NewDetail"
import Tab from './Tab'
import ContentDetail from "./ContentDetail"

const AppNavigator = createStackNavigator({
    Tab: { screen: Tab },
    NewDetail: { screen: NewDetail },
    JobDetail: { screen: JobDetail },
    RoomDetail: { screen: RoomDetail },
    ContentDetail: { screen: ContentDetail },
},
    {
        initialRouteName: "Tab",
        swipeEnabled: false,
        headerMode: "none",
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'black',
                borderBottomColor: 'black',
            },
            headerBackTitleStyle: {
                color: 'white'
            }
        },
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [layout.initWidth, 0, 0]
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                    outputRange: [0, 1, 1, 0.3, 0]
                });

                return { opacity, transform: [{ translateX }] }
            }
        })
    });


export default createAppContainer(AppNavigator)
