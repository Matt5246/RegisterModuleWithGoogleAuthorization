import * as React from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate} from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = React.useRef(null);
  const [message, setMessage] = React.useState('');
  const {resetPassword} = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();
        
    try{
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current?.value);
      setMessage(`Check your inbox for further instructions`)
      navigate('/signin');
    } catch(e) {
      setError('Failed to reset password');
    }
    setLoading(false);
  }
  
  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">password reset</h2>
          {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
          {message && <Alert variant="success" className="alert alert-success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            
            <Button disabled={loading} className="w-100 mt-3 button-text" type="submit">
              Reset Password
            </Button>
          </Form>
          
        </Card.Body>
          <div className='w-100 text-center'>
            Already have account? <Link className='link-style' to="/signin">Login</Link>
          </div>
          <div className='w-100 text-center'>
            Need an account? <Link className="link-style" to="/signup">Sign Up</Link>
          </div>
          
        </Card>
        
        
      
    </>
  );
}
