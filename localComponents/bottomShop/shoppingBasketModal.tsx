import React, { useState, useRef, useEffect } from "react";
import { Pressable, Dimensions } from "react-native";
import {
    Box,
    Center,
    Button,
    Text,
    Divider,
    Image,
    ScrollView
} from "../../components";
import Modal from "react-native-modal";
import { Plus, Minus, Check } from "lucide-react-native";

import { realmContext, Products } from "../realm";

import { ShoppingBasketModalProps } from "../../types";


const cloneDB = (products: Realm.Results<Products>): boolean[] => {
    let arr=[]
    for(let i=0; i< products.length; i++){
        arr.push(false);
    }
    return arr
}

const { useRealm } = realmContext;

function ShoppingBasketModal({ products, visible, setVisible, values, setValues }: ShoppingBasketModalProps): JSX.Element {

    const realm = useRealm();

    const [areBought, setAreBought] = useState<boolean[]>(cloneDB(products));

    useEffect(() => {
        setAreBought(cloneDB(products));
    }, [products.length]);

    const closeModal = (): void => {
        setVisible(false);
        realm.write(() => {
            for(const product of products){
                if(product.toBuy !== values[product._id])
                    product.toBuy = values[product._id];
            }
        });
    }

    return(
        <Modal isVisible={visible}
            onBackdropPress={closeModal}
            hideModalContentWhileAnimating={true}
        >
            <ScrollView position="absolute"
                bottom={0}
                left={10}
                right={10}
                borderRadius={10}
                maxHeight={Dimensions.get('window').height - 60}
            >
                <Center bg="$white"
                    m={10}
                >
                    <Text fontSize="$2xl"
                        my={20}
                    >
                        Koszyk
                    </Text>
                    <Divider
                        bg="$black"
                        mb={20}
                        h={1.5}
                        w="60%"
                    />
                    {
                        products.map((product, index) => {
                            if(!values[product._id]){
                                if(products.length - 1 === index && values.reduce((a, b) => Math.max(a, b)) === 0)
                                    return <Text my={20} key={index}> Koszyk jest pusty </Text>;
                                return ;
                            }

                            return (
                                <Box key={product._id}
                                    display='flex'
                                    flexDirection='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    w="85%"
                                    mt={10}
                                >
                                    <Pressable style={{
                                            borderRadius: 10,
                                            overflow: "hidden",
                                            height: 75
                                        }}
                                        onPress={() => {
                                            const next = areBought.map((val, boughtIndex) => {
                                                if(index == boughtIndex) return !val
                                                return val
                                            });
                                            setAreBought(next);
                                        }}
                                    >
                                        <Image w={75}
                                            h={75}
                                            source={{
                                                uri: product.image
                                            }}
                                        />
                                        <Box bg="$green700"
                                            w={75}
                                            h={75}
                                            position="relative"
                                            top={-75}
                                            initial={{
                                                opacity: 0
                                            }}
                                            animate={{
                                                // @ts-ignore
                                                opacity: areBought[index] ? 0.6 : 0
                                            }}
                                        />
                                        <Center position="relative"
                                            w={75}
                                            h={75}
                                            top={-150}
                                            initial={{
                                                y: 0
                                            }}
                                            animate={{
                                                // @ts-ignore
                                                y: areBought[index] ? 0 : 75
                                            }}
                                            transition={{
                                                type: "spring",
                                                damping: 15,
                                                stiffness: 200
                                            }}
                                        >
                                            <Check color="white" size={75} />
                                        </Center>
                                    </Pressable>
                                    <Box display='flex'
                                        flexDirection='row'
                                        justifyContent='space-evenly'
                                    >
                                        <Button onPress={() => {
                                                const next = values.map((val, index) => {
                                                    if(product._id === index){
                                                        return ++val;
                                                    }
                                                    else return val;
                                                });
                                                setValues(next);
                                            }}
                                            bg="#d6c6f0"
                                            borderRadius={5}
                                            w={40}
                                            h={40}
                                        >
                                            <Plus color="black" />
                                        </Button>
                                        <Center w={50} >
                                            <Text fontSize={20}>
                                                {values[product._id]}
                                            </Text>
                                        </Center>
                                        <Button onPress={() => {
                                                const next = values.map((val, index) => {
                                                    if(product._id === index && val){
                                                        return --val;
                                                    }
                                                    else return val;
                                                });
                                                setValues(next);
                                            }}
                                            bg="#d6c6f0"
                                            borderRadius={5}
                                            w={40}
                                            h={40}
                                        >
                                            <Minus color="black" />
                                        </Button>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                    <Divider
                        bg="$black"
                        mt={30}
                        mb={100}
                        h={1.5}
                        w="60%"
                    />
                </Center>
            </ScrollView>

            <Center position="absolute"
                bottom={20}
                left={60}
                right={60}
                py={20}
                borderRadius={10}
                display="flex"
                flexDirection="row"
                bg="#ffffffdb"
            >
                <Button onPress={() => {
                        realm.write(()=> {
                            for(const product of products){
                                if(values[product._id]){
                                    product.purchases += values[product._id];
                                    product.lastBuy = new Date().getTime();
                                }
                                if(product.toBuy){
                                    product.toBuy = 0;
                                }
                            }
                        });
                        let arr: number[] = [];
                        for(const product of products){
                            arr[product._id] = 0;
                        }
                        setValues(arr);
                        setVisible(false);
                    }}
                    bg="#8512e3"
                    w={80}
                    h={45}
                    flexDirection='column'
                >
                    <Button.Text>
                        Kup
                    </Button.Text>
                    <Box mt={5}
                        w={30}
                        h={3}
                        bg="white"
                        borderRadius="$full"
                    />
                </Button>

                <Button onPress={closeModal}
                    ml={15}
                    variant='outline'
                    w={100}
                    h={45}
                    flexDirection='column'
                >
                    <Button.Text color="#8512e3" >
                        Schowaj
                    </Button.Text>
                    <Box mt={5}
                    w={30}
                    h={3}
                    bg="#8512e3"
                    borderRadius="$full"
                    />
                </Button>

            </Center>

        </Modal>
    )

}



export default ShoppingBasketModal;