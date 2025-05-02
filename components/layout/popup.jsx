'use client';

import { useEffect } from 'react';

const Popup = () => {
    useEffect(() => {
        const overlay = document.getElementById('overlay');
        const popupBox = document.getElementById('popupBox');
        const closeBtn = document.getElementById('closeBtn');

        const showPopup = () => {
            overlay?.classList.remove('opacity-0', 'pointer-events-none');
            overlay?.classList.add('opacity-100', 'pointer-events-auto');
            popupBox?.classList.remove('opacity-0', 'scale-95');
            popupBox?.classList.add('opacity-100', 'scale-100');
        };

        const hidePopup = () => {
            overlay?.classList.add('opacity-0', 'pointer-events-none');
            overlay?.classList.remove('opacity-100', 'pointer-events-auto');
            popupBox?.classList.add('opacity-0', 'scale-95');
            popupBox?.classList.remove('opacity-100', 'scale-100');
        };

        const hasCookie = document.cookie.includes('uimonkCookie=uimonk');
        hasCookie ? hidePopup() : showPopup();

        const handleClose = () => {
            document.cookie = "uimonkCookie=uimonk; max-age=" + 60 * 60 * 24;
            if (document.cookie.includes('uimonkCookie=uimonk')) {
                hidePopup();
            } else {
                alert("Cookie not created");
            }
        };

        closeBtn?.addEventListener('click', handleClose);
        return () => closeBtn?.removeEventListener('click', handleClose);
    }, []);

    return (
        <div>
            <div
                id="overlay"
                className="w-screen h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 flex items-center justify-center z-[9999] transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none">
                <div
                    id="popupBox"
                    className="w-[80%] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-white bg-black p-6 flex items-center justify-center relative opacity-0 scale-95 transition-all duration-300 ease-out rounded-xl">
                    <button
                        id="closeBtn"
                        className="absolute top-3 right-3 z-50 h-8 w-8 flex justify-center text-white bg-gray-500 bg-opacity-40 rounded-full text-xl hover:scale-110 hover:bg-opacity-90 transition-transform duration-200 ease-in-out focus:outline-none select-none">
                        &times;
                    </button>
                    <h1 className="p-[15px]">
                        Admission Open (sample message)
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Popup;
