"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Link as LinkIcon,
  RefreshCw,
  Trash2,
  Check,
  Lock,
  Video,
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";

export default function PinterestDownloader() {
  const [url, setUrl] = useState<string>("");
  const [mediaData, setMediaData] = useState<{ type: 'video' | 'image', url: string, thumbnail?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [errorError, setError] = useState<string | null>(null);

  const handleDownloadExtract = async () => {
    setError(null);
    if (!url) {
      setError("Please enter a valid Pinterest URL.");
      return;
    }
    if (!url.includes("pinterest.com") && !url.includes("pin.it")) {
      setError("Please provide a valid Pinterest link.");
      return;
    }
    
    setIsProcessing(true);
    setMediaData(null);
    
    try {
      const response = await fetch('/api/pinterest-downloader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch media.");
      }
      
      setMediaData({
        type: data.type || 'image',
        url: data.url,
        thumbnail: data.thumbnail
      });
      
    } catch (error: any) {
      console.error("Error processing URL:", error);
      setError(error.message || "Failed to fetch media. Make sure the pin is public.");
    } finally {
      setIsProcessing(false);
    }
  };
  const downloadMedia = async () => {
    if (!mediaData) return;
    
    try {
      const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(mediaData.url)}`;
      
      const a = document.createElement("a");
      a.href = proxyUrl;
      a.download = `pinterest-download-${Date.now()}.${mediaData.type === 'video' ? 'mp4' : 'jpg'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error("Failed to download blob, falling back to hidden iframe:", err);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = mediaData.url;
      document.body.appendChild(iframe);
      
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 3000);
    }
  };

  const resetState = () => {
    setUrl("");
    setMediaData(null);
    setError(null);
  };

  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 flex flex-col gap-4";
  const btnPrimaryClass = "py-3 px-6 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2";
  const btnSecondaryClass = "py-3 px-6 rounded-xl font-semibold border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12 text-white min-h-screen">
      <div className="flex flex-col gap-6">

        {/* Header Block */}
        <div className={cardBaseClass}>
          <h1 className="text-2xl font-bold flex items-center gap-2"><FaPinterest className="text-[#E60023]" /> Pinterest Downloader</h1>
          <p className="text-gray-400 text-sm">
            Fast and easy way to download Pinterest Videos and Images in high quality. No login required.
          </p>
        </div>

        {errorError && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold flex items-center gap-2">
            <Lock className="w-4 h-4" /> {errorError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Workspace */}
          <div className={`lg:col-span-2 ${cardBaseClass} min-h-[400px] flex flex-col`}>
            
            {!mediaData && !isProcessing ? (
              // URL Input State
              <div className="flex-1 flex flex-col items-center justify-center p-10 transition-all">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E60023] via-[#ff3b5c] to-[#ff7d95] flex items-center justify-center mb-6">
                  <FaPinterest className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Paste Pinterest Link</h3>
                
                <div className="w-full max-w-md flex flex-col gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-11 pr-4 py-4 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent transition-all"
                      placeholder="https://pin.it/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleDownloadExtract}
                    className={btnPrimaryClass + " !bg-[#E60023] hover:!bg-[#cc0020] !text-white"}
                  >
                    Fetch Content
                  </button>
                </div>
              </div>
            ) : isProcessing ? (
               // Processing State
               <div className="flex-1 flex flex-col items-center justify-center p-10">
                 <RefreshCw className="w-12 h-12 text-[#E60023] animate-spin mb-4" />
                 <h3 className="text-xl font-bold mb-2">Analyzing Link...</h3>
                 <p className="text-gray-400 text-sm text-center">
                   Fetching media from Pinterest. This will just take a moment.
                 </p>
               </div>
            ) : mediaData ? (
              // Result State
              <div className="flex flex-col h-full gap-6">
                
                <h3 className="text-lg font-bold border-b border-white/10 pb-4">Ready to Download</h3>
                
                <div className="flex-1 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden relative min-h-[300px]">
                   {mediaData.type === 'video' ? (
                     <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                       <video 
                         src={mediaData.url} 
                         controls 
                         className="w-full h-full object-cover" 
                         poster={mediaData.thumbnail}
                       >
                         Your browser does not support the video tag.
                       </video>
                     </div>
                   ) : (
                     <div className="relative w-full max-w-[400px] aspect-square rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
                       <Image 
                         src={mediaData.thumbnail || mediaData.url} 
                         alt="Pinterest Post" 
                         fill
                         className="object-contain p-2"
                       />
                     </div>
                   )}
                </div>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 mt-auto">
                  <button onClick={resetState} className={`${btnSecondaryClass} !py-2 !px-4 !text-sm hover:!bg-red-500/10 hover:!text-red-400 hover:!border-red-500/30`}>
                    <Trash2 className="w-4 h-4" /> Clear Link
                  </button>
                  
                  <button 
                    onClick={downloadMedia} 
                    className={`${btnPrimaryClass} !bg-[#E60023] hover:!bg-[#cc0020] !text-white !py-2 !px-6 border-none`}
                  >
                    {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    {downloaded ? "Saved!" : `Download ${mediaData.type === 'video' ? 'Video' : 'Image'}`}
                  </button>
                </div>
              </div>
            ) : null}
            
          </div>

          {/* Right Col: Features Info */}
          <div className="flex flex-col gap-6">
            <div className={cardBaseClass}>
              <h3 className="text-xl font-bold mb-2">✨ How to use</h3>
              <div className="space-y-4">
                
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 h-fit rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <span className="font-bold text-pink-400">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white">Copy the Link</h4>
                    <p className="text-xs text-gray-400">Open Pinterest, find the pin, video, or image, tap 'Share', and select 'Copy Link'.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 h-fit rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <span className="font-bold text-indigo-400">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white">Paste the URL</h4>
                    <p className="text-xs text-gray-400">Paste the copied link into the input box provided above.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 h-fit rounded-xl bg-[#E60023]/20 flex items-center justify-center">
                    <span className="font-bold text-[#E60023]">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white">Download</h4>
                    <p className="text-xs text-gray-400">Click fetch, wait for extraction, and save your media in HD directly to your device.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quality Note */}
            <div className={`${cardBaseClass} flex-1 justify-center items-center text-center p-8 bg-gradient-to-br from-white/5 to-transparent`}>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Video className="w-8 h-8 text-[#E60023]" />
              </div>
              <h4 className="font-bold text-gray-300">Highest Quality</h4>
              <p className="text-xs text-gray-500 mt-2 max-w-[200px]">Downloads original high-quality video or image untouched.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
