import Toast from "react-native-toast-message";
import { FC } from "react";
import { IToast } from "../../../@types/IToast";


/**
 * @param message
 * @returns void
 */
const ToastError= ({message}: IToast): void => {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `An error occurred : ${message}`
    });
}

export default ToastError;
