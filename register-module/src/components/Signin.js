import * as React from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate} from 'react-router-dom';
import {BsGoogle} from "react-icons/bs";

export default function Signin (props) {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const {signin, signInWithGoogle} = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  
  
  async function handleSubmit (e) {
    e.preventDefault();
        
    try{
      
      setError('');
      setLoading(true);
      await signin(emailRef.current?.value, passwordRef.current?.value);
        navigate('/');
    } catch(e) {
      console.log('signin, problem:',e);
      setError('Failed to sign in');
    }
    setLoading(false);
  }
  async function handleGoogleSignin (e) {
    e.preventDefault();
        
    try{
      
      setError('');
      setLoading(true);
      await signInWithGoogle();
        navigate('/');
    } catch(e) {
      console.log('signin, problem:',e);
      setError('Failed to sign in');
    }
    setLoading(false);
  }
  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="Enter your email"/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required placeholder="Enter your password"/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3 button-text" type="submit">
              Sign in
            </Button>
            <Button onClick={handleGoogleSignin} className="w-100 mt-3 button-text">
            <BsGoogle className='mb-1'/>  
            {" Sign In With Google"}
            </Button> 
          </Form>
        </Card.Body>
        <div className='w-100 text-center'>
          Need an account? <Link className="link-style" to="/signup">Sign Up</Link>
        </div>
        <div className='w-100 text-center'>
            <Link className="link-style" to="/forgot-password">Forgot Password?</Link>
        </div>
        
        
           
        </Card>               
    </>
  );
}
