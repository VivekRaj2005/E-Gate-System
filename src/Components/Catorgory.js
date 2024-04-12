import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Catagory(props) {
  return ( 
    <div className='catagory'>
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <div style={{display: 'flex', justifyContent:'center'}}>
        {props.img}
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{display: 'flex', justifyContent:'center'}}>
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{textAlign: "justify"}}>
                {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: 'flex', justifyContent:'center'}}>
        <Link to={props.link}>
        <Button size="small" color="primary" >
          {props.btn}
        </Button>
        </Link>
      </CardActions>
    </Card>
    </div>
  );
}