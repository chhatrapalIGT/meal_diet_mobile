import Toast from "react-native-toast-message";
// import React from 'react'

const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        position: "top",
    });
    return null
};
export default  showToast 