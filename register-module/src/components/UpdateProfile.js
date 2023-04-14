import * as React from 'react';
import { Form, Card, Button, Alert, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import PasswordStrength from './PasswordStrength';
import { prefixOptions, passwordRegex } from '../config/options';

export default function UpdateProfile() {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const passwordConfirmRef = React.useRef(null);
  const [password, setPassword] = React.useState('');
  const nipRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const roleRef = React.useRef(null);
  const {currentUser, updateMyEmail, updateMyPassword} = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [prefix, setPrefix] = React.useState("+48");

      
  async function fetchData() {
    try {
      const docRef = doc(db, "users", currentUser?.uid);
      const docSnap = await getDoc(docRef);
      
      const dataToUpdate = {};
      if (nipRef?.current?.value) {
        dataToUpdate.nip = nipRef?.current?.value;
      }
      if (phoneRef?.current?.value) {
        dataToUpdate.phone = prefix+phoneRef?.current?.value;
      }
      if (roleRef?.current?.value) {
        dataToUpdate.role = roleRef?.current?.value;
      }

      if (docSnap.exists()) {
        await updateDoc(docRef, dataToUpdate);
      } else {
        await setDoc(docRef, dataToUpdate);
      }
      navigate('/');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }
    
  function handleSubmit (e) {
    e.preventDefault();
    setError('');
    
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
    if (nipRef?.current.value && nipRef?.current.value.length !== 10) {
      return setError('NIP should be 10 characters long! only numbers');
    }
    if (phoneRef?.current.value && phoneRef?.current.value.length !== 9) {
      return setError('Phone number should be 9 characters long! only numbers');
    }

    const promises = [];
    setLoading(true);
    if (emailRef.current && currentUser.email !== emailRef.current.value) {
        promises.push(updateMyEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
        promises.push(updateMyPassword(passwordRef.current.value));
    }
    if (nipRef.current.value || phoneRef.current.value || roleRef.current.value) {
      promises.push(fetchData());
    }
    Promise.all(promises).then(() => {
        navigate('/');
    }).catch(() => {
        setError('Failed to update account');
    }).finally(() => {
        setLoading(false);
    });
  }

  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
                  
          {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required 
              defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} onChange={e=> setPassword(e.target.value)}
              placeholder="Leave blank to keep the same"/>
              {password !== "" ?<PasswordStrength password={password}/> : null}
            </Form.Group>
            <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Form.Group className="mt-1" id="nip">
            <Form.Label>NIP</Form.Label>
            <Form.Control type="text" ref={nipRef} placeholder="Leave blank to keep the same" />
          </Form.Group>
          <Form.Group className="mt-1" id="phone">
            <Form.Label>Phone</Form.Label>
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
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
                placeholder="Leave blank to keep the same"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mt-1" id="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" ref={roleRef} defaultValue="">
              <option value="" disabled>Select role</option>
              <option value="Administrator">Administrator</option>
              <option value="Dyrektor">Dyrektor</option>
              <option value="Inspektor">Inspektor</option>
              <option value="Kierownik">Kierownik</option>
              <option value="Księgowy">Księgowy</option>
              <option value="Pełnomocnik">Pełnomocnik</option>
            </Form.Control>
          </Form.Group>
            <Button disabled={loading} className="w-100 mt-3 button-text" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
        <div className='w-100 text-center'>
          <Link className="link-style" to="/">Cancel</Link>
        </div>
      </Card>
    </>
  );
}
