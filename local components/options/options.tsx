import React from "react";
import {
    View,
    Alert,
    Text
} from "react-native";
import { ScrollView } from "../../components/core";
import {
    Switch,
    Button
} from '../../components/core';

import { COLORMODES } from "@dank-style/react/lib/typescript/types";
import { OptionsProps } from "../../types";
import { ArrowBigLeftDash } from "lucide-react-native";


function Options({ navigation, route }: OptionsProps): JSX.Element {
    return(
        <ScrollView>
            <Button variant='outline'
                position='absolute'
                top={20}
                left={30}
                w={45}
                h={45}
                zIndex={1}
                onPress={()=> navigation.navigate('Home')}
            >
                <ArrowBigLeftDash color="black" />
            </Button>

            <Text>
                Options here {'\n'}
            </Text>
            <Text>
                {JSON.stringify(route, null, 2)}
            </Text>

        </ScrollView>
    )
}



export default Options