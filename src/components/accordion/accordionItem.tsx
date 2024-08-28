import React, {useEffect, useState} from "react";
import styles from './accordion.module.css';

export default function AccordionItem({
                                  id,
                                  children,
                                  collapsible,
                                  activeAccordionItem,
                                  handleAccordionItemClick,
                              }) {
    return (
        <div className={styles['accordionItem']}>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    id,
                    collapsible,
                    activeAccordionItem,
                    handleAccordionItemClick,
                });
            })}
        </div>
    );
};
