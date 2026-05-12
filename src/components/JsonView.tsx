import styles from "../css/JsonView.module.css";

const JsonView = () => {
	return (
		<div className={styles.container}>
			<p className={styles.level1}>{"{"}</p>
				<p className={styles.level2}><span className={styles.string}>"aboutMe"</span>: {"{"}</p>
					<p className={styles.level3}>e</p>
					<p className={styles.level3}>e</p>
				<p className={styles.level2}>{"},"}</p>
			<p className={styles.level1}>{"}"}</p>
		</div>
	);
}

export default JsonView;