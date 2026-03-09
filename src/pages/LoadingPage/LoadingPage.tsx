import styles from './loadingPage.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img 
          src="/FinWiseLogo.svg" 
          alt="Finwise Logo" 
          className={styles.logo}
        />
        <h2 className={styles.title}>FinWise</h2>
        <div className={styles.spinner}>
          <div className={styles.spinnerCircle}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;