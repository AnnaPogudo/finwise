import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./welcomePage.module.scss";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src="/FinWiseLightLogo.svg"
          alt="FinWise logo"
          className={styles.logo}
        />

        <h2 className={styles.title}>FinWise</h2>

        <p className={styles.description}>
          — это интуитивное приложение для тех, кто хочет перестать гадать,
          куда уходят деньги. Мы помогаем ставить финансовые цели, следить за
          расходами и находить возможности для накоплений, чтобы ваши мечты
          становились ближе.
        </p>

        <div className={styles.buttons}>
          <Button
            className={styles.buttonSignIn}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>

          <Button
            className={styles.buttonSignUp}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
