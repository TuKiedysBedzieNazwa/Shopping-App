import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { ArrowBigLeftDash } from "lucide-react-native";
import {
    ScrollView,
    Text,
    Button,
    Center,
    Box
} from '../../components/core';

import { COLORMODES } from "@dank-style/react/lib/typescript/types";
import { OptionsProps } from "../../types";



interface testProp {
    width: number | undefined,
    height: number | undefined,
    uri: string | undefined
}

function Options({ navigation, route }: OptionsProps): JSX.Element {

    const [test, setTest] = useState<testProp>();
    const [string, setString] = useState<string>();

    return(
        <ScrollView>
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
            <Text
                textAlign="center"
                size='xl'
                mt={20}
            >
                Opcji nie ma,{'\n'}
                może kiedyś będą
            </Text>

            <Box display='flex'
                alignItems="center"
                justifyContent="center"
                h={680}
                w='100%'
            >
                {/* <Button onPress={() => {
                        setTest({
                            width: 1,
                            height: 1,
                            uri: undefined
                        });
                    }}
                >
                    <Button.Text>
                        set
                    </Button.Text>
                </Button>

                <Button onPress={() => {
                        setString(test!.uri);
                    }}
                    mt={15}
                >
                    <Button.Text>
                        set String
                    </Button.Text>
                </Button> */}
                <Text>
                    {JSON.stringify(test, null, 2)}
                    {'\n'}
                    {JSON.stringify(string, null, 2)}
                </Text>
            </Box>


        </ScrollView>
    )
}



export default Options