import styles from './accordion.module.css';

export default function AccordionBody({ id, activeAccordionItem, children }) {
    return (
        <>
            {activeAccordionItem === id && (
                <div className={styles['accordionBody']}>{children}</div>
            )}
        </>
    );
};
