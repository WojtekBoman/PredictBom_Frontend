import React from 'react';
import {Card,Row,Col,Image,Button} from 'react-bootstrap';
import background from '../../img/zmarzlik.jpg'

// const  setCover = (category) => {

//     // switch(category){
//     //     case "sport"
//     // }
// }

const Market = (props) => {

   

    return(
        <Card>
    <Card.Img variant="top" src={background} style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}}/>
    <Card.Body>
      <Card.Title>{props.marketTitle}</Card.Title>
      <Card.Text>
        {props.description}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
    )
}

export default Market;