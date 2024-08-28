'use client';
import {useEffect, useState} from "react";
import Image from "next/image";
import styles from './lang-selector.module.css';
import css from "@emotion/css";

const langsMap = (locale) => {
    // @ts-ignore
    return {
        es: 'br'
    }[locale] || locale;
};

export default function LangSelector({builderState, Lang, darkMode}) {
    const [currentLang, setCurrentLang] = useState();
    const [items, setItems] = useState();
    const [open, setOpen] = useState(false);
    const current = langsMap(builderState.state.locale.slice(0, 2));
    const data = Lang.filter(lang => lang.slug === current);
    useEffect(() => {
        if (data[0]) {
            setCurrentLang(data[0]);
            setItems(Lang);
        }
    }, [data, Lang]);
    return (
        <div className={`${styles.wrapper} ${darkMode ? styles.dark : styles.light}`}>
            {open ? (<DropDown items={items} currentLang={currentLang} />) : null}

            <div className={styles.selector} onClick={() => setOpen(prev => !prev)}>
                <div className={styles['container-inner']}>
                    <div className="Frame31223"
                         style={{justifyContent: 'flex-start', gap: 4, display: 'flex'}}>
                        <div style={{width: 14, height: 14, position: 'relative'}}>
                            {currentLang ? (
                                <img
                                    src={currentLang?.flag}
                                    width={14}
                                    height={14}
                                    alt="flag"
                                />
                            ) : null}
                        </div>
                        <div className={styles["current-label"]}>{currentLang?.label}</div>
                    </div>
                    <div className={styles['current-arrow']}>
                        {darkMode ? (
                            <ArrowDark />
                        ) : (
                            <ArrowLight />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DropDown({items = [], currentLang}) {
    return (
        <div className={styles['dropdown']}>
            <div className={styles['dropdown-inner']}>
                {items.map(item => (
                    <DropDownItem key={item.slug} item={item} isActive={currentLang.slug === item.slug} />
                ))}
            </div>
        </div>
    )
}

function DropDownItem({item, isActive}) {
    return (
        <div className={styles['dropdown-item']} style={{
            borderColor: isActive ? '#FF3D3D' : ''
        }} onClick={handleClick(item)}>
            <div className={styles['dropdown-item-in']}>
                <div className="FlagsRoundRussia" style={{width: 20, height: 20, position: 'relative'}}>
                    <img src={item.flag} alt="" />
                </div>
                <div className={styles["dropdown-label"]}>{item.fullLabel}</div>
            </div>
        </div>
    )
}

function handleClick(item) {
    return () => {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', item.slug);
        window.location.href = url.toString();
    };
}

function Circle() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame 31220">
                <circle id="Ellipse 1521" cx="10" cy="10" r="9" stroke="white" strokeOpacity="0.2" strokeWidth="2"/>
            </g>
        </svg>

    )
}

function Check() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="mobile2/20/check">
                <circle id="Ellipse 1519" cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path id="Vector 375 (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.3534 6.92525C14.6708 7.25852 14.6579 7.786 14.3247 8.10341L8.49996 13.6508L5.67525 10.9606C5.34197 10.6431 5.32911 10.1157 5.64651 9.78239C5.96392 9.44912 6.4914 9.43625 6.82467 9.75366L8.49996 11.3492L13.1752 6.89651C13.5085 6.57911 14.036 6.59197 14.3534 6.92525Z"
                      fill="white"/>
            </g>
        </svg>
    );
}

function ArrowLight() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
                d="M8.79289 5H3.20711C2.76165 5 2.53857 5.53857 2.85355 5.85355L5.64645 8.64645C5.84171 8.84171 6.15829 8.84171 6.35355 8.64645L9.14645 5.85355C9.46143 5.53857 9.23835 5 8.79289 5Z"
                fill="black"/>
        </svg>
    )
}

function ArrowDark() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none">
            <path
                d="M6.79289 0H1.20711C0.761654 0 0.53857 0.53857 0.853553 0.853553L3.64645 3.64645C3.84171 3.84171 4.15829 3.84171 4.35355 3.64645L7.14645 0.853553C7.46143 0.538571 7.23835 0 6.79289 0Z"
                fill="white"/>
        </svg>
    )
}

function getLocale(url: string = '') {
    return [url.split("-"), url.split("_")]
        .map((url) => url.at(-1))
        .filter(u => u !== url)
        .filter(Boolean)
        .pop()
}
