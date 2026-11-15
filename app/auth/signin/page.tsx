"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { useSession } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isPending && session) router.replace("/dashboard");
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError(result.error.status >= 500
          ? "Sign-in is temporarily unavailable. Check your database connection and try again."
          : result.error.message || "Those credentials did not work. Check them and try again.");
      } else {
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof TypeError
        ? "Could not reach the sign-in service. Check your connection and try again."
        : err instanceof Error ? err.message : "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Pick up where you left off. Your studio is waiting."
      footer={<>New to Studio? <Link href="/auth/signup">Create an account <ArrowRight size={14} /></Link></>}
    >
      <form className="auth-form" onSubmit={handleSubmit} aria-busy={loading}>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <div className="auth-field">
          <label htmlFor="signin-email">Email address</label>
          <input id="signin-email" autoComplete="email" autoFocus type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="auth-field">
          <label htmlFor="signin-password">Password</label>
          <div className="auth-password-wrap">
            <input id="signin-password" autoComplete="current-password" type={showPassword ? "text" : "password"} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
            <button type="button" className="auth-password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"} <ArrowRight size={16} />
        </button>
        <p className="auth-form-note">Your account is protected with encrypted sessions.</p>
      </form>
    </AuthShell>
  );
}
