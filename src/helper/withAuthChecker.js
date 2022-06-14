import React, { createContext, useEffect, useState } from "react";

import LoadingIndicator from "../components/common/LoadingIndicator";
import { useHistory } from "react-router-dom";
import { firebaseAuth } from "../config/firebaseConfig";


export const UserContext = createContext(undefined);


/**
 * This is a higher order component that checks the user is logged in or not.
 * @param Component the component passed
 */
const withAuthChecker = (Component) => (props) => {
  const router = useHistory();

  const [currentUser, setCurrentUser] = useState();

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setIsLoading(false);
      if (user) {
        setCurrentUser(user);
      } else {
        router.replace(`/login`);
        localStorage.setItem('redirect', router.pathname);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <div className="center">
        <div><LoadingIndicator /></div>
      </div>
    );
  } else if (currentUser) {
    return (
      <UserContext.Provider value={currentUser}>
        <Component {...props} />
      </UserContext.Provider>
    );
  } else {
    return <div />;
  }
};

export default withAuthChecker;