import React from "react";
import AuthLayout from "../components/features/auth/AuthLayout";
import { Button, TextInput, PasswordInput, FormError } from "../components/ui";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // TODO: replace with real auth call:
      // await login(email, password);
      await new Promise((r) => setTimeout(r, 800));
      // navigate("/", { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
      <p className="text-sm text-gray-400 mb-4">
        Welcome back to GamersCollective.
      </p>

      <FormError message={err} />

      <form onSubmit={onSubmit} className="space-y-4">
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-gray-300">
            <input type="checkbox" className="accent-sky-500" /> Remember me
          </label>
          <a href="/forgot" className="text-sky-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" size="md" loading={loading} className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        New here?{" "}
        <a href="/signup" className="text-sky-400 hover:underline">
          Create an account
        </a>
      </p>
    </AuthLayout>
  );
}
