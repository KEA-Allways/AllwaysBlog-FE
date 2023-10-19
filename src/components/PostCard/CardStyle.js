import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions"
import { IconButton, Typography, makeStyles } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./CardStyle.module.css";
import { CardActionArea } from '@mui/material';
import styled from '@emotion/styled';


 

const CardStyle = ({imgUrl, alt, imgHeight,imgWidth, title, subtitle, nickname}) => {
  
  return (
      
        <Card className={styles.cardStyle} sx={{  borderRadius:"10px" ,opacity:"80%" ,width:"400px" ,marginBottom:"50px"}}
         >
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
            <CardActions>
              <hr/>
              <IconButton aria-label="user-icon" width="20px" height="10px" >
                <AccountCircleIcon />
              </IconButton>
              {nickname}
            </CardActions>
            
          
        </Card>
       
    );
  };

  export default CardStyle;


