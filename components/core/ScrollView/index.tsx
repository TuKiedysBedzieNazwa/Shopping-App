import { styled } from "../styled";
import { ScrollView as Scroll} from "react-native";


export const ScrollView = styled(
    Scroll,
    {
        'bg': '$white',
        '_dark': {
            'bg': '$trueGray800'
        }
    }
)