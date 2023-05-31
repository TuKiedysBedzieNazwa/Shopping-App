import React, { useState, useRef } from 'react';
import {
    Alert,
    Text,
    View
} from 'react-native';
import {
    Button,
    Input,
    Box,
    Center
} from '../../components/core';
import { Plus } from 'lucide-react-native';
import Modal from 'react-native-modal';



import Realm from 'realm';
import { createRealmContext } from '@realm/react';



function Shop(): JSX.Element {




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
    
    // const realm = useRealm();
    




    const [shopVisible, setShopVisible] = useState<boolean>(false);
    const [addVisible, setAddVisible] = useState<boolean>(false);

    const [input1, setInput1] = useState<string>('');

    return (
        // <RealmProvider>
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
                    >
                        <Plus color='#0077E6' size={22} />
                    </Button>
                </Center>

                <Modal isVisible={shopVisible}
                    onSwipeComplete={() => setShopVisible(false)}
                    swipeDirection='down'
                >
                    <Box bg='white'
                        borderRadius={10}
                        p={10}
                        position='absolute'
                        bottom={10}
                        left={0}
                        right={0}
                    >
                        <Text>
                            shop
                        </Text>
                        <Center>
                            <Button onPress={() => {
                                // realm.write(() => {
                                //     realm.create('Test', {
                                //         name: "hej jestem testem",
                                //         _id: new Realm.BSON.ObjectId()
                                //     })
                                // })
                            }}>
                                <Button.Text>
                                    Już kupione
                                </Button.Text>
                            </Button>
                        </Center>
                    </Box>
                </Modal>

                <Modal isVisible={addVisible}
                    onSwipeComplete={() => setAddVisible(false)}
                    swipeDirection='down'
                >
                    <Box bg='white'
                        borderRadius={10}
                        p={10}
                    >
                        <Input mx={20}>
                            <Input.Input
                                onChangeText={setInput1}
                                value={input1}
                            />
                        </Input>
                        <Input mx={20}
                            mt={10}
                        >
                            <Input.Input />
                        </Input>
                        <Input mx={20}
                            mt={10}
                        >
                            <Input.Input />
                        </Input>
                        <Center mt={20}>
                            <Button onPress={() => Alert.alert(JSON.stringify(
                                'huh'
                            ))}

                            >
                                <Button.Text>
                                    Dodaj
                                </Button.Text>
                            </Button>
                        </Center>
                    </Box>
                </Modal>
            </Box>
        // </RealmProvider>
    )
}



export default Shop;