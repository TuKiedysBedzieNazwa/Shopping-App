/**
 * @format
 */
import { useState } from 'react';
import {
    AppRegistry,
    Appearance
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { realmContext } from './localComponents/realm';
import { config } from './gluestack-ui.config';
import { GluestackUIProvider } from './components';
import App from './App';
import Options from './localComponents/options/options';
import ProductView from './localComponents/Product/ProductView';

import { name as appName } from './app.json';




const Stack = createNativeStackNavigator();
const { RealmProvider } = realmContext;

function Navigation(){


    const [theme, setTheme] = useState(Appearance.getColorScheme() || 'dark');

    return(
        <GluestackUIProvider config={config.theme}
            colorMode={theme}
        >
            <RealmProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}} >
                        <Stack.Screen name='Home'
                            component={App}
                        />
                        <Stack.Screen name='Options'
                            component={Options}
                        />
                        <Stack.Screen name='ProductView'
                            component={ProductView}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </RealmProvider>
        </GluestackUIProvider>
    )
}



AppRegistry.registerComponent(appName, () => Navigation);
