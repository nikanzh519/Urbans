import React, { useState, useContext, createContext } from "react";

// Make a place to save who is logged in
const UserContext = createContext();
const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = ({ name, email }) => setUser({ name, email });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// This is a pretend "Google" button
const GoogleButton = ({ action }) => {
  const { login } = useUser();
  const handleGoogleAuth = () => {
    login({ name: "Google User", email: "googleuser@gmail.com" });
  };
  return (
    <button onClick={handleGoogleAuth}>
      {action === "login" ? "Log in with Google" : "Sign up with Google"}
    </button>
  );
};

// Login page
const LoginPage = ({ goToSignup }) => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    login({ name: "User", email });
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} type="submit">Log In</button>
      </form>
      <GoogleButton action="login" />
      <p>
        Don't have an account?{" "}
        <button style={styles.link} onClick={goToSignup}>Sign up</button>
      </p>
    </div>
  );
};

// Signup page
const SignupPage = ({ goToLogin }) => {
  const { login } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    login({ name, email });
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} type="submit">Sign Up</button>
      </form>
      <GoogleButton action="signup" />
      <p>
        Already have an account?{" "}
        <button style={styles.link} onClick={goToLogin}>Log in</button>
      </p>
    </div>
  );
};

// Dashboard page
const Dashboard = () => {
  const { user, logout } = useUser();

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <button style={styles.button} onClick={logout}>Log Out</button>
    </div>
  );
};

// Main part that shows the right page
const Main = () => {
  const { user } = useUser();
  const [page, setPage] = useState("login");

  if (user) return <Dashboard />;
  if (page === "signup") return <SignupPage goToLogin={() => setPage("login")} />;
  return <LoginPage goToSignup={() => setPage("signup")} />;
};

// Some styles so it looks nice
const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 24,
    background: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  input: {
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc"
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    background: "#4f8cff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: 10
  },
  link: {
    color: "#4f8cff",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0
  }
};

// The App!
function App() {
  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
}

export default App;
