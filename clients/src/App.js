import './App.css';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';
import {  Nav, Navbar } from 'reactstrap';
  
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Registration from './pages/Registration'
import Login from './pages/Login'
import {AuthContext} from './helpers/AuthContext'
import { useEffect, useState } from 'react';
import axios from 'axios';




function App() {
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0, 
    status: false
  });
  useEffect(() => {
  axios.get('http://localhost:3001/auth/auth',{
    headers: {accessToken: localStorage.getItem("accessToken"),}
  })
    .then((response) => {
      if (response.data.error){
        setAuthState({...authState, status: false});
      } else {
        setAuthState({
          username: response.data.username, 
          id: response.data.id, 
          status: true
        });
      };
    });
    
  }, [authState]);
  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({username: "", id: 0, status: false});
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>

        <Router>
          <Navbar className="navbar" light expand="md bg-dark">
            <Nav className="nav mr-auto" navbar>
              <Link to="/">Home Page</Link>
              <Link to="/createpost">Create A Post</Link>
              <div className="user">
                <h1 className="username">{authState.username}</h1>
                {!authState.status ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Registration</Link>
                  </>
                ) : (
                  <button type="button" className="btn btn-primary logout" onClick= {logout}>Logout</button>
                )}
              </div>

            </Nav>

          </Navbar>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/ById/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />

          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
