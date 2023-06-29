import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { getLoginInformation, createUser } from "./AuthApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("userDetails"));
  const [token, setToken] = useState(localStorageToken?.token);
  const [currentUser, setCurrentUser] = useState(localStorageToken?.user);

  const [progress, setProgress] = useState(0);

  const loginHandler = async (username, password) => {
    setProgress(20);
    try {
      const {
        status,
        data: { foundUser, encodedToken },
      } = await getLoginInformation(username, password);
      setProgress(40);

      if (status === 200 || status === 201) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ user: foundUser, token: encodedToken })
        );
        setCurrentUser(foundUser);
        setToken(encodedToken);
      }
    } catch (err) {
      toast.error(`Invalid Credentials`);
    } finally {
      setProgress(100);
    }
  };

  const signUpHandler = async (firstName, lastName, username, password) => {
    try {
      const {
        status,
        data: { createdUser, encodedToken },
      } = await createUser(firstName, lastName, username, password);
      if (status === 201 || status === 200) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ token: encodedToken, user: createdUser })
        );
        setCurrentUser(createdUser);
        setToken(encodedToken);
      }
    } catch (err) {
      toast.error(`Username Already Exist`);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userDetails");
    setToken(null);
    setCurrentUser(null);
  };

  const handleGuestLogin = (user) =>
    loginHandler(user?.username, user?.password);

  useEffect(() => {
    console.log(token, currentUser);
    if (token) {
      if (currentUser.username) {
      } else {
        loginHandler();
      }
    }
  }, [currentUser, token]);

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        logoutHandler,
        setCurrentUser,
        token,
        signUpHandler,
        currentUser,
        handleGuestLogin,
        progress,
        setProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
