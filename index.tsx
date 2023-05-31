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

import { GluestackUIProvider } from './components';
import { config } from './gluestack-ui.config';
import App from './App';
import Options from './local components/options/options';

import {name as appName} from './app.json';
import { COLORMODES } from '@dank-style/react/lib/typescript/types';
import { RootNativeStackParamList } from './types';




import Realm from 'realm';
import { createRealmContext } from '@realm/react';

class Test extends Realm.Object<Test>{

    _id!: Realm.BSON.ObjectId;
    name!: string;
    
    static schema = {
        name: 'Test',
        properties: {
            _id: 'objectId',
            name: 'string',
        },
        primaryKey: '_id',
    };
}


const realmConfig: Realm.Configuration = {
    schema: [Test]
}

const {RealmProvider, useRealm, useObject, useQuery} = createRealmContext(realmConfig);












const Stack = createNativeStackNavigator<RootNativeStackParamList>();

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
                    </Stack.Navigator>
                </NavigationContainer>
            </RealmProvider>
        </GluestackUIProvider>
    )
}



AppRegistry.registerComponent(appName, () => Navigation);
