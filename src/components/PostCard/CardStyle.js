import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./CardStyle.module.css";
import { CardActionArea } from '@mui/material';

const CardStyle = ({imgUrl, alt, imgHeight, title, subtitle, nickname}) => {
    return (
      <div className={styles.cardStyle}>
        <Card style={{borderRadius: '10px'}}>
          <CardActionArea>
          <CardMedia
            component="img"
            height={imgHeight}
            image={imgUrl}
            alt={alt}/>
              
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
            <hr/>
            <IconButton aria-label="user-icon" width="20px" height="20px">
              <AccountCircleIcon />
            </IconButton>
            {nickname}
          </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  };

  export default CardStyle;


