import React, {useCallback, useContext, useEffect} from 'react';
import styles from './Toast.module.css'

const Toast = ({toastList, position, setList}) => {

	const deleteToast = useCallback( id => {
		const toastListItem = toastList.filter( e => e.id !== id)
		setList(toastListItem)
	}, [toastList]);

	useEffect ( () => {
	    const interval = setInterval( () => {
				if (toastList.length) {
					deleteToast(toastList[0].id)
				}
	    }, 2000);
			return () => {
				clearInterval(interval)
			}
	},[toastList])

	return (
			<div className={`${styles.container} ${styles[position]}`}>
				{toastList.map( (toast , i) => (
					<div key={i}
					     style={{backgroundColor:toast.backgroundColor}}
					     className={`${styles.notification} ${styles.toast} ${styles[position]}`}
					>
						<button onClick={() => deleteToast(toast.id)}>X</button>
						<div>
							<p className={styles.title}>{toast.title}</p>
							<p className={styles.description}>{toast.description}</p>
						</div>
					</div>
				))}
			</div>
	);
};

export default Toast;