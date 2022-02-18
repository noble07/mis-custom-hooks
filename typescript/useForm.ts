import { useState } from 'react'

export const useForm = <T>(initialState: T): [T, (e: React.ChangeEvent<HTMLInputElement>) => void, (newFormState?: T) => void] =>  {
    
    const [values, setValues] = useState<T>(initialState);

    const reset = ( newFormState = initialState ) => {
        setValues(newFormState);
    }

    const handleInputChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {

        setValues({
            ...values,
            [target.name]: target.value
        });

    }

    return [values, handleInputChange, reset];

}