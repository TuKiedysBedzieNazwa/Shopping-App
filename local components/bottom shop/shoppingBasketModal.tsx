import React, { useState } from "react";
import { Pressable } from "react-native";
import {
    Box,
    Center,
    Button,
    Text,
    Image
} from "../../components";
import Modal from "react-native-modal";
import { Plus, Minus } from "lucide-react-native";

import { realmContext, Products } from "../realm";



interface props {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const {useRealm, useQuery} = realmContext;

function ShoppingBasketModal({visible, setVisible}: props): JSX.Element {

    const realm = useRealm()
    const products = useQuery(Products);

    return(
        <Modal isVisible={visible}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection='down'
        >
            <Box bg='$white'
                borderRadius={10}
                p={10}
                position='absolute'
                bottom={10}
                left={0}
                right={0}
            >
                <Center>

                    {
                        products.map(product => {

                            // const [counter, setCounter] = useState<number>(product.toBuy);

                            return (
                                <Box key={product._id}
                                    display='flex'
                                    flexDirection='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    w='80%'
                                    mt={10}
                                >
                                    <Box w={75}
                                        h={75}
                                        borderRadius={10}
                                        overflow='hidden'
                                    >
                                        <Image w={75}
                                            h={75}
                                            source={{
                                                uri: product.image
                                            }}
                                        />
                                    </Box>

                                    <Box display='flex'
                                        flexDirection='row'
                                        justifyContent='space-evenly'
                                    >
                                        {/* <Pressable style={{
                                                backgroundColor: '#e4e4e7',
                                                padding: 3,
                                                borderRadius: 5,
                                                marginRight: 10
                                            }}
                                            onPress={() => setCounter(val => val + 1)}
                                        >
                                            <Plus color="black" />
                                        </Pressable>
                                        <Text p={3}>
                                            {counter}
                                        </Text>
                                        <Pressable style={{
                                                backgroundColor: '#e4e4e7',
                                                padding: 3,
                                                borderRadius: 5,
                                                marginLeft: 10
                                            }}
                                            onPress={() => setCounter(val => val - 1)}
                                        >
                                            <Minus color="black" />
                                        </Pressable> */}
                                    </Box>

                                </Box>
                            )
                        })
                    }

                    <Button mt={20}>
                        <Button.Text>
                            Kup
                        </Button.Text>
                    </Button>
                </Center>
            </Box>
        </Modal>
    )

}



export default ShoppingBasketModal;