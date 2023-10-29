import Card from 'react-bootstrap/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./ListStyle.module.css";

const ListStyle = ({imgUrl, alt, imgHeight, imgWidth, title, subtitle, nickname, date}) => {
    return (
      <div>
        <Card className={styles.listStyle} style={{borderRadius: '10px', marginBottom: "40px"}}>
          <CardMedia
                component="img"
                height={imgHeight}
                width={imgWidth}
                image={imgUrl}
                alt={alt}
                //사진 꽉채우기 css 
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  borderRadius:"10px 10px 0 0"
                }}
                />
          <CardHeader
            title={title}/>
              
          <CardContent className={styles.cardDetail}>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
            <hr/>
            <IconButton aria-label="user-icon" width="20px" height="20px">
              <AccountCircleIcon />
            </IconButton>
            {nickname}
            <div style={{textAlign : "right", fontSize : "12px", marginRight: "20px"}}>
              {date}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

export default ListStyle;