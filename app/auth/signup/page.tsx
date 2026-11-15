"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { signUp, useSession } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isPending && session) router.replace("/dashboard");
  }, [session, isPending, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError("Enter your name so your workspace can be personalized.");
      return;
    }
    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp.email({
        email: email.trim(),
        password,
        name: name.trim(),
        callbackURL: "/dashboard",
      });
      if (result.error) {
        setError(result.error.status >= 500
          ? "Account creation is temporarily unavailable. Check your database connection and try again."
          : result.error.message || "We could not create that account. Check your details and try again.");
      } else {
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (requestError) {
      setError(requestError instanceof TypeError
        ? "Could not reach the sign-up service. Check your connection and try again."
        : requestError instanceof Error ? requestError.message : "Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      description="Set up your space for the work you care about."
      footer={<>Already have an account? <Link href="/auth/signin">Sign in <ArrowRight size={14} /></Link></>}
    >
      <form className="auth-form" onSubmit={handleSubmit} aria-busy={loading}>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <div className="auth-field">
          <label htmlFor="signup-name">Full name</label>
          <input id="signup-name" autoComplete="name" autoFocus type="text" required minLength={2} maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-email">Email address</label>
          <input id="signup-email" autoComplete="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-password">Password <span>8 characters minimum</span></label>
          <div className="auth-password-wrap">
            <input id="signup-password" autoComplete="new-password" type={showPassword ? "text" : "password"} required minLength={8} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" />
            <button type="button" className="auth-password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="auth-field">
          <label htmlFor="signup-confirm-password">Confirm password</label>
          <input id="signup-confirm-password" autoComplete="new-password" type={showPassword ? "text" : "password"} required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter it again" />
        </div>
        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"} <ArrowRight size={16} />
        </button>
        <p className="auth-form-note">By continuing, you create a private workspace for your work.</p>
      </form>
    </AuthShell>
  );
}