import Toast from "react-native-toast-message";
import { IToast } from "../../../@types/IToast";

/**
 * @param message
 * @returns void
 */
const ToastInfo = ({message}: IToast): void => {
    Toast.show({
        type: 'info',
        text1: 'Info',
        text2: message
    });
}

export default ToastInfo;
