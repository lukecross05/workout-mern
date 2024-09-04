import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password); //upon form submission, call function to sign up user.
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="login-title">Sign Up</h3>
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
      <button disabled={isLoading} className="loginButton">
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
