import React, { ReactNode } from "react";

import styles from './modal.module.css';

export default function ModalText({ children }: { children: ReactNode }) {
	return (
		<div id="modal1" className={styles.overlay}>
			<a className={styles.cancel} href="#"></a>
			<div className={styles.modal}>
				<a href="#" className={styles.close}>x</a>
				<div className={styles.content}>
					<div>{children}</div>
				</div>
			</div>
		</div>
	)
}
