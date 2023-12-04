import React, { useState, useEffect } from "react";
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
    Toast,
    useToast,
    Text
} from '../components/core';

import { realmContext, Products } from './realm';

import { RenderProductsProps } from '../types';


const cloneDB = (products: Realm.Results<Products>): number[] => {
    const arr: number[] = [];
    for (const product of products) {
        arr[product._id] = 1;
    }
    return arr
}

export default function RenderProducts({ products, navigation, route, values, setValues }: RenderProductsProps): JSX.Element {

    const toast = useToast();

    const [pressIn, setPressIn] = useState<number[]>(cloneDB(products));

    useEffect(() => {
        setPressIn(cloneDB(products))
    }, [products.length])

    return (
        <Box display='flex'
            my={100}
            px={10}
            flexDirection='row'
            flexWrap='wrap'
            justifyContent='space-evenly'
        >
            {
                products.map((product, i) => (
                    <Pressable key={product._id}
                        onPressIn={() => {
                            const next = pressIn.map((value, index) => {
                                if (product._id === index) {
                                    return -17;
                                }
                                else {
                                    return value;
                                }
                            })
                            setPressIn(next);
                        }}
                        onLongPress={() => navigation.navigate('ProductView', {
                            product: product
                        })}
                        onPressOut={() => {
                            const next = pressIn.map((value, index) => {
                                if (product._id === index) {
                                    return 0;
                                }
                                else {
                                    return value;
                                }
                            })
                            setPressIn(next);
                        }}
                        onPress={() => {

                            const next = values.map((value, index) => {
                                if (product._id === index) {
                                    return ++value;
                                }
                                else {
                                    return value;
                                }
                            })
                            setValues(next);

                            toast.show({
                                placement: 'top',
                                duration: 1500,
                                render: () => (
                                    <Toast >
                                        <Toast.Title textAlign='center'
                                            lineHeight={15}
                                            mx={20}
                                        >
                                            dodano {product.name}, {'\n'}
                                            aktualnie w koszyku: {values[product._id] + 1}
                                        </Toast.Title>
                                    </Toast>
                                )
                            })

                        }}
                        style={{ margin: 10 }}
                    >
                        <Box w={100}
                            h={100}
                            borderRadius={5}
                            bg='$gray200'
                            overflow='hidden'
                            initial={{
                                x: -50,
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                y: pressIn[product._id]
                            }}
                            transition={{
                                type: 'spring',
                                delay: pressIn[product._id] === 1 ? 400 + i * 50 : 100,
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
                ))
            }
        </Box>
    )
}