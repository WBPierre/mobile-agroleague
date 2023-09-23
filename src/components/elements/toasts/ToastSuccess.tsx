import Toast from "react-native-toast-message";
import { IToast } from "../../../@types/IToast";

/**
 * @param message
 * @returns void
 */
const ToastSuccess= ({message}: IToast): void => {
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message
    });
}

export default ToastSuccess;
