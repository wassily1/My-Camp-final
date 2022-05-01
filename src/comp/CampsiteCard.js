import React from 'react'
// import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

import { Card,Rate } from 'antd';

const { Meta } = Card;

const CampsiteCard = ({ campsite }) => {
  return (
    <Link to={`/campsite/${campsite.campId}`}>
        <Card
        hoverable
        style={{ width: 320,marginBottom:50}}
        cover={<img alt="example" src={campsite.image} />}
      >
        <Meta title={campsite.name} />
        <span>Category:</span><span>{campsite.category}</span><br/>
        <Rate disabled value={campsite.rating} /><span>{campsite.numReview} reviews in total</span><br/>
        {/*<Rating value= text={`${campsite.numReview} reviews in total`}/>*/}
        <span>${campsite.price}/Camp</span>
      </Card>
    </Link>
    // <Card className='my-3 p-3 rounded'>
    //     <Link to={`/campsite/${campsite._id}`}>
    //         <Card.Img src={campsite.image} variant='top' />
    //     </Link>

    //     <Card.Body>
    //         <Link to={`/campsite/${campsite._id}`}>
    //             <Card.Title as='div'>
    //                 <strong>{campsite.name}</strong>
    //             </Card.Title>
    //         </Link>
    //         <Card.Text as='div'>
    //             Category: <strong>{campsite.category}</strong>
    //         </Card.Text>
    //         <Card.Text as='div'>
    //             <Rating value={campsite.rating} text={`${campsite.numReview} reviews in total`}/>
    //         </Card.Text>

    //         <Card.Text as='h3'> ${campsite.price}/Camp</Card.Text>
    //     </Card.Body>
    // </Card> 
  )
}



export default CampsiteCard