import Image from 'next/image'
import {useState} from "react";

import icon from './copy-icon.svg';
import styles from './copy-promocode.module.css'



export default function CopyPromocode({title, promocode, copied, helpText}) {
    const [text, setText] = useState(helpText);
    return (
        <div className={styles["promo-code"]} onClick={() => {
            setText(copied);
            navigator.clipboard.writeText(promocode)
        }} onMouseLeave={() => setText(helpText)}>
            <div className={styles['helper-text']}>{text}</div>
            <div className={`${styles["code-field"]} text-editable`}>
                {title}: <span className={`${styles["code"]} get-url-promocode`}>{promocode}</span>
            </div>
            <button className={styles['copy-btn']} type="button">
                <Image
                    src={icon}
                    width={32}
                    height={32}
                    alt="copy"
                />
            </button>
        </div>
    );
}
