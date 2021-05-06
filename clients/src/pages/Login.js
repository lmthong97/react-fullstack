import React, { useState, useContext } from 'react'
import {  Container, Form, Button, Label, Col, Row, Input } from 'reactstrap';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    let history = useHistory();

    const login = () => {
        const data = {username, password}
        axios.post('http://localhost:3001/auth/login', data)
            .then((response) => {
                if(response.data.error) {
                    alert(response.data.error);
                } else {
                    localStorage.setItem("accessToken", response.data.token)
                    setAuthState({username:response.data.username, id: response.data.id, status: true});
                    history.push('/')
                }
            })
    };
    
    return (
        <div className="mt-5">
            <Form>
                    <Container >

                        <Row style={{ maxWidth: "850px" }}>
                        
                            
                            <Col xs="12">
                                <Label  className="">Username: </Label>
                                <Input  
                                    type="text" 
                                    onChange={(event) => {
                                        setUsername(event.target.value)
                                    }}
                                    name="username" 
                                    placeholder="(Ex. John123...)"
                                     
                                />

                            </Col>

                            <Col xs="12">
                                <Label  className="">Password: </Label>
                                <Input  
                                    type="password" 
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                    name="password" 
                                    placeholder="********"
                                     
                                />

                            </Col>
                            <Col xs="12">
                                <Button className="mt-2" onClick={login} >Login</Button>
                
                            </Col>
                        </Row>
                    </Container>
                    


                </Form>
        </div>
    )
}

export default Login
