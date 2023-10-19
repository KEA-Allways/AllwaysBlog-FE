import Card from 'react-bootstrap/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./ListStyle.module.css";

const ListStyle = ({title, subtitle, nickname}) => {
    return (
      <div className={styles.listStyle}>
        <Card style={{borderRadius: '10px', marginBottom: "30px"}}>
          <CardHeader
            title={title}/>
              
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
            <hr/>
            <IconButton aria-label="user-icon" width="20px" height="20px">
              <AccountCircleIcon />
            </IconButton>
            {nickname}
          </CardContent>
        </Card>
      </div>
    );
  };

export default ListStyle;