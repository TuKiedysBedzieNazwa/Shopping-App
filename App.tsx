/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Button,
  Box,
  Center
} from './components/core';
import { Plus, ShoppingBasket } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { realmContext, Products } from './localComponents/realm';
import NavBar from './localComponents/navBar';
import RenderProducts from './localComponents/renderProducts';
import ProductAddModal from './localComponents/bottomShop/productAddModal';
import ShoppingBasketModal from './localComponents/bottomShop/shoppingBasketModal';

import { HomeProps } from './types';


const cloneDB = (products: Realm.Results<Products>): number[] => {
  const arr: number[] = [];
  for (const product of products) {
    arr[product._id] = product.toBuy;
  }
  return arr
}


const { useQuery } = realmContext;

function App({ navigation, route }: HomeProps): JSX.Element {

  const [filter, setFilter] = useState<string>("name");

  const DBproducts = useQuery(Products).sorted(filter, false);
  const [values, setValues] = useState<number[]>(cloneDB(DBproducts));

  useEffect(() => {
    setValues(cloneDB(DBproducts));
  }, [DBproducts.length]);

  const [shopVisible, setShopVisible] = useState<boolean>(false);
  const [addVisible, setAddVisible] = useState<boolean>(false);

  return (
    <>
      <NavBar
        navigation={navigation}
        filter={filter}
        setFilter={setFilter}
      />
      <ScrollView>
        <Box>

        </Box>
        <RenderProducts
          products={DBproducts}
          navigation={navigation}
          route={route}
          values={values}
          setValues={setValues}
        />
      </ScrollView>

      <Box position='absolute'
        bottom={0}
        left={0}
        right={0}
      >
        <Center flexDirection='row'
          w='$full'
          h='$24'
        >

          <LinearGradient colors={["#6712e3", "#cd87aa"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{borderRadius: 8}}
          >
            <Button onPress={() => setShopVisible(true)}
              bg="transparent"
              w={80}
              h={55}
              flexDirection='column'
            >
              <ShoppingBasket size={30} color="#fff"/>
              <Box mt={5}
                w={30}
                h={3}
                bg="white"
                borderRadius="$full"
              />
            </Button>
          </LinearGradient>

          <Button onPress={() => setAddVisible(true)}
            ml={30}
            variant='outline'
            bg="$white"
            w={80}
            h={55}
            flexDirection='column'
          >
            <Plus color='#6712e3' size={30} strokeWidth={2.8} />
            <Box mt={5}
              w={30}
              h={3}
              bg="#8512e3"
              borderRadius="$full"
              />
          </Button>

        </Center>
        <ProductAddModal products={DBproducts}
          visible={addVisible}
          setVisible={setAddVisible}
        />
        <ShoppingBasketModal products={DBproducts}
          visible={shopVisible}
          setVisible={setShopVisible}
          values={values}
          setValues={setValues}
        />
      </Box>
    </>
  );
}



export default App;