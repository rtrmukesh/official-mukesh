"use client";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ChevronsRight,
  Clock,
  Database,
  Globe,
  List,
  Play,
  Plus,
  Server,
  Settings,
  Terminal,
  Trash2
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Key-Value pair type
type KVPair = {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
};

export default function ApiTesterClient() {
  // Request State
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [headers, setHeaders] = useState<KVPair[]>([
    { id: "1", key: "Accept", value: "application/json", enabled: true }
  ]);
  const [params, setParams] = useState<KVPair[]>([]);
  const [bodyType, setBodyType] = useState<"json" | "formData" | "urlEncoded" | "raw">("json");
  const [bodyContent, setBodyContent] = useState("{\n  \n}");
  const [bodyKV, setBodyKV] = useState<KVPair[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState<"params" | "headers" | "body">("params");
  const [isLoading, setIsLoading] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<{ time: string; msg: string; type: "info" | "success" | "error" }[]>([]);
  
  // Response State
  const [response, setResponse] = useState<any>(null);
  const [responseError, setResponseError] = useState<any>(null);
  const [responseTime, setResponseTime] = useState(0);

  const consoleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only the console container to bottom, without scrolling the main window
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTo({
        top: consoleContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [consoleLogs]);

  const addLog = (msg: string, type: "info" | "success" | "error" = "info") => {
    setConsoleLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
  };

  const constructUrlWithParams = () => {
    try {
      const urlObj = new URL(url);
      params.filter(p => p.enabled && p.key).forEach(p => {
        urlObj.searchParams.append(p.key, p.value);
      });
      return urlObj.toString();
    } catch (e) {
      return url; // fallback if invalid URL
    }
  };

  const handleSendRequest = async () => {
    if (!url) {
      addLog("Please enter a valid URL.", "error");
      return;
    }

    setIsLoading(true);
    setResponse(null);
    setResponseError(null);
    const startTime = Date.now();

    const finalUrl = constructUrlWithParams();
    addLog(`Preparing ${method} request to ${finalUrl}`, "info");

    // Construct Headers
    const reqHeaders: Record<string, string> = {};
    headers.forEach((h) => {
      if (h.enabled && h.key) {
        reqHeaders[h.key] = h.value;
      }
    });

    let reqBody: any = undefined;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (bodyType === "json" && bodyContent.trim()) {
        try {
          reqBody = JSON.parse(bodyContent);
          if (!reqHeaders["Content-Type"]) reqHeaders["Content-Type"] = "application/json";
          addLog("Parsed JSON body successfully.", "info");
        } catch (e) {
          reqBody = bodyContent;
          if (!reqHeaders["Content-Type"]) reqHeaders["Content-Type"] = "text/plain";
          addLog("Invalid JSON, sending body as raw string.", "error");
        }
      } else if (bodyType === "raw" && bodyContent.trim()) {
        reqBody = bodyContent;
        if (!reqHeaders["Content-Type"]) reqHeaders["Content-Type"] = "text/plain";
        addLog("Sending body as raw text.", "info");
      } else if (bodyType === "formData") {
        const formData = new FormData();
        bodyKV.filter(p => p.enabled && p.key).forEach(p => {
          formData.append(p.key, p.value);
        });
        reqBody = formData;
        // Do NOT set Content-Type header manually for FormData, axios/browser handles boundary automatically
        delete reqHeaders["Content-Type"];
        addLog("Sending body as Form Data.", "info");
      } else if (bodyType === "urlEncoded") {
        const urlParams = new URLSearchParams();
        bodyKV.filter(p => p.enabled && p.key).forEach(p => {
          urlParams.append(p.key, p.value);
        });
        reqBody = urlParams;
        if (!reqHeaders["Content-Type"]) reqHeaders["Content-Type"] = "application/x-www-form-urlencoded";
        addLog("Sending body as URL Encoded.", "info");
      }
    }

    addLog("Sending request...", "info");

    try {
      const res = await axios({
        method: "POST",
        url: "/api/tools/api-tester",
        headers: {
          ...reqHeaders,
          "x-api-tester-target-url": finalUrl,
          "x-api-tester-method": method,
        },
        data: reqBody,
      });

      const endTime = Date.now();
      const timeMs = endTime - startTime;
      setResponseTime(timeMs);
      setResponse(res);
      
      addLog(`Response received: ${res.status} ${res.statusText} in ${timeMs}ms`, "success");
    } catch (error: any) {
      const endTime = Date.now();
      const timeMs = endTime - startTime;
      setResponseTime(timeMs);
      
      if (error.response) {
        setResponseError(error.response);
        addLog(`Error response: ${error.response.status} ${error.response.statusText}`, "error");
      } else if (error.request) {
        addLog(`Network Error or CORS issue: No response received.`, "error");
      } else {
        addLog(`Request Error: ${error.message}`, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111]/80 shadow-xl";

  const renderKVEditor = (items: KVPair[], setItems: React.Dispatch<React.SetStateAction<KVPair[]>>) => {
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 rounded-xl sm:rounded-none bg-white/5 sm:bg-transparent border border-white/10 sm:border-none">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].enabled = e.target.checked;
                    setItems(newItems);
                  }}
                  className="w-4 h-4 cursor-pointer accent-cyan-400 rounded border-white/20 bg-black/40"
                />
                <span className="text-[10px] sm:hidden text-gray-500 uppercase font-bold">Enabled</span>
              </div>
              <button
                onClick={() => {
                  setItems(items.filter((_, i) => i !== index));
                }}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors sm:hidden"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <input
                type="text"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-500 shadow-inner"
                placeholder="Key"
                value={item.key}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].key = e.target.value;
                  setItems(newItems);
                }}
              />
              <input
                type="text"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-500 shadow-inner"
                placeholder="Value"
                value={item.value}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].value = e.target.value;
                  setItems(newItems);
                }}
              />
            </div>

            <button
              onClick={() => {
                setItems(items.filter((_, i) => i !== index));
              }}
              className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setItems([
              ...items,
              { id: Date.now().toString(), key: "", value: "", enabled: true },
            ]);
          }}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors pt-2 px-1 font-bold"
        >
          <Plus className="w-4 h-4" /> Add Row
        </button>
      </div>
    );
  };

  const renderResponseData = () => {
    const res = response || responseError;
    return res?.data ? JSON.stringify(res.data, null, 2) : "No body returned for response";
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden  text-white flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* Header */}
      <div className="border-b border-white/10 bg-[#111111]/80 backdrop-blur-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl relative z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/tools" className="p-2 -ml-2 sm:mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all" title="Back to Tools">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-white/10 shadow-inner shrink-0">
            <Globe className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight leading-tight">API Tester</h1>
            <p className="text-xs text-gray-400 font-medium">Advanced (HTTP & HTTPS) Request Client</p>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 font-medium">
          <Activity className="w-4 h-4 text-cyan-500" /> <span className="opacity-80">Dynamic Protocol Tester</span>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto w-full relative min-h-0">
        
        {/* Loading Overlay Global */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 pointer-events-none flex items-start justify-center pt-2 "
            >
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] rounded-3xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Column: Request Builder */}
        <div className="flex-[1.2] flex flex-col gap-6 min-w-0 min-h-0">
          
          {/* URL & Method Bar */}
          <div className={`flex flex-col lg:flex-row gap-2 p-2 ${cardBaseClass} relative z-10`}>
            <div className="flex flex-1 items-center bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-inner">
              <div className="relative flex items-center bg-white/5 border-r border-white/10">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="bg-transparent border-none text-sm font-bold w-[100px] sm:w-[120px] shrink-0 focus:outline-none focus:ring-0 pl-4 pr-8 py-3.5 cursor-pointer appearance-none text-cyan-400 z-10"
                  style={{
                    color: method === "GET" ? "#4ADE80" : 
                           method === "POST" ? "#60A5FA" : 
                           method === "PUT" ? "#FBBF24" : 
                           method === "DELETE" ? "#F87171" : "#A78BFA"
                  }}
                >
                  <option value="GET" className="bg-gray-900 text-[#4ADE80]">GET</option>
                  <option value="POST" className="bg-gray-900 text-[#60A5FA]">POST</option>
                  <option value="PUT" className="bg-gray-900 text-[#FBBF24]">PUT</option>
                  <option value="PATCH" className="bg-gray-900 text-[#A78BFA]">PATCH</option>
                  <option value="DELETE" className="bg-gray-900 text-[#F87171]">DELETE</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter API URL here..."
                className="flex-1 bg-transparent border-none text-sm focus:outline-none px-4 py-3 placeholder:text-gray-500 font-mono tracking-tight min-w-0 text-white"
              />
            </div>
            
            <button
              onClick={handleSendRequest}
              disabled={isLoading}
              className="w-full lg:w-auto py-3.5 px-8 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg focus:ring-2 ring-cyan-500/50 hover:shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden shrink-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send <Play className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </span>
              {/* Sending Animation Background */}
              {isLoading && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"
                />
              )}
            </button>
          </div>

          {/* Configuration Area */}
          <div className={`flex-1 min-h-[400px] lg:min-h-0 flex flex-col overflow-hidden relative ${cardBaseClass} p-0 overflow-hidden`}>
            {/* Tabs */}
            <div className="flex items-center gap-2 p-3 bg-white/5 border-b border-white/10 overflow-x-auto no-scrollbar">
              {(["params", "headers", "body"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                    activeTab === tab
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-inner"
                      : "bg-black/40 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab === "params" && <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  {tab === "headers" && <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  {tab === "body" && <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  <span className="capitalize">{tab}</span>
                  {tab === "params" && params.length > 0 && <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-md ml-1">{params.length}</span>}
                  {tab === "headers" && headers.length > 0 && <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-md ml-1">{headers.length}</span>}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="h-full"
                >
                  {activeTab === "params" && renderKVEditor(params, setParams)}
                  {activeTab === "headers" && renderKVEditor(headers, setHeaders)}
                  {activeTab === "body" && (
                    <div className="h-full flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-white/10 pb-4">
                        <label className={`flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none transition-colors ${bodyType === "json" ? "text-cyan-400 font-bold" : "text-gray-400 hover:text-white"}`}>
                          <input type="radio" checked={bodyType === "json"} onChange={() => setBodyType("json")} className="accent-cyan-400 cursor-pointer" /> JSON
                        </label>
                        <label className={`flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none transition-colors ${bodyType === "formData" ? "text-cyan-400 font-bold" : "text-gray-400 hover:text-white"}`}>
                          <input type="radio" checked={bodyType === "formData"} onChange={() => setBodyType("formData")} className="accent-cyan-400 cursor-pointer" /> Form Data
                        </label>
                        <label className={`flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none transition-colors ${bodyType === "urlEncoded" ? "text-cyan-400 font-bold" : "text-gray-400 hover:text-white"}`}>
                          <input type="radio" checked={bodyType === "urlEncoded"} onChange={() => setBodyType("urlEncoded")} className="accent-cyan-400 cursor-pointer" /> URL Encoded
                        </label>
                        <label className={`flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none transition-colors ${bodyType === "raw" ? "text-cyan-400 font-bold" : "text-gray-400 hover:text-white"}`}>
                          <input type="radio" checked={bodyType === "raw"} onChange={() => setBodyType("raw")} className="accent-cyan-400 cursor-pointer" /> Raw
                        </label>
                      </div>

                      {(bodyType === "json" || bodyType === "raw") ? (
                        <textarea
                          value={bodyContent}
                          onChange={(e) => setBodyContent(e.target.value)}
                          placeholder={bodyType === "json" ? `{\n  "key": "value"\n}` : "Enter raw text content here..."}
                          className="flex-1 w-full min-h-[200px] bg-black/40 shadow-inner border border-white/10 rounded-2xl p-4 font-mono text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                      ) : (
                        renderKVEditor(bodyKV, setBodyKV)
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Response & Console */}
        <div className="flex-1 flex flex-col gap-6 min-w-0 min-h-0">
          
          {/* Response Box */}
          <motion.div 
            initial={false}
            animate={{
              borderColor: response ? "rgba(16, 185, 129, 0.4)" : responseError ? "rgba(239, 68, 68, 0.4)" : "rgba(255, 255, 255, 0.1)",
              boxShadow: response ? "0 0 30px rgba(16, 185, 129, 0.1)" : responseError ? "0 0 30px rgba(239, 68, 68, 0.1)" : "none"
            }}
            className={`flex-[2] flex flex-col overflow-hidden min-h-[300px] max-h-[500px] lg:max-h-none lg:min-h-0 ${cardBaseClass} p-0`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-white/10 bg-white/5 gap-3">
              <div className="flex items-center gap-2 font-bold">
                <Server className={`w-5 h-5 ${response ? 'text-emerald-400' : responseError ? 'text-red-400' : 'text-cyan-400'}`} />
                <span className="text-sm sm:text-base text-gray-200">Response</span>
              </div>
              {/* Status Pills */}
              {(response || responseError) && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono font-bold"
                >
                  <div className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-2 ${
                    (response?.status || responseError?.status) < 400 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-inner' 
                      : 'bg-red-500/20 text-red-300 border-red-500/50 shadow-inner'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${(response?.status || responseError?.status) < 400 ? 'bg-emerald-400 animate-pulse' : 'bg-red-400 animate-pulse'}`}></div>
                    {(response?.status || responseError?.status) || 'Error'} {(response?.statusText || responseError?.statusText)}
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-black/40 text-gray-300 border border-white/10 flex items-center gap-2 shadow-inner">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {responseTime} ms
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex-1 relative bg-black/40 p-5 overflow-auto scroll-smooth">
              <AnimatePresence mode="wait">
                {!response && !responseError ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-3 p-4 text-center"
                  >
                    <Globe className="w-16 h-16 opacity-10 animate-pulse" />
                    <p className="text-xs sm:text-sm border border-white/10 px-5 py-2.5 rounded-xl bg-white/5 font-medium text-gray-400">
                      Send a request to see results
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={responseTime} // Force re-animate on each request
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  >
                    <pre className="font-mono text-[11px] sm:text-sm text-[#E2E8F0] tracking-tight leading-relaxed whitespace-pre-wrap break-all sm:break-normal">
                      {renderResponseData()}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Console Output */}
          <div className={`flex-1 flex flex-col overflow-hidden min-h-[250px] max-h-[350px] lg:max-h-none lg:min-h-0 relative group ${cardBaseClass} p-0`}>
            <div className="flex items-center gap-2 p-3 bg-white/5 border-b border-white/10 text-xs font-mono font-bold text-gray-400 shadow-inner">
              <Terminal className="w-4 h-4 text-cyan-400" /> hi@am-sush:~
              <div className="ml-auto flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-md"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-md"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-md"></div>
              </div>
            </div>
            
            <div 
              ref={consoleContainerRef}
              className="flex-1 p-5 font-mono text-[11px] sm:text-xs overflow-y-auto space-y-2 select-text bg-black/40"
            >
              {consoleLogs.map((log, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex items-start gap-3 ${
                    log.type === "error" ? "text-red-400" : 
                    log.type === "success" ? "text-emerald-400" : "text-gray-300"
                  }`}
                >
                  <span className="text-gray-500 shrink-0">[{log.time}]</span>
                  <span className="text-cyan-500/50 shrink-0"><ChevronsRight className="w-3 h-3 mt-0.5" /></span>
                  <span className="break-all">{log.msg}</span>
                </motion.div>
              ))}
            </div>

            {/* Clear Console Button */}
            <button 
              onClick={() => setConsoleLogs([])}
              className="absolute top-2 right-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black text-xs text-gray-300 px-3 py-1.5 rounded-lg border border-white/10 font-bold"
            >
              Clear
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
