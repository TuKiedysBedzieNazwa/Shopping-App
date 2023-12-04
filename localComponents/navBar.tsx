import React, { useState } from "react";
import { Pressable } from "react-native";
import {
    Box,
    Button,
    Text,
    Center,
    Divider
} from "../components";
import LinearGradient from "react-native-linear-gradient";
import { Settings2, Filter } from "lucide-react-native";

import { NavBarProps } from '../types';


export default function NavBar({ navigation, filter, setFilter }: NavBarProps): JSX.Element {

    const filters: Array<{[key: string]: string}> = [
        {dbName: "name", name: "Nazwa"},
        {dbName: "lastBuy", name: "Ostatni zakup"},
        {dbName: "toBuy", name: "Do kupienia"},
        {dbName: "purchases", name: "Ilość Kupień"}
    ];
    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

    return (
        <LinearGradient style={{
                zIndex: 1,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                position: "absolute",
                left: 0,
                top: 0,
                right: 0
            }}
            colors={["#6712e3","#cd9587"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
            <Box initial={{
                    opacity: 0,
                    height: 20
                }}
                animate={{
                    opacity: areFiltersOpen ? 1 : 0,
                    height: areFiltersOpen ? 130 : 20,
                    y: areFiltersOpen ? 0 : -70
                }}
                transition={{
                    type: "spring"
                }}
                // bg="green"
            >
                <Text color="white"
                    fontSize={20}
                    m={20}
                >
                    Sortowanie:
                </Text>
                <Center flexDirection="row"
                    justifyContent="space-evenly"
                    position="relative"
                >
                    {
                        filters.map((value: {[key: string]: string}, index: number) =>
                            <Pressable key={index}
                                onPress={() => setFilter(value.dbName)}
                            >
                                <Text color="$white" >
                                    {value.name}
                                </Text>
                                <Center>
                                    <Box w="70%"
                                        h={3}
                                        bg="white"
                                        mt={5}
                                        borderRadius="$full"
                                        animate={{
                                            y: filter === value.dbName ? -30 : 0
                                        }}
                                        transition={{
                                            type: "spring"
                                        }}
                                    />
                                </Center>
                            </Pressable>
                        )
                    }
                </Center>
            </Box>

            <Box display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                flexDirection="row"
                pb={10}
                initial={{
                    height: 0
                }}
                animate={{
                    height: 70
                }}
                transition={{
                    type: 'spring',
                    duration: 150
                }}
                // bg="yellow"
            >
                <Box ml={15}
                    h={60}
                    // bg="green"
                >
                    <Text color="$white"
                    >
                        LOGO
                    </Text>
                </Box>

                <Center flexDirection="row"
                    h={60}
                    // bg="green"
                >
                    <Button variant='outline'
                        borderColor="$white"
                        display="flex"
                        flexDirection="column"
                        w={50}
                        onPress={() => setAreFiltersOpen(val => !val)}
                    >
                        <Filter color='white' size={30} strokeWidth={2.5} />
                        <Box bg="$white"
                            borderRadius="$full"
                            mt={8}
                            h={3}
                            w={30}
                            animate={{
                                y: areFiltersOpen ? -50 : 0
                            }}
                        />
                    </Button>
                    <Button variant='outline'
                        borderColor="$white"
                        display="flex"
                        flexDirection="column"
                        w={50}
                        mr={15}
                        onPress={() => navigation.navigate('Options')}
                    >
                        <Settings2 color='white' size={30} strokeWidth={2.5} />
                        <Box bg="$white"
                            borderRadius="$full"
                            mt={8}
                            h={3}
                            w={30}
                        />
                    </Button>
                </Center>

            </Box>
        </LinearGradient>
    )
}