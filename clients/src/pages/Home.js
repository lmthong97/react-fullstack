import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import { Card, CardHeader, CardText, CardBody, CardFooter, 
    CardTitle, Col, Row
} from 'reactstrap';

function Home() {

    const [listOfPosts, setListsOfPosts]= useState([]);
    let history = useHistory();
    useEffect(() => {
        axios.get('http://localhost:3001/posts')
          .then((response) => {
            setListsOfPosts(response.data);
          });
    },[])
    return (
        <div className="container">
            <Row>
            {listOfPosts.map((value , key) => {
                    return (
                        <Col className="mt-3" sm="6">
                            <div key={key} onClick={() => {
                              history.push(`/post/ById/${value.id}`)
                            }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle  className="text-center" tag="h5">{value.title}</CardTitle>

                                    </CardHeader>
                                
                                    <CardBody>
                                        <CardText className="text-center">{value.postText}</CardText>
                                    </CardBody>
                                    <CardFooter >
                                        <CardText className="text-center" >{value.username}</CardText>
                                    </CardFooter>
                                </Card>
                            
                            </div>
                        </Col>
                    )
                })}

            </Row>
        </div>
    )
}

export default Home
