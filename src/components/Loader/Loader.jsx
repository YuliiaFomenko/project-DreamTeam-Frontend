import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RingLoader} from 'react-spinners';
import {selectIsLoading} from "../../redux/auth/selectors.js";

const Loader = () => {
    const isLoading = useSelector(selectIsLoading);
    const lightGreen = getComputedStyle(document.documentElement).getPropertyValue('--green').trim();

    const loaderSize = useMemo(() => {
        const width = window.innerWidth;
        if (width < 768) return 60;
        if (width < 1440) return 80;
        return 120;
    }, []);

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
