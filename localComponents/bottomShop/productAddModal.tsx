import React, { useState } from "react";
import { Alert } from "react-native";
import {
    Box,
    Text,
    Center,
    Button,
    Input,
    TextArea,
    Toast,
    useToast,
    Pressable,
    Divider,
    Image
} from "../../components";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import { Plus } from "lucide-react-native";

import { Products, realmContext } from "../realm";
import ErrorMessageModal from "./errorMessageModal";

import { ProductAddModalProps } from "../../types";
import { ImageOrVideo } from "react-native-image-crop-picker";



const { useRealm } = realmContext;

function ProductAddModal({ products, visible, setVisible }: ProductAddModalProps): JSX.Element {

    products = products.sorted("_id");

    const [image, setImage] = useState<ImageOrVideo>();
    const pickPhoto = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => { setImage(image)
        }).catch(err => {});
    }

    const [errorVisible, setErrorVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [describe, setDescribe] = useState<string>('');

    const toast = useToast();
    const realm = useRealm();

    const addProduct = (): void => {

        if(name && image){
            realm.write(() => {
                realm.create('Products', {
                    _id: products && products[0] ? products[products.length - 1]._id + 1 : 0,
                    name: name,
                    describe: describe,
                    date: new Date().getTime(),
                    lastBuy: 0,
                    toBuy: 0,
                    purchases: 0,
                    image: image.path
                });
            });
            toast.show({
                placement: "top",
                duration: 10000,
                render: () => {
                    return (
                        <Toast>
                              <Toast.Title>
                                    Dodano {name}
                              </Toast.Title>
                        </Toast>
                    )
                }
            });
            setVisible(false);
            setName('');
            setDescribe('');
            setImage(undefined);

        }
        else{
            setErrorVisible(true);
        }
    }

    return(
        <Modal isVisible={visible}
        onSwipeComplete={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        swipeDirection='down'
        animationOut={'slideOutDown'}
        hideModalContentWhileAnimating={true}
    >
        <Box bg='$white'
            borderRadius={10}
            p={10}
        >
            <Center
                mx={10}
            >
                <Text size='2xl'>
                    Dodaj Produkt
                </Text>
                <Pressable onPress={pickPhoto}
                    mt={20}
                >
                    <Box bg="#d6c6f0ee"
                        w={100}
                        h={100}
                        borderRadius={5}
                        overflow="hidden"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {
                            image ?
                                <Image h={100}
                                    w={100}
                                    source={{
                                        uri: image.path
                                    }}
                                /> :
                                <Plus color="white" size={50} />
                        }
                    </Box>
                </Pressable>
                <Divider mt={15}
                    h={2}
                    w='15%'
                    bg="$black"
                />
                <Input mt={20}>
                    <Input.Input
                        placeholder='Nazwa'
                        value={name}
                        onChangeText={setName}
                    />
                </Input>
                <TextArea mt={10}>
                    <TextArea.Input
                        placeholder='Tutaj wpisz opis swojego produktu'
                        value={describe}
                        onChangeText={setDescribe}
                    />
                </TextArea>
                <Button onPress={addProduct}
                    bg="#8512e3"
                    w={80}
                    h={45}
                    mt={20}
                    flexDirection='column'
                >
                    <Button.Text>
                        Dodaj
                    </Button.Text>
                    <Box mt={5}
                        w={30}
                        h={3}
                        bg="white"
                        borderRadius="$full"
                    />
                </Button>

            </Center>
        </Box>
        <ErrorMessageModal visible={errorVisible}
            setVisible={setErrorVisible}
        />
    </Modal>
    )
}



export default ProductAddModal;