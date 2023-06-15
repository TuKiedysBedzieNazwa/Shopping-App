import { COLORMODES } from "@dank-style/react/lib/typescript/types";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Products } from "../local components/realm";


type RootNativeStackParamList = {
    Home: undefined,
    Options: undefined,
    ProductView: {
        product: Products
    }
};

type HomeProps = NativeStackScreenProps<RootNativeStackParamList, 'Home'>
type OptionsProps = NativeStackScreenProps<RootNativeStackParamList, 'Options'>
type ProductViewProps = NativeStackScreenProps<RootNativeStackParamList, 'ProductView'>

