/* eslint-disable @next/next/no-img-element */
"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import LoginForm from "./LoginForm";
import { auth } from "@/firebase/firebaseConfig";
import Userservice from "@/app/api/user/user.service";
import { setSessionToken } from "@/app/actions/cookie-actions";
import { useRouter } from "next/navigation";

function RightSection() {
  const router = useRouter();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const createData = {
      name: result?.user?.displayName,
      email: result?.user?.email,
      profileUrl: result?.user?.photoURL,
      unique_id: result?.user?.uid,
    };

    const response = await Userservice.checkAndCreate(createData);

    await setSessionToken(response?.token);

    router.replace("/dashboard");
  };

  return (
    <div className="flex flex-col justify-center p-10 md:p-20 items-center">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>

      {/* Google Login */}
      <button
        className="border-none flex items-center justify-center gap-3 py-3 rounded-lg mb-4 hover:bg-blue-300 transition bg-blue-400 cursor-pointer w-full max-w-md"
        onClick={handleGoogle}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-6 h-6"
        />
        Continue with Google
      </button>

      <p className="text-gray-600 text-sm mb-6 text-center max-w-md">
        or log in to your Sush Portal account:
      </p>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default RightSection;
