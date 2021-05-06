import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form} from 'formik';
import {  Container, Button, Label, Col, Row } from 'reactstrap';
import { ReactstrapInput } from "reactstrap-formik";
import axios from 'axios';
import {useHistory} from 'react-router-dom'



function CreatePost() {
    let history = useHistory();

    const initialValues = {
        title: "",
        postText: "",
        username: "",

    };

    const validationSchema=Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    })

    const onSubmit =  (data) =>{
        axios.post('http://localhost:3001/posts', data)
          .then((response) => {
            history.push('/');
          });
    };

    return (
        <div className="CreatePostPage" >
            <Formik 
                initialValues= {initialValues} 
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form>
                    <Container >

                        <Row style={{ maxWidth: "850px" }}>
                        
                            
                            <Col xs="12">
                                <Label  className="">Tile: </Label>
                                <Field 
                                    type="text" 
                                    id="inputCreatePost" 
                                    name="title" 
                                    placeholder="(Ex. Title...)"
                                    component={ReactstrapInput} 
                                />
                            </Col>

                            
                            <Col xs="12">
                                <Label  className="">Post: </Label>
                                <Field 
                                    type="text" 
                                    id="inputCreatePost" 
                                    name="postText" 
                                    placeholder="(Ex. Post...)"
                                    component={ReactstrapInput} 
                                />
                            </Col>
                            
                        
                            
                            <Col xs="12">
                                <Label  className="">Username: </Label>
                                <Field 
                                    type="text" 
                                    id="inputCreatePost"
                                    name="username" 
                                    placeholder="(Ex. John123...)"
                                    component={ReactstrapInput} 
                                />

                            </Col>
                            <Col xs="12">
                                <Button className="mt-2" type="submit">Create Post</Button>
                
                            </Col>
                        </Row>
                    </Container>
                    


                </Form>
            </Formik>

            
        </div>
    )
}

export default CreatePost
