import { COLORMODES } from "@dank-style/react/lib/typescript/types";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


type RootNativeStackParamList = {
    Home: undefined,
    Options: undefined
};

type HomeProps = NativeStackScreenProps<RootNativeStackParamList, 'Home'>
type OptionsProps = NativeStackScreenProps<RootNativeStackParamList, 'Options'>