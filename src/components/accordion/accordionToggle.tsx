import classes from "./accordion.module.css";
import styles from "@/components/lang-selector/lang-selector.module.css";

export default function AccordionToggle ({
                             id,
                             children,
                             collapsible,
                             activeAccordionItem,
                             handleAccordionItemClick,
                         }) {
    return (
        <div
            onClick={() =>
                collapsible && activeAccordionItem === id
                    ? handleAccordionItemClick(null)
                    : handleAccordionItemClick(id)
            }
            className={`${classes['accordionToggle']} ${activeAccordionItem === id ? classes['accordionToggleActive'] : ''}`}
        >
            <ArrowDown />
            {children}
        </div>
    );
};

function ArrowDown() {
    return (
        <span className={classes['arrow']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
            <g opacity="0.8">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.376 20.296C13.984 20.6896 13.984 21.3278 14.376 21.7214L22.909 30.2894C23.2999 30.6819 23.9353 30.6819 24.3262 30.2894L32.8592 21.7214C33.2512 21.3278 33.2512 20.6896 32.8592 20.2961C32.4672 19.9025 31.8317 19.9025 31.4397 20.2961L23.6176 28.1502L15.7955 20.2961C15.4035 19.9025 14.768 19.9025 14.376 20.296Z"
                      fill="white"/>
            </g>
        </svg>
        </span>
    );
}
