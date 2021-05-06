import React from 'react'
import * as Yup from 'yup';
import { Formik, Field, Form} from 'formik';
import {  Container, Button, Label, Col, Row } from 'reactstrap';
import { ReactstrapInput } from "reactstrap-formik";
import axios from 'axios';


function Registration() {
    
    const initialValues = {
        
        username: "",
        password: "",

    };

    const validationSchema=Yup.object().shape({
        username: Yup.string().min(3).max(15).required('Please Enter a username'),
        password: Yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth', data)
            .then(() => {
                console.log(data);
            })
    };

    return (
        <div className="mt-5">
            <Formik 
                initialValues= {initialValues} 
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form>
                    <Container >

                        <Row style={{ maxWidth: "850px" }}>
                        
                            
                            <Col xs="12">
                                <Label  className="">Username: </Label>
                                <Field 
                                    type="text" 
                                    
                                    name="username" 
                                    placeholder="(Ex. John123...)"
                                    component={ReactstrapInput} 
                                />

                            </Col>

                            <Col xs="12">
                                <Label  className="">Password: </Label>
                                <Field 
                                    type="password" 
                                    
                                    name="password" 
                                    placeholder="********"
                                    component={ReactstrapInput} 
                                />

                            </Col>
                            <Col xs="12">
                                <Button className="mt-2" type="submit">Register</Button>
                
                            </Col>
                        </Row>
                    </Container>
                    


                </Form>
            </Formik>
        </div>
    )
}

export default Registration
