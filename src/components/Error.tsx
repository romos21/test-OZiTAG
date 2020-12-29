import '../styles/components/Error.css';
import React from 'react';

interface propsObj {
    errMsg: string,
}

const Loader: React.FunctionComponent<propsObj> = props => {

    const {errMsg} = props;

    return (
        errMsg ?
            <div className='error-block'>{errMsg}</div>
            : null
    );
}

export default Loader;
