import * as yup from "yup";

function handleValidationErrors(schema: yup.ObjectSchema<any>, data: any) {
    try {
        schema.validateSync(data, {abortEarly: false});
        return true;
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return error.inner.reduce((acc: any, err: any) => {
                acc[err.path] = err.message;
                return acc;
            }, {});
        }
        return false;
    }
}

export default handleValidationErrors;
