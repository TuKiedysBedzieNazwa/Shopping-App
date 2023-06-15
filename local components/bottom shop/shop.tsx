import React, { useState } from 'react';
import { View } from 'react-native';
import {
    Button,
    Box,
    Center,
} from '../../components/core';
import { Plus } from 'lucide-react-native';

import { realmContext, Products } from '../realm';
import ProductAddModal from './productAddModal';
import ShoppingBasketModal from './shoppingBasketModal';



function Shop(): JSX.Element {

    const [shopVisible, setShopVisible] = useState<boolean>(false);
    const [addVisible, setAddVisible] = useState<boolean>(false);


    return(
        <Box position='absolute'
            bottom={0}
            left={0}
            right={0}
        >
            <Center flexDirection='row'
                w='$full'
                h='$24'
            >
                <Button onPress={() => setShopVisible(true)} >
                    <Button.Text>
                        Koszyk
                    </Button.Text>
                </Button>
                <Button onPress={() => setAddVisible(true)}
                    ml={15}
                    variant='outline'
                    borderColor="#0077E6"
                >
                    <Plus color='#0077E6' size={22} />
                </Button>
            </Center>
            <ProductAddModal visible={addVisible}
                setVisible={setAddVisible}
            />
            <ShoppingBasketModal visible={shopVisible}
                setVisible={setShopVisible}
            />
        </Box>
    )
}



export default Shop;