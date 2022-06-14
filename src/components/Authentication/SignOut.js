import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebaseConfig';

const SignOut = () => {

    const history = useHistory();
  useEffect(() => {
    signOut(firebaseAuth);
    history.replace('/login');
  }, [history]);
  
  return (
    <div>SignOut</div>
  )
}

export default SignOut