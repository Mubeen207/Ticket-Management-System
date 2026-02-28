import { useState } from "react";
import { useRouter } from "next/router";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      // LOGIN
      const existingUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (existingUser) {
        localStorage.setItem("currentUser", JSON.stringify(existingUser));
        router.push("/");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      // SIGN UP
      const emailExists = users.find((user) => user.email === email);

      if (emailExists) {
        setError("This email is already registered. Try logging in.");
        return;
      }

      if (password.length < 6) {
        setError("Password should be at least 6 characters.");
        return;
      }

      const newUser = { email, password };
      const updatedUsers = [...users, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Registration successful! You can now log in.");
      setIsLogin(true);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="p-8 max-w-100 mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form onSubmit={handleAuth} className="flex flex-col gap-2.5">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="p-2.5 cursor-pointer bg-blue-600 text-white rounded"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p
        onClick={() => {
          setIsLogin(!isLogin);
          setError("");
        }}
        className="cursor-pointer text-[#0070f3] mt-3.75"
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}