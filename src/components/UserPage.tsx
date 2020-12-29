import '../styles/components/UserPage.css';
import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import Popup from "./Popup";

const UserPage: React.FunctionComponent = () => {

    const history: any = useHistory();
    const accessToken = localStorage.getItem('accessToken');
    const [userInfo, setUserInfo] = useState<any>({name: '', email: ''});
    const [logOutPopup, setLogOutPopup] = useState<boolean>(false);
    const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');

    useEffect(() => {
        (async function fetchUserInfo() {
            try {
                setErrMsg('');
                setIsShowLoader(true);
                const response = await fetch('https://tager.dev.ozitag.com/api/tager/user/profile', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const responseJSON = await response.json();
                if(!responseJSON.data){
                    setErrMsg(responseJSON.message);
                } else {
                    setUserInfo({...responseJSON.data});
                }
                setIsShowLoader(false);
            } catch (e) {
                console.log(e);
            }
        }())
    }, [])

    const logOutConfirm = async (event: React.MouseEvent) => {
        try {
            event.preventDefault();
            setIsShowLoader(true);
            const response = await fetch('https://tager.dev.ozitag.com/api/tager/user/profile/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const responseJSON = await response.json();
            if (responseJSON.success) {
                localStorage.clear();
                history.push('/login');
            } else {
                setErrMsg(responseJSON.message);
            }
            setIsShowLoader(false);
        } catch (e) {
            console.log(e);
        }
    }

    const logOutCancel=(event: React.MouseEvent)=>{
        event.preventDefault();
        setLogOutPopup(false);
    }

    const logOut=()=>{
        setLogOutPopup(true);
    }

    return (
        <>
            <Popup
                isShowPopup={logOutPopup}
                confirmAction={logOutConfirm}
                cancelAction={logOutCancel}
            />
            <Loader isShowLoader={isShowLoader}/>
            <Error errMsg={errMsg}/>
            <section className='user-page'>
                <img className='user-avatar'
                     src='https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'/>
                <div className='user-info'>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                </div>
                <button
                    className='log-out-btn'
                    onClick={logOut}
                >log out
                </button>
                <div className='news-block'/>
                <div className='user-links-block'>
                    <p>FRIENDS</p>
                    <p>MESSAGES</p>
                    <p>IMAGES</p>
                    <p>MUSIC</p>
                    <p>VIDEOS</p>
                    <p>OTHER</p>
                </div>
            </section>
        </>
    );
}

export default UserPage;
