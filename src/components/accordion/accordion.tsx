import AccordionWrapper from "@/components/accordion/accordionWrapper";
import AccordionToggle from "@/components/accordion/accordionToggle";
import AccordionItem from "@/components/accordion/accordionItem";
import AccordionBody from "@/components/accordion/accordionBody";
import styles from './accordion.module.css';

export default function Accordion({items, title}) {
    return (
        <div className={styles["accordion"]}>
            <div className={styles.header}>{title}</div>
            <AccordionWrapper collapsible={true}>
                {items.map((item, index) => (
                    <AccordionItem id={index} key={`${index}-${item.title}`}>
                        <AccordionToggle>
                            <div>{item.title}</div>
                        </AccordionToggle>
                        <AccordionBody id={'1'} activeAccordionItem={'1'}><div>{item.text}</div></AccordionBody>
                    </AccordionItem>
                ))}
            </AccordionWrapper>
        </div>
    );
}
