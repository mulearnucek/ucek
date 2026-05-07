"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [unauthorizedEmail, setUnauthorizedEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    fetch("/api/cms/auth/session")
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          router.push("/dashboard");
        }
      });
  }, [router]);

  const handleCredentialResponse = async (response: any) => {
    setLoading(true);
    setError(null);
    setUnauthorizedEmail(null);
    try {
      const res = await fetch("/api/cms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed. You might not be authorized.");
        if (data.email) {
          setUnauthorizedEmail(data.email);
        }
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Expose callback globally for the Google script
    (window as any).handleCredentialResponse = handleCredentialResponse;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to CMS
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use your authorized Google account to continue
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          {loading ? (
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          ) : unauthorizedEmail ? (
            <div className="flex flex-col items-center space-y-4 w-full">
              <div className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg text-center w-full">
                Signed in as: <br /><span className="font-medium text-gray-900">{unauthorizedEmail}</span>
              </div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div id="g_id_onload"
                   data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                   data-context="signin"
                   data-ux_mode="popup"
                   data-callback="handleCredentialResponse"
                   data-auto_prompt="false">
              </div>

              <div className="g_id_signin"
                   data-type="standard"
                   data-shape="rectangular"
                   data-theme="outline"
                   data-text="signin_with"
                   data-size="large"
                   data-logo_alignment="left">
              </div>
            </>
          )}
        </div>
      </div>
      <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
    </div>
  );
}
