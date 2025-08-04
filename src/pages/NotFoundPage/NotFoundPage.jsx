import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import styles from "./NotFoundPage.module.css";
import logo from "../../assets/img/sprite.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.wrapper}>
      <div className={styles.logo}>
        <svg fill="var(--green)">
          <use href={`${logo}#icon-logo`} />
        </svg>
      </div>
      <Typography variant="h3" className={styles.heading}>
        Page not Found
      </Typography>
      <Typography variant="body1" className={styles.text}>
        Opps! The page you were looking for doesn't exist. <br />
        You may have misstyped the address or the page may have been moved.
      </Typography>
      <Button className={styles.button} onClick={() => navigate("/")}>
        Back home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
