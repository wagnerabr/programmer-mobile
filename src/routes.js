import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';
import Login from './pages/Login';

const Routes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login'
            }
        },
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Lista Programadores'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Perfil Github"
            }
        }
    },
    {
        defaultNavigationOptions: {
            headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: '#7D40E7'
            }
        }
    }   
    )
);

export default Routes;