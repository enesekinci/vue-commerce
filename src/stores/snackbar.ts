import {ref} from "vue";

const snackbarStatus = ref(false);
const snackbarMessage = ref('');
const snackbarType = ref('success');

function showSnackbar(message: string, type: string = 'success') {
    snackbarMessage.value = message;
    snackbarType.value = type;
    snackbarStatus.value = true;

    closeSnackbar();
}

function showSuccessSnackbar(message: string) {
    console.log('showSuccessSnackbar',message)
    showSnackbar(message, 'success');
}

function showErrorSnackbar(message: string) {
    if (typeof message === 'object') {
        message = Object.values(message).join('<br/>');
    }
    showSnackbar(message, 'error');
}

function closeSnackbar(timeout: number = 3000) {
    setTimeout(() => {
        snackbarStatus.value = false;
        snackbarMessage.value = '';
    }, timeout);
}

export {
    snackbarStatus,
    snackbarMessage,
    snackbarType,
    showSnackbar,
    showSuccessSnackbar,
    showErrorSnackbar,
    closeSnackbar
};