import React, {useState, useRef} from 'react';
import '../styles/components/InputRowComponent.css';
import classnames from 'classnames';
import EyeIcon from "./EyeIcon";
import {dataToSend} from "../constants/interfaces";

interface propsObject {
    type: string,
    name: string,
    regExp: RegExp,
    isShowPassword?: boolean,
    changeIsShowPassword?: React.Dispatch<React.SetStateAction<boolean>>,
    formToSend: dataToSend,
    setFormToSend: React.Dispatch<React.SetStateAction<dataToSend>>,
}

const InputRowComponent: React.FunctionComponent<propsObject> = props => {

    const {type, name, regExp, isShowPassword,changeIsShowPassword,formToSend,setFormToSend} = props;
    const [isValidInputValue, setIsValidInputValue] = useState<boolean>(false);
    const inputValueRef = useRef<any>(null);

    const changeInputValue = (event: React.ChangeEvent) => {
        event.preventDefault();
        setFormToSend({
            ...formToSend,
            [inputValueRef.current.name]: inputValueRef.current.value,
            }
        );
        if (regExp.test(inputValueRef.current.value)) {
            setIsValidInputValue(true);
        } else {
            setIsValidInputValue(false);
        }
    }

    return (
        <section className='input-row-sec'>
            <label className='label-el'>{name}:</label>
            <input
                type={type}
                name={name}
                onChange={changeInputValue}
                ref={inputValueRef}
                className={classnames('input-area', {
                    'is-valid': isValidInputValue,
                    'not-valid': !isValidInputValue,
                })}
            />
            {
                isShowPassword!==undefined && changeIsShowPassword!==undefined?
                <EyeIcon
                    isShowPassword={isShowPassword}
                    changeIsShowPassword={changeIsShowPassword}
                />
                : null
            }
        </section>
    );
}

export default InputRowComponent;
