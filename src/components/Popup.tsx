import '../styles/components/Popup.css';
import React from 'react';

interface propsObj {
    isShowPopup: boolean,
    confirmAction?: (event: React.MouseEvent)=>void,
    cancelAction?: (event: React.MouseEvent)=>void,
}

const Popup: React.FunctionComponent<propsObj> = props => {

    const {isShowPopup,confirmAction,cancelAction} = props;

    return (
        isShowPopup ?
            <section className='log-out-popup-sec'>
                <div className='log-out-popup-menu'>
                    <p className='log-out-popup-msg'>Are You Sure To Log Out?</p>
                    <button className='log-out-popup-btn yes' onClick={confirmAction}>Yes</button>
                    <button className='log-out-popup-btn no' onClick={cancelAction}>No</button>
                </div>
            </section>
            : null
    );
}

export default Popup;
