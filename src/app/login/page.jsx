'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials! Access Denied.");
        setLoading(false);
      } else if (result?.ok) {
        // Successful login - hardcoded small delay to ensure JWT is saved
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push("/dashboard");
      } else {
        setError("Authentication failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 border border-gray-200">
        
        {/* LOGO AREA */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center text-2xl mb-4 text-white">🏭</div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">TECKNORA FACTORY</h1>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Authorized Access Only</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center font-bold border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-900 uppercase mb-2 ml-1">Username</label>
            <input type="text" value={username} onChange={e => setUser(e.target.value)} 
              className="w-full border-2 border-gray-200 p-3 rounded-xl font-bold outline-none focus:border-black text-black transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-900 uppercase mb-2 ml-1">Password</label>
            <input type="password" value={password} onChange={e => setPass(e.target.value)} 
              className="w-full border-2 border-gray-200 p-3 rounded-xl font-bold outline-none focus:border-black text-black transition-colors" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-xl font-black hover:bg-gray-900 transition-all shadow-lg mt-2">
            {loading ? "AUTHENTICATING..." : "ENTER DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}