"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Sun,
  Moon,
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
  const [darkMode, setDarkMode] = useState(false);
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
  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Password strength
  const getPasswordStrength = () => {
    if (!password) return { strength: "None", score: 0, color: "bg-gray-300" };

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

  // Generate password on mount or dependency change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Tips data
  const tips = [
    {
      icon: Shield,
      title: "Use Long Passwords",
      description:
        "Aim for at least 12 characters. Longer passwords are exponentially harder to crack.",
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bgColor: darkMode ? "bg-blue-500/20" : "bg-blue-100",
    },
    {
      icon: RefreshCw,
      title: "Use Password Managers",
      description:
        "Store passwords securely and generate unique ones for each site.",
      color: darkMode ? "text-green-400" : "text-green-600",
      bgColor: darkMode ? "bg-green-500/20" : "bg-green-100",
    },
    {
      icon: Key,
      title: "Mix Character Types",
      description:
        "Combine uppercase, lowercase, numbers, and symbols for maximum security.",
      color: darkMode ? "text-purple-400" : "text-purple-600",
      bgColor: darkMode ? "bg-purple-500/20" : "bg-purple-100",
    },
    {
      icon: AlertTriangle,
      title: "Avoid Common Patterns",
      description:
        "Don't use sequential numbers, repeated characters, or dictionary words.",
      color: darkMode ? "text-red-400" : "text-red-600",
      bgColor: darkMode ? "bg-red-500/20" : "bg-red-100",
    },
  ];

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900"
      }`}
    >
      <div className=" mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white shadow-lg"
              }`}
            >
              <Lock className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                SecurePass Generator
              </h1>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Generate strong, secure passwords instantly
              </p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl transition-all hover:scale-105 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white shadow-lg hover:shadow-xl"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Password Generator Card */}
          <div
            className={`rounded-3xl p-6 md:p-8 mb-8 transition-all ${
              darkMode
                ? "bg-gray-800/80 backdrop-blur-xl border border-gray-700/50"
                : "bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Password Display */}
                <div className="space-y-4">
                  <label className="font-semibold text-lg flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Generated Password
                  </label>
                  <div className="relative flex gap-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      readOnly
                      className={`w-full p-4 rounded-xl text-lg font-mono transition-all ${
                        darkMode
                          ? "bg-gray-900 border-gray-700 text-gray-100"
                          : "bg-gray-50 border-gray-200"
                      } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className={`p-4 rounded-xl transition-all hover:scale-105 ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className={`p-4 rounded-xl transition-all hover:scale-105 ${
                        copied
                          ? "bg-green-100 text-green-700"
                          : darkMode
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                      aria-label="Copy to clipboard"
                    >
                      {copied ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Strength Indicator */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Password Strength</span>
                      <span
                        className={`font-bold ${
                          strength.strength === "Weak"
                            ? "text-red-500"
                            : strength.strength === "Fair"
                            ? "text-yellow-500"
                            : strength.strength === "Good"
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      >
                        {strength.strength}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${strength.color}`}
                        style={{ width: `${(strength.score / 7) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Length */}
                <div className="space-y-4">
                  <label className="font-semibold text-lg">
                    Password Length: {passwordLength}
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:h-6
                      [&::-webkit-slider-thumb]:w-6
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-indigo-600
                      [&::-webkit-slider-thumb]:dark:bg-indigo-500"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>8</span>
                    <span>12</span>
                    <span>16</span>
                    <span>20</span>
                    <span>24</span>
                    <span>28</span>
                    <span>32</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Character Options */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Character Types</h3>
                <div className="space-y-4">
                  {[
                    {
                      key: "uppercase",
                      label: "Uppercase Letters (A-Z)",
                      count: 26,
                    },
                    {
                      key: "lowercase",
                      label: "Lowercase Letters (a-z)",
                      count: 26,
                    },
                    { key: "numbers", label: "Numbers (0-9)", count: 10 },
                    {
                      key: "symbols",
                      label: "Symbols (!@#$...)",
                      count: characterSets.symbols.length,
                    },
                  ].map((opt) => (
                    <div
                      key={opt.key}
                      className="flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.02]"
                      style={{
                        background: options[opt.key as keyof typeof options]
                          ? darkMode
                            ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)"
                            : "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)"
                          : darkMode
                          ? "rgba(55, 65, 81, 0.5)"
                          : "rgba(243, 244, 246, 0.5)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            options[opt.key as keyof typeof options]
                              ? "bg-indigo-600 text-white"
                              : darkMode
                              ? "bg-gray-700"
                              : "bg-gray-200"
                          }`}
                        >
                          {options[opt.key as keyof typeof options] && (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{opt.label}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {opt.count} characters
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setOptions((prev) => ({
                            ...prev,
                            [opt.key]: !prev[opt.key as keyof typeof options],
                          }))
                        }
                        className={`w-12 h-6 rounded-full transition-all relative ${
                          options[opt.key as keyof typeof options]
                            ? "bg-indigo-600"
                            : darkMode
                            ? "bg-gray-700"
                            : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                            options[opt.key as keyof typeof options]
                              ? "left-7"
                              : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}

                  {/* Avoid Similar Characters */}
                  <div
                    className={`p-4 rounded-xl border transition-all ${
                      darkMode
                        ? options.avoidSimilar
                          ? "border-indigo-500/50 bg-indigo-500/10"
                          : "border-gray-700"
                        : options.avoidSimilar
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                            options.avoidSimilar
                              ? "bg-indigo-600 text-white"
                              : darkMode
                              ? "bg-gray-700"
                              : "bg-gray-200"
                          }`}
                        >
                          {options.avoidSimilar && (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            Avoid Similar Characters
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Exclude i, l, 1, L, o, O, 0
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={options.avoidSimilar}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            avoidSimilar: e.target.checked,
                          }))
                        }
                        className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsSpinning(true);
                  generatePassword();
                  setTimeout(() => setIsSpinning(false), 500); // reset after 0.5s
                }}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl 
    hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
    hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-3
    active:scale-95"
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

          {/* Recently Generated */}
          {generatedPasswords.length > 0 && (
            <div
              className={`rounded-3xl p-6 md:p-8 transition-all ${
                darkMode
                  ? "bg-gray-800/80 backdrop-blur-xl border border-gray-700/50"
                  : "bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl"
              }`}
            >
              <h3 className="font-semibold text-lg mb-4">Recently Generated</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedPasswords.map((pwd, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl font-mono transition-all hover:scale-[1.02] cursor-pointer ${
                      darkMode
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setPassword(pwd);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {pwd.length} chars
                      </span>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await navigator.clipboard.writeText(pwd);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          } catch (err) {
                            console.error("Failed to copy:", err);
                          }
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
                        }`}
                        aria-label="Copy password"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="truncate text-sm">{pwd}</div>
                    <div className="mt-2 h-1 w-full rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-full ${
                          pwd.length >= 16
                            ? "bg-green-500"
                            : pwd.length >= 12
                            ? "bg-blue-500"
                            : pwd.length >= 8
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${(pwd.length / 32) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div
            className={`mt-8 rounded-3xl p-6 md:p-8 transition-all ${
              darkMode
                ? "bg-gray-800/50 backdrop-blur-xl border border-gray-700/30"
                : "bg-white/70 backdrop-blur-xl border border-white/30"
            }`}
          >
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Password Security Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${tip.bgColor}`}>
                      <Icon className={`h-5 w-5 ${tip.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{tip.title}</h4>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {tip.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Inline animation */}
      {/* <style jsx global>{`
        @keyframes spinOnce {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        #generate-btn:active svg {
          animation: spinOnce 0.5s ease-in-out;
        }
      `}</style> */}
    </div>
  );
}
