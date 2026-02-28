import { useState } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration Successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth Error Code:", err.code);
      if (err.code === "auth/invalid-credential") {
        setError(
          "Invalid email or password. If you don't have an account, please Sign Up.",
        );
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="p-8 max-w-100 mx-auto text-center">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={handleAuth} className="flex flex-col gap-2.5">
        <input
          type="email"
          placeholder="Email"
          className="text-black/50 p-2 border rounded-sm"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="text-black/50 p-2 border rounded-sm"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="p-2.5 cursor-pointer bg-blue-600 text-white border-0 rounded"
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
