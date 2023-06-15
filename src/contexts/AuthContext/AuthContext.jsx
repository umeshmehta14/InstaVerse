import { createContext, useContext, useState } from "react";
import { getLoginInformation, createUser } from "./AuthApi";
import { useUser } from "../UserContext/UserContext";

// import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
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
          "loginDetails",
          JSON.stringify({ user: foundUser, token: encodedToken })
        );
        setCurrentUser(foundUser);
        setToken(encodedToken);
        // toast.success(`Welcome Back ${foundUser.firstName} To TechBay`, { containerId: 'A', theme: "colored" });
      }
    } catch (err) {
      // toast.error(`Invalid Credentials`, { containerId: 'A', theme: "colored" });
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
          "loginDetails",
          JSON.stringify({ token: encodedToken, user: createdUser })
        );
        setCurrentUser(createdUser);
        setToken(encodedToken);
        // toast.success(`Welcome ${createdUser.firstName} To TechBay`, { containerId: 'A', theme: "colored" });
      }
    } catch (err) {
      // toast.error(`Email Already Exist`, { containerId: 'A', theme: "colored" });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginDetails");
    setToken(null);
    setCurrentUser(null);
  };

  const handleGuestLogin = (user) =>
    loginHandler(user?.username, user?.password);

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
