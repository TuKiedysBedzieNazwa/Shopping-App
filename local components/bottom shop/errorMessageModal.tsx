import React from "react";
import {
    Box,
    Text,
    Center,
    Button
} from "../../components";
import Modal from "react-native-modal";



interface props {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function ErrorMessageModal({visible, setVisible}: props): JSX.Element {

    return(
        <Modal isVisible={visible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            animationInTiming={200}
            backdropOpacity={0.05}
            backdropColor='white'
        >
            <Box bg='$error400'
                borderRadius={10}
                p={20}
                mx={30}
            >
                <Text style={{textAlign: 'center', color: 'white'}}>
                    Nazwa, Opis i zdjęcie nie mogą być puste
                </Text>
                <Center>
                    <Button onPress={() => setVisible(false)}
                        mt={20}
                        borderColor='$red900'
                        bg='$white'
                        opacity={0.9}
                    >
                        <Button.Text
                            color='$red900'
                        >
                            Okej
                        </Button.Text>
                    </Button>
                </Center>
            </Box>
        </Modal>
    )

}



export default ErrorMessageModal;