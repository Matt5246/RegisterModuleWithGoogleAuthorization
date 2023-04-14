import * as React from 'react';
import {auth,  googleProvider} from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';

const AuthContext = React.createContext({});
export function useAuth () {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    function signup (email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function signin (email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout () {
        return auth.signOut();
    }
    function resetPassword (email) {
        return sendPasswordResetEmail(auth, email);
    }
    function updateMyEmail (email) {
        return updateEmail(currentUser, email);
    }
    function updateMyPassword (password) {
        return updatePassword(currentUser, password);
    }
    function signInWithGoogle(){
     
      return signInWithPopup(auth, googleProvider);
      
    };
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user);
          setLoading(false);
        });
        return unsubscribe;
    }, []);
    
    
    const value = {
      currentUser,
      signup,
      signin,
      logout,
      resetPassword,
      updateMyEmail,
      updateMyPassword,
      signInWithGoogle
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
