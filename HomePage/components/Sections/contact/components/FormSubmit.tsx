"use client";

import { Fragment, useState } from "react";
import {
    MdSend
} from "react-icons/md";

const FormSubmit = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!fullName || !email || !message) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("message", message);
    if (pdf) formData.append("pdf", pdf);

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent successfully!");
      setFullName("");
      setEmail("");
      setMessage("");
      setPdf(null);
    } else {
      alert("Failed to send message!");
    }
  };

  return (
    <Fragment>
      {/* ✴---Mobile View---✴ */}
      <div className="mt-10 bg-[#1e1e1f] md:hidden">
        <h3 className="text-xl font-semibold text-white mb-4">Contact Form</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-[#1f1f20] text-white p-3 rounded-lg border border-gray-700 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1f1f20] text-white p-3 rounded-lg border border-gray-700 outline-none"
          />
        </div>

        <textarea
          rows={5}
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-[#1f1f20] text-white p-3 rounded-lg border border-gray-700 outline-none w-full mt-4"
        />

        {/* ATTACH PDF */}
        <div className="cursor-pointer bg-[#1f1f20] border border-gray-700 p-3 rounded-lg mt-4 flex flex-col items-center gap-2 text-[hsl(190,82%,42%)] hover:text-[hsl(190,100%,72%)] transition">
          <label className="flex items-center gap-2">
            📎 <span>{pdf ? pdf?.name : `Attach PDF (Optional)`}</span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <div className="flex items-center justify-between w-full mt-1">
          <span className="text-xs text-gray-500">Only PDF up to 1 MB</span>

          {pdf && (
            <button
              onClick={() => setPdf(null)}
              className="text-gray-400 hover:text-red-500 transition text-xs cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>

        {/* BUTTON */}

        <div className="flex justify-end cursor-default">
          <button
            onClick={handleSubmit}
            disabled={!(validateEmail(email) && fullName && message) || loading}
            className={`mt-5 w-full md:w-auto px-6 py-3  rounded-lg 
             flex items-center justify-center gap-2  text-center border border-gray-700  bg-[linear-gradient(to_bottom_right,rgb(64,64,64)_0%,rgba(64,64,64,0)_50%)] text-[hsl(190,82%,42%)] 
             ${
               validateEmail(email) && fullName && message
                 ? "hover:text-[hsl(190,100%,72%)] transition cursor-pointer"
                 : "opacity-70 cursor-not-allowed"
             }
             `}
          >
            <MdSend className="text-lg sm:text-xl" />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>

      {/* ✴---WebView---✴ */}
      <div className="mt-10 bg-[#1e1e1f] border border-gray-700 rounded-xl p-6 hidden md:block">
        <h3 className="text-xl font-semibold text-white mb-4">Contact Form</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-[#1f1f20] text-white p-3 rounded-lg border border-gray-700 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1f1f20] text-white p-3 rounded-lg border border-gray-700 outline-none"
          />
        </div>

        <textarea
          rows={5}
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-[#1f1f20] text-white p-3 rounded-lg border border-gray-700 outline-none w-full mt-4"
        />

        {/* ATTACH PDF */}
        <div className="cursor-pointer bg-[#1f1f20] border border-gray-700 p-3 rounded-lg mt-4 flex flex-col items-center gap-2 text-[hsl(190,82%,42%)] hover:text-[hsl(190,100%,72%)] transition">
          <label className="flex items-center gap-2">
            📎 <span>{pdf ? pdf?.name : `Attach PDF (Optional)`}</span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        <div className="flex items-center justify-between w-full mt-1">
          <span className="text-xs text-gray-500">Only PDF up to 1 MB</span>

          {pdf && (
            <button
              onClick={() => setPdf(null)}
              className="text-gray-400 hover:text-red-500 transition text-xs cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>

        {/* BUTTON */}
        <div className="flex justify-end cursor-default">
          <button
            onClick={handleSubmit}
            disabled={!(validateEmail(email) && fullName && message) || loading}
            className={`mt-5 w-full md:w-auto px-6 py-3  rounded-lg 
             flex items-center justify-center gap-2  text-center border border-gray-700  bg-[linear-gradient(to_bottom_right,rgb(64,64,64)_0%,rgba(64,64,64,0)_50%)] text-[hsl(190,82%,42%)] 
             ${
               validateEmail(email) && fullName && message
                 ? "hover:text-[hsl(190,100%,72%)] transition cursor-pointer"
                 : "opacity-70 cursor-not-allowed"
             }
             `}
          >
            <MdSend className="text-lg sm:text-xl" />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FormSubmit;
