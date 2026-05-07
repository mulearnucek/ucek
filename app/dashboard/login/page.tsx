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
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
      <div className="relative flex min-h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-white">
        <div className="relative flex h-[45vh] flex-col overflow-hidden bg-muted p-6 text-white lg:h-full lg:p-10 dark:border-r">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 lg:scale-100" 
            style={{ backgroundImage: "url('/img/ucek.jpeg')" }} 
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-20 flex items-center text-lg font-medium gap-2">
            <img src="/img/logo.png" alt="UCEK Logo" className="h-10 w-auto lg:h-14 brightness-0 invert" />
             <div>
              <h1 className="text-lg font-bold text-[17.99px] md:text-[27px] text-white">
                University College Of Engineering
              </h1>
              <p className="text-sm text-[12px] md:text-[14px] text-white">
                Kariavattom, Thiruvananthapuram
              </p>
          </div>
          </div>
        </div>
        
        <div className="flex w-full flex-1 items-center justify-center p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col gap-6 sm:w-[350px]">
            <div className="flex flex-col gap-2 text-center items-center">
              <img src="/img/logo.png" alt="Logo" className="w-auto h-14" />
              <h1 className="text-2xl font-semibold tracking-tight text-[#2D3E50] mt-2">Sign in to CMS</h1>
              <p className="text-muted-foreground text-sm text-gray-500">
                Sign in with your authorized Google account to continue.
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

            <div className="mt-4 flex flex-col items-center justify-center space-y-4">
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin text-[#2D3E50]" />
              ) : unauthorizedEmail ? (
                <div className="flex flex-col items-center space-y-4 w-full">
                  <div className="text-sm text-gray-700 bg-gray-100 px-4 py-3 rounded-lg text-center w-full">
                    Signed in as: <br /><span className="font-medium text-gray-900">{unauthorizedEmail}</span>
                  </div>
                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2D3E50] hover:bg-[#1a252f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D3E50] transition-colors"
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
        </div>
      </div>
    </>
  );
}
