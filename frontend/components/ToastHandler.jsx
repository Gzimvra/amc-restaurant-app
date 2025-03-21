import Toast from 'react-native-toast-message';

const ToastHandler = (type, text1, text2) => {
    Toast.show({
        type: type,
        position: 'top',
        text1: text1,
        text2: text2,
        text1Style: { fontSize: 16, fontWeight: 'bold', whiteSpace: 'normal', flexWrap: 'wrap' },
        text2Style: { fontSize: 14, whiteSpace: 'normal', flexWrap: 'wrap' },
    });
};

export default ToastHandler;
