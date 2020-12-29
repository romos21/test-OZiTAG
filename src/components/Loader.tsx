import '../styles/components/Loader.css';
import React from 'react';

interface propsObj {
    isShowLoader: boolean,
}

const Loader: React.FunctionComponent<propsObj> = props => {

    const {isShowLoader} = props;

    return (
        isShowLoader ?
            <section className='loader-absolute-area'>
                <div className="lds-hourglass"/>
            </section>
            : null
    );
}

export default Loader;
