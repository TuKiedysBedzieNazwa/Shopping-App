/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Appearance,
} from 'react-native';
import {
  ScrollView,
  Button,
  Box,
  Center,
  Text
} from './components/core';
import { Settings2 } from 'lucide-react-native';

import Shop from './local components/bottom shop/shop';

import { COLORMODES } from '@dank-style/react/lib/typescript/types';
import { HomeProps } from './types';


function App({ navigation, route }: HomeProps): JSX.Element {

  const [theme, setTheme] = useState<COLORMODES>(Appearance.getColorScheme() || 'dark');

  return (
    <>
      <Box position='absolute'
        top={20}
        right={30}
        zIndex={1}
      >
        <Button variant='outline'
          w={45}
          h={45}
          onPress={() => navigation.navigate('Options')}
        >
          <Settings2 color='black' size={26} />
        </Button>
      </Box>

      <ScrollView>

        <Box bg='$white' p='$5' borderRadius='$xl' m='$4'>
          <Text>
            hej
          </Text>
        </Box>

      </ScrollView>

      <Shop />
      </>
  );
}



export default App;