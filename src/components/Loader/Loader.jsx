import React from 'react';
import {useSelector} from 'react-redux';
import {RingLoader} from 'react-spinners';
import { selectIsAnyLoading } from '../../redux/globalSelectors/globalSelectors.js';

const Loader = () => {
    const isLoading = useSelector(selectIsAnyLoading);
    const lightGreen = getComputedStyle(document.documentElement).getPropertyValue('--green').trim();

    const width = window.innerWidth;
    const loaderSize = width < 768 ? 60 : width < 1440 ? 80 : 120;

    if (!isLoading) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <RingLoader color={lightGreen} size={loaderSize}/>
        </div>
    );
};

export default Loader;
