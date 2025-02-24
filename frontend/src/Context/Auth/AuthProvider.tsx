import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AutContext";
import { BASE_URL } from "../../constants/baseUrl";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUserName] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [myOrders, setmyOrders] = useState([]);
  const login = (username: string, token: string) => {
    setUserName(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUserName(null);
    setToken(null);
  };
  const getMyOrders = async () => {
    const response = await fetch(`${BASE_URL}/user/myorder`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return;
    const data = await response.json();
    setmyOrders(data);
  };
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        isAuthenticated,
        myOrders,
        login,
        logout,
        getMyOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
