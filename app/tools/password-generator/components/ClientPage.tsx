"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Key,
  AlertTriangle,
} from "lucide-react";

export default function PasswordGenerator() {
  // State
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  // Options
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    avoidSimilar: false,
  });

  // Character sets
  const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    similar: "il1LoO0",
  };

  // Generate password function
  const generatePassword = useCallback(() => {
    let charset = "";

    if (options.uppercase) charset += characterSets.uppercase;
    if (options.lowercase) charset += characterSets.lowercase;
    if (options.numbers) charset += characterSets.numbers;
    if (options.symbols) charset += characterSets.symbols;

    if (options.avoidSimilar) {
      charset = charset
        .split("")
        .filter((char) => !characterSets.similar.includes(char))
        .join("");
    }

    if (!charset) {
      setPassword("Select at least one character type");
      return;
    }

    let generated = "";
    const array = new Uint32Array(passwordLength);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < passwordLength; i++) {
      generated += charset[array[i] % charset.length];
    }

    setPassword(generated);
    setGeneratedPasswords((prev) => [
      generated,
      ...prev.filter((pwd) => pwd !== generated).slice(0, 4),
    ]);
  }, [options, passwordLength]);

  // Copy to clipboard
  const copyToClipboard = async (textToCopy: string = password) => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Password strength
  const getPasswordStrength = () => {
    if (!password || password.includes("Select at least")) return { strength: "None", score: 0, color: "bg-gray-300" };

    let score = 0;
    if (passwordLength >= 8) score += 1;
    if (passwordLength >= 12) score += 1;
    if (passwordLength >= 16) score += 1;

    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { strength: "Weak", score, color: "bg-red-500" };
    if (score <= 4) return { strength: "Fair", score, color: "bg-yellow-500" };
    if (score <= 6) return { strength: "Good", score, color: "bg-blue-500" };
    return { strength: "Strong", score, color: "bg-green-500" };
  };

  const strength = getPasswordStrength();

  // Generate password on mount
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Tips data
  const tips = [
    {
      icon: Shield,
      title: "Use Long Passwords",
      description: "Aim for at least 12 characters. Longer passwords are exponentially harder to crack.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: RefreshCw,
      title: "Use Password Managers",
      description: "Store passwords securely and generate unique ones for each site.",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Key,
      title: "Mix Character Types",
      description: "Combine uppercase, lowercase, numbers, and symbols for maximum security.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: AlertTriangle,
      title: "Avoid Common Patterns",
      description: "Don't use sequential numbers, repeated characters, or dictionary words.",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
    },
  ];

  // Modern UI card style base matching CSS Grid Generator exactly
  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 flex flex-col gap-4";
  const btnPrimaryClass = "w-full py-3 px-4 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2";
  const btnSecondaryClass = "w-full py-3 px-4 rounded-xl font-semibold border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12 text-white min-h-screen">
      <div className="flex flex-col gap-6">

        {/* Header Info */}
        <div className={cardBaseClass}>
          <h2 className="text-2xl font-bold flex items-center gap-2">🔐 SecurePass Generator</h2>
          <p className="text-gray-400 text-sm">
            Generate strong, secure passwords instantly with complete control over rules and complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Col: Main Password Area */}
          <div className={`lg:col-span-2 ${cardBaseClass} justify-between space-y-6`}>
            
            {/* Password Display */}
            <div className="space-y-4">
              <label className="font-semibold text-lg flex items-center gap-2 text-gray-300">
                <Lock className="h-5 w-5" />
                Generated Password
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    readOnly
                    className="w-full p-4 pl-5 pr-14 rounded-2xl text-lg sm:text-2xl font-mono transition-all bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all text-gray-400 hover:text-white hover:bg-white/10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <button
                  onClick={() => copyToClipboard(password)}
                  className={`py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 sm:w-auto w-full border-none ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                  aria-label="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-sm text-gray-400">Security Rating</span>
                  <span
                    className={`font-black text-sm uppercase tracking-wider ${
                      strength.strength === "Weak"
                        ? "text-red-500"
                        : strength.strength === "Fair"
                        ? "text-yellow-500"
                        : strength.strength === "Good"
                        ? "text-blue-500"
                        : strength.strength === "Strong"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {strength.strength}
                  </span>
                </div>
                <div className="flex gap-2 h-2.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-500 ${
                        i < Math.ceil((strength.score / 7) * 4) ? strength.color : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Password Length */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="flex justify-between items-center font-semibold text-lg text-gray-300">
                <span>Password Length</span>
                <span className="px-3 py-1 bg-white/10 rounded-lg">{passwordLength} chars</span>
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 px-1">
                <span>8</span>
                <span>16</span>
                <span>24</span>
                <span>32</span>
                <span>48</span>
                <span>64</span>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-6">
              <button
                onClick={() => {
                  setIsSpinning(true);
                  generatePassword();
                  setTimeout(() => setIsSpinning(false), 500);
                }}
                className={`${btnPrimaryClass} !py-4 lg:!text-lg !bg-indigo-600 !border-none !text-white hover:!bg-indigo-500`}
                id="generate-btn"
              >
                <RefreshCw
                  className="h-5 w-5"
                  style={{
                    transition: "transform 0.5s ease-in-out",
                    transform: isSpinning ? "rotate(360deg)" : "rotate(0deg)",
                  }}
                />
                Generate New Password
              </button>
            </div>
          </div>

          {/* Right Col: Character Options */}
          <div className={`lg:col-span-1 ${cardBaseClass}`}>
            <h3 className="text-xl font-bold mb-2">⚙️ Rules</h3>
            <div className="space-y-3">
              {[
                { key: "uppercase", label: "Uppercase", sublabel: "(A-Z)" },
                { key: "lowercase", label: "Lowercase", sublabel: "(a-z)" },
                { key: "numbers", label: "Numbers", sublabel: "(0-9)" },
                { key: "symbols", label: "Symbols", sublabel: "(!@#$)" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() =>
                    setOptions((prev) => ({
                      ...prev,
                      [opt.key]: !prev[opt.key as keyof typeof options],
                    }))
                  }
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border text-left ${
                    options[opt.key as keyof typeof options]
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <div>
                    <div className={`font-semibold ${options[opt.key as keyof typeof options] ? "text-indigo-400" : "text-gray-300"}`}>
                      {opt.label}
                    </div>
                    <div className="text-xs text-gray-500">{opt.sublabel}</div>
                  </div>
                  <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                    options[opt.key as keyof typeof options] ? "bg-indigo-600 text-white" : "bg-white/10"
                  }`}>
                    {options[opt.key as keyof typeof options] && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))}

              <button
                onClick={() =>
                  setOptions((prev) => ({
                    ...prev,
                    avoidSimilar: !prev.avoidSimilar,
                  }))
                }
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border text-left mt-4 ${
                  options.avoidSimilar
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                <div>
                  <div className={`font-semibold ${options.avoidSimilar ? "text-orange-400" : "text-gray-300"}`}>
                    Avoid Similar
                  </div>
                  <div className="text-xs text-gray-500">Exclude 1, l, I, 0, O</div>
                </div>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                  options.avoidSimilar ? "bg-orange-600 text-white" : "bg-white/10"
                }`}>
                  {options.avoidSimilar && <Check className="w-4 h-4" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recently Generated */}
          {generatedPasswords.length > 0 && (
            <div className={cardBaseClass}>
              <h3 className="text-xl font-bold mb-2">🕒 History</h3>
              <div className="flex flex-col gap-3">
                {generatedPasswords.map((pwd, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 group hover:border-white/20 transition-all font-mono"
                  >
                    <div className="truncate text-sm pr-4 select-all cursor-text text-gray-300">{pwd}</div>
                    <button
                      onClick={() => copyToClipboard(pwd)}
                      className="p-2 rounded-xl transition-all hover:bg-white/10 text-gray-400 hover:text-white flex-shrink-0"
                      aria-label="Copy password"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tips */}
          <div className={`${cardBaseClass} ${generatedPasswords.length > 0 ? "" : "lg:col-span-2"}`}>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5" />
              Security Tips
            </h3>
            <div className={`grid gap-4 ${generatedPasswords.length > 0 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex gap-4 p-4 rounded-2xl bg-[#1a1a1a] border border-white/5">
                    <div className={`p-3 h-fit rounded-xl ${tip.bgColor}`}>
                      <Icon className={`h-5 w-5 ${tip.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-xs text-gray-400">{tip.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
