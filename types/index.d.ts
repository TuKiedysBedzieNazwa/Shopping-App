import { COLORMODES, StateIds } from "@dank-style/react/lib/typescript/types";
import type {
    NativeStackScreenProps,
    NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { Products } from "../localComponents/realm";

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

interface NavBarProps {
    navigation: NativeStackNavigationProp<RootNativeStackParamList, "Home", undefined>,
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

interface RenderProductsProps {
    products: Realm.Results<Products>,
    navigation: NativeStackNavigationProp<RootNativeStackParamList, "Home", undefined>,
    route: RouteProp<RootNativeStackParamList, "Home">,
    values: number[],
    setValues: React.Dispatch<React.SetStateAction<number[]>>
}

interface ShoppingBasketModalProps {
    products: Realm.Results<Products>,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    values: number[],
    setValues: React.Dispatch<React.SetStateAction<number[]>>
}

interface ProductAddModalProps {
    products: Realm.Results<Products>,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
