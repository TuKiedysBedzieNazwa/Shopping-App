import React from "react";
import { View } from "react-native";
import {
    Button,
    Box,
    Center,
    Text,
    Divider,
    Image
} from "../../components";
import { ArrowBigLeftDash } from "lucide-react-native";

import { realmContext } from "../realm";

import { ProductViewProps } from "../../types";



const { useRealm } = realmContext;

const dateFormatter = (inputDate: number): string => {

    if(inputDate === 0) return 'Nie kupiono';
    const date: Date = new Date(inputDate);

    const months = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień"
    ]

    return `${date.getHours()}:${date.getMinutes()}\n${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

const Row = ({ name, content }: {[key: string ]: string} ): JSX.Element => {
    return(
        <Box display='flex'
            justifyContent="space-around"
            flexDirection="row"
            mt={8}
        >
            <Box display='flex'
                justifyContent='center'
                w='40%'
            >
                <Text textAlign="center"
                    lineHeight={17}
                >
                    {name}
                </Text>
            </Box>
            <Text textAlign="center"
                lineHeight={17}
                w='40%'
            >
                {content}
            </Text>
        </Box>
    )
}

function ProductView({ navigation, route }: ProductViewProps): JSX.Element {

    const realm = useRealm();

    const deleteProduct = (): void => {
        realm.write(() => {
            realm.delete(route.params.product);
        });

        navigation.navigate('Home');
    }


    return(
        <Box w='100%'
            h='100%'
            bg='$white'
        >
            <Button variant='outline'
                position='absolute'
                top={20}
                left={25}
                w={45}
                h={45}
                zIndex={1}
                onPress={()=> navigation.navigate('Home')}
            >
                <ArrowBigLeftDash color="black" />
            </Button>

            <Center>
                <Box mt={70}
                    bg='$gray200'
                    w={200}
                    h={200}
                    borderRadius={10}
                    overflow='hidden'
                >
                    <Image w={200}
                        h={200}
                        source={{
                            uri: route.params.product.image
                        }}
                  />
                </Box>
                <Text size='xl'
                    textAlign='center'
                >
                    {route.params.product.name}
                </Text>
                <Text textAlign="center"
                    mx={10}
                >
                    {route.params.product.describe}
                </Text>

                <Divider mt={15}
                    h={2}
                    w='30%'
                    bg="$black"
                />
                <Box display='flex'
                    w='100%'
                    mt={45}
                >
                    <Row name='ID:'
                        content={route.params.product._id.toString()}
                    />
                    <Row name='Data Dodania:'
                        content={dateFormatter(route.params.product.date)}
                    />
                    <Row name='Data zakupu:'
                        content={dateFormatter(route.params.product.lastBuy)}
                    />
                    <Row name='Kupiono:'
                        content={`${route.params.product.purchases} razy`}
                    />
                </Box>
                <Button onPress={deleteProduct}
                    mt={50}
                    borderColor='$red800'
                    variant="outline"
                >
                    <Button.Text
                        color='$red800'
                    >
                        Usuń
                    </Button.Text>
                </Button>

            </Center>

            {/* <Text size="xs" lineHeight={13}>
                {JSON.stringify(route, null, 2)}
            </Text> */}
        </Box>
    )
}



export default ProductView;