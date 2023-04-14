import * as React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {db} from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';

export default function App () {
    const [error, setError] = React.useState('');
    const {currentUser, logout} = useAuth();
    const [userData, setUserData] = React.useState({});
    async function handleLogout () {
        setError('');
        try{
            await logout();
        } catch(e) {
            setError('Failed to log out');
        }
    }
  
    React.useEffect(() => {
        const getUser = async () => {
            try{
              const docRef = doc(db, "users", currentUser?.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setUserData(docSnap.data());
              } else {
                console.log("No such document!");
              }
            }catch(e){
              console.log('data problem:', e);
            }                    
        }
        getUser();
    }, [currentUser?.uid]);

  return (
    <>
      <Card className="card-style">
        <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
            {currentUser.email && <><strong>Email: </strong>{currentUser?.email}<br/></>}
            {userData.phone && <><strong>Phone: </strong>{userData?.phone}<br/></>}
            {userData.nip && <><strong>NIP: </strong>{userData?.nip}<br/></>}
            {userData.role && <><strong>Role: </strong>{userData?.role}<br/></>}
            <strong>email verified: </strong>{currentUser?.emailVerified===true ? "true" : "false"}<br/>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3 button-text">Update Profile</Link>
            <div className='w-100 text-center mt-2'>
        Need an account? <Link className='link-style' onClick={handleLogout} to="/signup">Sign Up</Link>
        <div>Or want to leave? <Link className="link-style" variant="link" onClick={handleLogout} to="/signin">Log Out</Link></div>
      </div>
        </Card.Body>
      </Card>
    </>
  );
}
