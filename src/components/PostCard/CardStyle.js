import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions"
import { Avatar, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./CardStyle.module.css";

const CardStyle = ({imgUrl, alt, imgHeight,imgWidth, title, subtitle, nickname, date,opacityValue,profile, usericon}) => {
  return (
        <Card className={styles.cardStyle}
          sx={{ transition: "all 0.5s ease",
          borderRadius:"10px", 
          opacity:opacityValue, 
          marginBottom:"40px", 
          marginRight: "10px", 
          boxShadow:"1px 1px 15px -5px black"}}>

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
            }}
            /> 
              
          <CardContent sx={{height:"120px"}}>
            <Typography gutterBottom variant="h5" component="div"  >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{textOverflow: 'eclipse'}}>
              {subtitle}
            </Typography>
            
            </CardContent>
            <CardActions className={styles.cardDetail} sx={{display : "grid", gridTemplateColumns:"1fr 1fr"}}>
              <div>
              <IconButton aria-label="user-icon" width="20px" height="10px" >
                <Avatar src = {profile} />
              </IconButton>
              {nickname}
              </div>
              <div style={{textAlign : "right", fontSize : "12px", marginRight: "20px"}}>
                {date}
              </div>
               
            </CardActions>
 
        </Card>
       
    );
  };

  export default CardStyle;


