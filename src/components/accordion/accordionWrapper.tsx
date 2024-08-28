import React, {useEffect, useState} from "react";
import styles from './accordion.module.css';

export default function AccordionWrapper({ defaultActiveKey, children, collapsible }) {
    const [activeAccordionItem, setActiveAccordionItem] = useState(defaultActiveKey);

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    collapsible,
                    activeAccordionItem,
                    handleAccordionItemClick: setActiveAccordionItem,
                });
            })}
        </div>
    );
};
