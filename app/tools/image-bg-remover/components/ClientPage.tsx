"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Upload,
  Download,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
  Check,
  Shield,
  Zap,
  Lock,
} from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

export default function ImageBGRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorError, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, JPEG).");
      return;
    }
    
    const imageUrl = URL.createObjectURL(file);
    setOriginalImage(imageUrl);
    setProcessedImage(null);
    processImage(file);
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const config = {
        progress: (key: string, current: number, total: number) => {
          setProgress(Math.round((current / total) * 100));
        },
      };
      
      const blob = await removeBackground(file, config);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (error) {
      console.error("Error removing background:", error);
      setError("Failed to process image. Make sure you have a working internet connection for the first-time model download.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const a = document.createElement("a");
    a.href = processedImage;
    a.download = `removed-bg-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const resetImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // UI styling exactly matching Password Generator
  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 flex flex-col gap-4";
  const btnPrimaryClass = "py-3 px-6 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2";
  const btnSecondaryClass = "py-3 px-6 rounded-xl font-semibold border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12 text-white min-h-screen">
      <div className="flex flex-col gap-6">

        {/* Header Block */}
        <div className={cardBaseClass}>
          <h1 className="text-2xl font-bold flex items-center gap-2">🪄 AI Background Remover</h1>
          <p className="text-gray-400 text-sm">
            Instantly remove backgrounds from any image 100% locally in your browser. Fast, private, and free.
          </p>
        </div>

        {errorError && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold flex items-center gap-2">
            <Lock className="w-4 h-4" /> {errorError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Workspace */}
          <div className={`lg:col-span-2 ${cardBaseClass} min-h-[500px] flex flex-col`}>
            
            {!originalImage ? (
              // Empty Upload State
              <div 
                className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 transition-all cursor-pointer ${
                  dragActive ? "border-indigo-500 bg-indigo-500/10" : "border-white/20 hover:border-white/40 hover:bg-white/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleChange}
                  className="hidden"
                />
                
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 pointer-events-none">
                  <Upload className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 pointer-events-none">Drag & Drop Image Here</h3>
                <p className="text-gray-400 text-sm text-center mb-6 pointer-events-none">
                  Supports JPG, PNG and WEBP. High resolution recommended.
                </p>
                <button className={btnPrimaryClass + " pointer-events-none"}>
                  Browse Files
                </button>
              </div>
            ) : (
              // Processing / Result State
              <div className="flex flex-col h-full gap-6">
                
                {/* Image Previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  
                  {/* Original */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Original image</span>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center p-2">
                      <Image 
                        src={originalImage} 
                        alt="Original" 
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Processed */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Transparent Result</span>
                    <div className="flex-1 rounded-2xl relative min-h-[300px] flex items-center justify-center p-2 overflow-hidden border border-white/10"
                         style={{ backgroundImage: 'linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}>
                      
                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 bg-[#111111]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 z-10">
                          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                          <div className="text-center">
                            <div className="font-bold text-lg">Processing...</div>
                            <div className="text-xs text-gray-400 mt-1">Applying AI Models ({progress}%)</div>
                          </div>
                          
                          <div className="w-full bg-white/10 rounded-full h-2 mt-2 w-48">
                            <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      ) : processedImage ? (
                        <Image 
                          src={processedImage} 
                          alt="Processed without background" 
                          fill
                          className="object-contain p-2"
                        />
                      ) : null}
                      
                    </div>
                  </div>

                </div>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 mt-auto">
                  <button onClick={resetImages} className={`${btnSecondaryClass} !py-2 !px-4 !text-sm hover:!bg-red-500/10 hover:!text-red-400 hover:!border-red-500/30`}>
                    <Trash2 className="w-4 h-4" /> Start Over
                  </button>
                  
                  <button 
                    onClick={downloadImage} 
                    disabled={isProcessing || !processedImage}
                    className={`${btnPrimaryClass} !bg-indigo-600 hover:!bg-indigo-500 !text-white !py-2 !px-6 border-none disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    {downloaded ? "Saved!" : "Download HD"}
                  </button>
                </div>
              </div>
            )}
            
          </div>

          {/* Right Col: Features Info */}
          <div className="flex flex-col gap-6">
            <div className={cardBaseClass}>
              <h3 className="text-xl font-bold mb-2">✨ Features</h3>
              <div className="space-y-4">
                
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 h-fit rounded-xl bg-indigo-500/20">
                    <Zap className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white">100% Local AI</h4>
                    <p className="text-xs text-gray-400">Uses device power via WebAssembly. Zero server uploads.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 h-fit rounded-xl bg-green-500/20">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white">Privacy First</h4>
                    <p className="text-xs text-gray-400">Your images never leave your browser. Fully secure.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 h-fit rounded-xl bg-orange-500/20">
                    <ImageIcon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-white">Perfect Cutouts</h4>
                    <p className="text-xs text-gray-400">Advanced edge detection maps around hair & complex objects.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Empty space filler for layout balance */}
            <div className={`${cardBaseClass} flex-1 justify-center items-center text-center p-8 bg-gradient-to-br from-white/5 to-transparent`}>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
              <h4 className="font-bold text-gray-300">Pro Quality</h4>
              <p className="text-xs text-gray-500 mt-2 max-w-[200px]">Exported transparent PNGs preserve full original resolution.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
