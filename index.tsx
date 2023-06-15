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

import { realmContext } from './local components/realm';
import { config } from './gluestack-ui.config';
import { GluestackUIProvider } from './components';
import App from './App';
import Options from './local components/options/options';
import ProductView from './local components/Product/ProductView';

import { name as appName } from './app.json';
import { COLORMODES } from '@dank-style/react/lib/typescript/types';
import { RootNativeStackParamList } from './types';



const Stack = createNativeStackNavigator<RootNativeStackParamList>();
const { RealmProvider } = realmContext;

function Navigation(): JSX.Element {


    const [theme, setTheme] = useState<COLORMODES>(Appearance.getColorScheme() || 'dark');

    return(
        <GluestackUIProvider config={config.theme}
            colorMode={theme}
        >
            <RealmProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}} >
                        <Stack.Screen name='Home'
                            component={App}
                            // initialParams={{
                            //     theme: theme
                            // }}
                        />
                        <Stack.Screen name='Options'
                            component={Options}
                            // initialParams={{
                            //     test: useRealm
                            // }}
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
