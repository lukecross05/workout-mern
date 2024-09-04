import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault(); //calls login function from useLogin hook.
    await login(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="login-title">Log In</h3>
      <div className="spacing-login"></div>
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="spacing-login"></div>
      <div>
        <button disabled={isLoading} className="loginButton">
          Log In
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LogIn;
