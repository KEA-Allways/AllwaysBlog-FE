import Card from 'react-bootstrap/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./ListStyle.module.css";
import Box from '@mui/material/Box';

const ListStyle = ({imgUrl, alt, imgHeight, imgWidth, title, subtitle, nickname, date}) => {
    return (
      <Card className={styles.listStyle}
        sx={{ transition: "all 0.5s ease", 
        borderRadius:"10px",
        boxShadow:"1px 1px 15px -5px black" }}

        style={{height: imgHeight, 
          flexDirection: 'row', 
          display: 'flex-start'}}>

        <CardMedia
          component="img"
          height={imgHeight}
          width={imgWidth}
          image={imgUrl}
          alt={alt}
          
          //사진 꽉채우기 css 
          sx={{
            objectFit: 'cover',
            height: imgHeight,
            width: '25%',
            borderRadius:"10px 0 0 10px"
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '75%', alignI: 'flex-end' }}>

          <CardHeader title={title} style={{ height: '15%', marginTop: '3%'}}/>

          <CardContent className={styles.cardDetail} style={{ height: '75%', marginTop: '1%' }}>

            <Typography variant="body2" color="text.secondary" style={{ height: '75%' }}>
              {/* {subtitle} */}

            </Typography>

            <div style={{ display: 'flex', width: '100%', alignItems: 'center', height: '15%', marginTop: '1%' }}>

              <div style={{ display: 'flex', alignItems: 'center', width: '80%' }}>
                <IconButton aria-label="user-icon" sx={{ width: '20px', height: '20px', marginRight: '10px' }}>
                  <AccountCircleIcon />
                </IconButton>
                {nickname}
              </div>

              <div style={{ width: '20%', marginRight: '10%' }}>{date}</div>

            </div>

          </CardContent>
        </Box>
      </Card>
    );
  };

export default ListStyle;