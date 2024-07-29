'use client';
import {useEffect, useState} from "react";
import { setCookie, getCookie } from 'cookies-next';

import css from './cookie-banner.module.css';
import {cookieAcceptKey} from "@/config";

const oneDay = 24 * 60 * 60 * 1000;
const expiresDays = 182;

export default function CookieBanner({children, buttonLabel}) {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const cookie = getCookie(cookieAcceptKey);
        setToggle(Boolean(cookie));
    }, []);

    return (
        <div id="cookie-notice" className={css['cookie-notice']} style={{display: !toggle ? 'flex' : 'none'}}>
            <div className={css['cookie-notice-text-container']}>
                {children}
            </div>
            <button type="button" onClick={handleClick(setToggle)} className={css['cookie-btn']}>
                <span className="v-btn__content">{buttonLabel}</span>
            </button>
        </div>
    );
}

function handleClick(setToggle: Function) {
    return () => {
        setToggle(true);
        setCookie(cookieAcceptKey, JSON.stringify(true), { expires: new Date(Date.now() + oneDay * expiresDays) });
    };
}
