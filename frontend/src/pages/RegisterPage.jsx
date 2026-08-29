import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import { showToast } from "../store/slices/uiSlice";

const inputClass =
  "box-border w-full rounded-lg border border-border-strong bg-bg-secondary p-[13px] text-[15px] text-text outline-none";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await dispatch(register({ name, email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(showToast(`Welcome to Shophive, ${result.payload.name.split(" ")[0]}!`, "ok"));
      navigate("/");
    } else {
      setError(result.payload || "Registration failed");
    }
  };

  return (
    <div className="mx-auto my-10 max-w-105">
      <h1 className="mb-2 text-center font-display text-[2.2rem] text-text">Create your account</h1>

      <p className="mb-8 text-center text-text-secondary">Join Shophive to start ordering</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-[14px] border border-border-strong p-7.5"
      >
        <input
          className={inputClass}
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={inputClass}
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-[0.85rem] text-danger">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-[9px] border-0 bg-primary px-7 py-3.5 text-center text-[14.5px] font-bold text-primary-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-center text-text-secondary">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
};
