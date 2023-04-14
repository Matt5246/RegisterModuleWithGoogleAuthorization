import * as React from 'react';
import { useState, useRef } from 'react';
import { Form, Card, Button, Alert, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import PasswordStrength from './PasswordStrength';
import { prefixOptions } from '../config/options';
     

export default function Signup (props) {
  const [prefix, setPrefix] = useState("+48");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nipRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);
  const [error, setError] = useState('');
  const {textColor} = props;
  const [password, setPassword] = useState('');
  
 async function handleSubmit (e) {
    e.preventDefault();
    setError('');
    let phoneNum = prefix+phoneRef?.current.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (passwordRef?.current.value && passwordConfirmRef?.current.value) {
      if (passwordRef?.current.value !== passwordConfirmRef?.current.value) {
        return setError('Passwords do not match!');
      }
      if (passwordRef?.current.value && passwordRef?.current.value.length < 8) {
        return setError('Password should be at least 8 characters long!');
      }
      if (!passwordRegex.test(passwordRef?.current.value)) {
        return setError('Password should contain at least one lowercase letter, one uppercase letter, one number, one special character!');
      }
    }
    if (nipRef?.current && nipRef?.current.value.length !== 10) {
      return setError('NIP should be 10 characters long! only numbers');
    }
    if (phoneRef?.current.value && phoneRef?.current.value.length !== 9) {
      return setError('Phone number should be 9 characters long! only numbers');
    }
    if (phoneRef?.current.value==="") {
      phoneNum = "";
    }
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
      nip: nipRef.current.value,
      phone: phoneNum,
      role: roleRef.current.value,
    };
    props.onSubmit(formData);
  }

  React.useEffect(() => {
    setError(props.errorCall);
  }, [props.errorCall]);
  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mt-1" id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} onChange={e=> setPassword(e.target.value)} required placeholder="Enter your password" />
            {password !== "" ?<PasswordStrength password={password}/> : null}
          </Form.Group>
          <Form.Group className="mt-1 mb-1" id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Confirm your password" />
          </Form.Group>
          <Form.Group className="mt-1" id="nip">
            <Form.Label>NIP</Form.Label>
            <Form.Control type="text" ref={nipRef} required placeholder="Enter your NIP" />
          </Form.Group>
          <Form.Group className="mt-1" id="phone">
            <Form.Label>Phone</Form.Label>
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                menuVariant="dark"
                title={prefix}
                id="prefix-dropdown"
              >
                {prefixOptions.map((option) => (
                  <Dropdown.Item key={option} onClick={() => setPrefix(option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Form.Control
                type="text"
                ref={phoneRef}
                minLength={9}
                maxLength={9}
                placeholder="Enter your phone number"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mt-1" id="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" ref={roleRef} required defaultValue="">
              <option value="" disabled>Select role</option>
              <option value="Administrator">Administrator</option>
              <option value="Dyrektor">Dyrektor</option>
              <option value="Inspektor">Inspektor</option>
              <option value="Kierownik">Kierownik</option>
              <option value="Księgowy">Księgowy</option>
              <option value="Pełnomocnik">Pełnomocnik</option>
            </Form.Control>
          </Form.Group>
            <Button style={{color: textColor}} disabled={props.loading} className="w-100 mt-3 button-text" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className='w-100 text-center'>
          Already have an account? <Link className="link-style" to="/signin">Sign In</Link>
        </div>
      </Card>
      </>
  );
}
