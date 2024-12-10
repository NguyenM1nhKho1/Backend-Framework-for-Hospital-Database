import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { Roles, UserRoleMap, Permissions } from "../Models/Permission";

type UserContextType = {
  username: string;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  role: Roles | "";
  isLoggedIn: () => boolean;
};

type Props = {
  children: React.ReactNode;
};

const userContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isReady, setIsReady] = useState(false);
  const [role, setRole] = useState<Roles | "">("");

  /*useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);
  

  const registerUser = async (
    email: string,
    userName: string,
    password: string
  ) => {
    await registerAPI(email, userName, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };*/

  useEffect(() => {
    setIsReady(true);
  }, []);

  const loginUser = async (username: string, password: string) => {
    /*await loginAPI(userName, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server error occured"));*/
    const userRole = UserRoleMap[username.toLowerCase()];
    if (!userRole) {
      throw new Error("Invalid username");
    }
    setUsername(username);
    setRole(userRole);
    toast.success("Login Success!");
    navigate("/");
  };

  const logout = () => {
    setUsername("");
    setRole("");
    navigate("/");
  };

  const hasPermission = (permission: string): boolean => {
    return role ? Permissions[role]?.includes(permission) : false;
  };

  const isLoggedIn = () => {
    return !!username;
  };

  /*const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };*/

  return (
    <userContext.Provider
      value={{ loginUser, hasPermission, logout, username, role, isLoggedIn }}
    >
      {isReady ? children : null}
    </userContext.Provider>
  );
};

export const useAuth = () => React.useContext(userContext);
