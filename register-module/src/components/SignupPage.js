import React, { useState } from 'react';
import Signup from './Signup';
import SignupSummary from './SignupSummary';
import { useNavigate } from 'react-router-dom';
import { useAuth} from '../contexts/AuthContext';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import {db} from '../config/firebase';

export default function SignupPage() {
  const [showSummary, setShowSummary] = useState(false);
  const [signupData, setSignupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signup, currentUser} = useAuth();
  const [taskData, setTaskData] = React.useState({});
  
  React.useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          navigate('/signin');
        } else {
          const data = {
            nip: signupData.nip,
            phone: signupData.phone,
            role: signupData.role
          };
          await setDoc(docRef, data);
        }
        navigate('/');
      } catch (e) {
        setShowSummary(false);
      }
      setLoading(false);
    }
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  function handleConfirm(formData) {
    Registration(formData);
  }
  function handleClose() {
    setShowSummary(false);
  }
  async function Registration(formData){
        try{
          setError('');
          setLoading(true);
          await new Promise((resolve) => {
            signup(formData.email, formData.password);
            resolve();
          });
          
        } catch(e) {
          console.log('signup, problem:',e);
          setError('Failed to create an account ');
          setShowSummary(false);
        }
        setLoading(false);
  }
  async function handleSubmit(formData) {
      setSignupData(formData);
      setShowSummary(true);
      await new Promise((resolve) => {
        
        resolve();
      });
  }

  return (
    <>
      {!showSummary && <Signup errorCall={error} Loading={loading} onSubmit={handleSubmit} />}

      {showSummary && <SignupSummary handleClose={handleClose} handleConfirm={handleConfirm} data={signupData} />}
    </>
  );
}