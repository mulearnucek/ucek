'use client';

import { useEffect } from 'react';
import Admission from '@/public/img/new-admission.jpg';
import Image from 'next/image';

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
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        };

        const hidePopup = () => {
            overlay?.classList.add('opacity-0', 'pointer-events-none');
            overlay?.classList.remove('opacity-100', 'pointer-events-auto');
            popupBox?.classList.add('opacity-0', 'scale-95');
            popupBox?.classList.remove('opacity-100', 'scale-100');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };

        const hasCookie = document.cookie.includes('uimonkCookie=uimonk');
        hasCookie ? hidePopup() : showPopup();

        const handleClose = () => {
            document.cookie = "uimonkCookie=uimonk; max-age=" + 60 * 30;
            if (document.cookie.includes('uimonkCookie=uimonk')) {
                hidePopup();
            } else {
                alert("Cookie not created");
            }
        };

        closeBtn?.addEventListener('click', handleClose);
        return () => {closeBtn?.removeEventListener('click', handleClose);
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';}
    }, []);

    return (
        <div>
            <div
                id="overlay"
                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none">
                <div
                    id="popupBox"
                    className="relative opacity-0 scale-90 transition-all duration-300 ease-out"
                    style={{
                        width: '90%',
                        maxWidth: '600px',
                        height: 'auto',
                        maxHeight: '100vh'
                    }}>
                    <div className="relative w-full" style={{
                        paddingBottom: '125%'
                    }}>
                        <a href="/admissions/btech">
                        <Image
                            src={Admission}
                            alt="NRI Admissions 2025 Open"
                            fill
                            className="object-contain rounded-xl"
                            sizes="(max-width: 768px) 80vw, 600px"
                            priority
                        />
                        </a>
                        <button
                            id="closeBtn"
                            className="absolute top-3 right-3 z-50 h-9 w-9 flex justify-center text-white bg-gray-700 bg-opacity-70 rounded-full text-2xl hover:bg-opacity-100 transition-all duration-200">
                            &times;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
