import { createContext, useContext, useState, useEffect } from "react";
import { account } from "./../appwriteConfig";
import { ID } from "appwrite";
import styled from "styled-components";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //setLoading(false)
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    console.log(userInfo);

    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      console.log(
        "This is my response:",
        "Response:",
        response,
        "Account Details:",
        accountDetails
      );
      setUser(accountDetails);
    } catch (error) {
      console.error(error.message);
    }

    setLoading(false);
  };
  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
  };
  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );

      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1
      );

      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <Wrapper>
          <div className="page_loading">Loading.....</div>
        </Wrapper>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
export default AuthContext;

const Wrapper = styled.div`
margin:0;
padding:0;
  .page_loading {
    font-size: 3.2rem;
    font-family:"Work Sans", sans-serif;
    height: 100vh; /*for full ht*/
    color: rgba(29, 29, 29, 0.8); /* Color for the loading text */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow:hidden;
    /* margin: 20px 0; */
    animation: blink 1s infinite; /* Optional animation */

    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
`;
