import React, {useState} from 'react';
import '../styles/components/LoginFormPage.css';
import {loginInputs} from "../constants/forms";
import {dataToSend} from "../constants/interfaces";
import {useHistory} from 'react-router-dom';
import InputRowComponent from "./InputRowComponent";
import Loader from "./Loader";
import Error from "./Error";

const LoginFormPage: React.FunctionComponent = () => {

    const history = useHistory();

    const formToSendDefault: dataToSend = {
        email: '',
        password: '',
    }

    const [formToSend, setFormToSend] = useState<dataToSend>(formToSendDefault);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');

    const sendAuthData = async (event: React.MouseEvent) => {
        try {
            event.preventDefault();
            setIsShowLoader(true);
            for(let key in formToSend){
                const input=loginInputs.find(input=>input.name===key);
                if(input){
                    if(!input.regExp.test(formToSend[key])){
                        setErrMsg(`input data in ${key} row is not valid`);
                        setIsShowLoader(false);
                        return;
                    }
                }
            }
            const response = await fetch('https://tager.dev.ozitag.com/api/auth/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    ...formToSend,
                    clientId: 1,
                })
            });
            const responseJSON = await response.json();
            if (!responseJSON.data) {
                setErrMsg(responseJSON.message);
            } else {
                localStorage.setItem('accessToken', responseJSON.data.accessToken);
                history.push('/user');
            }
            setIsShowLoader(false);
        } catch (e) {
            console.log(e + ' message');
        }
    }

    return (
        <>
            <Loader isShowLoader={isShowLoader}/>
            <Error errMsg={errMsg}/>
            <form className='login-form'>
                {loginInputs.map(input => {
                    if (input.type === 'password') {
                        return (
                            <InputRowComponent
                                key={input.name}
                                type={isShowPassword ? 'text' : input.type}
                                name={input.name}
                                regExp={input.regExp}
                                isShowPassword={isShowPassword}
                                changeIsShowPassword={setIsShowPassword}
                                formToSend={formToSend}
                                setFormToSend={setFormToSend}
                            />
                        )
                    }
                    return (
                        <InputRowComponent
                            key={input.name}
                            type={input.type}
                            name={input.name}
                            regExp={input.regExp}
                            formToSend={formToSend}
                            setFormToSend={setFormToSend}
                        />
                    )
                })}
                <button onClick={sendAuthData} className='login-form-btn' type="submit">Send!</button>
            </form>
        </>
    );
}

export default LoginFormPage;
