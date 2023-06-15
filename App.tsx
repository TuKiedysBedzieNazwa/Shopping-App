/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Appearance,
  View,
  Pressable
} from 'react-native';
import {
  ScrollView,
  Button,
  Box,
  Image,
  Center,
  Text
} from './components/core';
import { Settings2 } from 'lucide-react-native';

import { realmContext, Products } from './local components/realm';
import Shop from './local components/bottom shop/shop';

import { HomeProps } from './types';



const { useQuery } = realmContext;

function App({ navigation, route }: HomeProps): JSX.Element {

  const products = useQuery(Products);

  const [pressIn, setPressIn] = useState<{[key: string]: number}>({});

  const map = new Map();
  for(let i=0; i< products.length; i++){
    map.set(products[0]._id, 0);
  }

  useEffect(() => {
    console.log(map);
  }, []);

  return (
    <>
      <Box position='absolute'
        top={20}
        right={25}
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
        <Box display='flex'
          mt={100}
          m={10}
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='space-evenly'
        >
          {
            products.map(product => {

              return (
              <Pressable key={product._id}
                // onPressIn={() => setPressIn(-15)}
                onLongPress={() => navigation.navigate('ProductView', {
                  product: product
                })}
                // onPressOut={() => setPressIn(0)}
              >
                <Box w={100}
                  h={100}
                  borderRadius={5}
                  bg='$gray200'
                  m={10}
                  overflow='hidden'
                  initial={{
                    x: -50,
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    // y: pressIn
                  }}
                  transition={{
                    type: 'spring',
                    // delay: pressIn === 1 ? 400 + product._id * 50 : 100,
                    stiffnes: 1000
                  }}
                >
                  <Image w={100}
                    h={100}
                    source={{
                      uri: product.image
                    }}
                  />
                </Box>
              </Pressable>
            )})
          }
        </Box>

      </ScrollView>

      <Shop />
    </>
  );
}



export default App;