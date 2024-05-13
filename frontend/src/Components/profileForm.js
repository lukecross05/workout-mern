import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ProfileForm = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { user, dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const profile = { username, bio };

    const response = await fetch("http://localhost:4000/api/users/profile", {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setUsername("");
      setBio("");
      setError(null);
      setEmptyFields([]);
      console.log("new profile added");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      //context
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create your profile</h3>
      <label className="formText">username</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        //className={emptyFields.includes("username") ? "error" : ""}
      />

      <label className="formText">Bio</label>
      <input
        type="text"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        //className={emptyFields.includes("bio") ? "error" : ""}
      />

      <button className="submitButton"> Submit </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
