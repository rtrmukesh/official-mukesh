'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Upload, Download, Loader2, CheckCircle2, Image as ImageIcon, Archive, RefreshCw, Settings2, ShieldCheck, MonitorSmartphone, Globe, Box, Layers, PlaySquare } from 'lucide-react';

export default function AppIconGeneratorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  
  // Cropper settings
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [cropPreview, setCropPreview] = useState<string | null>(null);
  
  // Generation Settings
  const [platforms, setPlatforms] = useState<string[]>(['iOS', 'Android', 'Web']);
  const [padding, setPadding] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('transparent');
  const [previewStyle, setPreviewStyle] = useState<'ios' | 'android' | 'web'>('ios');
  
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zipBase64, setZipBase64] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setError(null);
    setZipBase64(null);

    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setError('Please upload a valid PNG or JPG image.');
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width < 1024 || img.height < 1024) {
        setError(`Image is ${img.width}x${img.height}. Minimum required size is 1024x1024 pixels.`);
      } else {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || null));
        reader.readAsDataURL(selectedFile);
      }
    };
    img.src = URL.createObjectURL(selectedFile);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const createCroppedImage = async (pixels: any, sourceScr: string): Promise<Blob | null> => {
    if (!sourceScr || !pixels) return null;
    
    const image = new Image();
    image.src = sourceScr;
    await new Promise((resolve) => { image.onload = resolve; });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = pixels.width;
    canvas.height = pixels.height;

    ctx.drawImage(
      image,
      pixels.x,
      pixels.y,
      pixels.width,
      pixels.height,
      0,
      0,
      pixels.width,
      pixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error('Canvas is empty')); return; }
        resolve(blob);
      }, 'image/png');
    });
  };

  const onCropComplete = useCallback(async (croppedArea: any, currentCroppedAreaPixels: any) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
    if (imgSrc) {
       try {
         const blob = await createCroppedImage(currentCroppedAreaPixels, imgSrc);
         if (blob) {
            setCropPreview(URL.createObjectURL(blob));
         }
       } catch (e) {
         console.error(e);
       }
    }
  }, [imgSrc]);

  const handleGenerate = async () => {
    if (!imgSrc || !croppedAreaPixels) return;
    
    if (platforms.length === 0) {
      setError('Please select at least one platform to generate icons for.');
      return;
    }
    
    setIsGenerating(true);
    setError(null);

    try {
      const croppedBlob = await createCroppedImage(croppedAreaPixels, imgSrc);
      if (!croppedBlob) throw new Error("Failed to crop image properly.");

      const formData = new FormData();
      formData.append('file', croppedBlob, 'source.png');
      formData.append('platforms', JSON.stringify(platforms));
      formData.append('padding', padding.toString());
      formData.append('backgroundColor', backgroundColor);

      const response = await fetch('/api/tools/app-icon-generator', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate icons');
      }

      setZipBase64(data.zipBase64);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadZip = () => {
    if (!zipBase64) return;
    const link = document.createElement('a');
    link.href = `data:application/zip;base64,${zipBase64}`;
    link.download = 'app-icons-export.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePlatform = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const resetImages = () => {
    setImgSrc(null);
    setFile(null);
    setZipBase64(null);
    setCropPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getPreviewClasses = () => {
    let base = "relative transition-all duration-300 shadow-xl overflow-hidden bg-white/5 border border-white/10 ";
    let inner = "w-full h-full flex items-center justify-center transition-all duration-300 ";
    let label = "";
    
    if (previewStyle === 'ios') {
      base += "rounded-[22%] ring-1 ring-white/20";
      label = "iOS Format";
      if (padding) inner += "scale-[0.8]"; 
    } 
    else if (previewStyle === 'android') {
      base += "rounded-full ring-2 ring-emerald-500/50";
      label = "Android Adaptive";
      if (padding) inner += "scale-[0.7]";
    } 
    else { 
      base += "rounded-md shadow-sm border border-gray-600";
      label = "Web / PWA";
      if (padding) inner += "scale-[0.8]";
    }
    
    return { base, inner, label };
  };

  const pClasses = getPreviewClasses();

  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 flex flex-col gap-4";
  const btnPrimaryClass = "w-full py-3 px-4 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const btnSecondaryClass = "w-full py-3 px-4 rounded-xl font-semibold border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12 text-white min-h-screen">
      <div className="flex flex-col gap-6">

        {/* Header Block */}
        <div className={cardBaseClass}>
          <h1 className="text-2xl font-bold flex items-center gap-2">📱 App Icon Generator</h1>
          <p className="text-gray-400 text-sm">
            Crop, adjust paddings, and instantly generate exact developer-ready folder structures. Includes Apple's AppIcon.appiconset and Android's adaptive ic_launcher.xml.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Workspace */}
          <div className={`lg:col-span-2 ${cardBaseClass} min-h-[500px] flex flex-col`}>
            
            {!imgSrc && !zipBase64 ? (
              // Empty Upload State
              <div 
                className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 transition-all cursor-pointer ${
                  isDragging ? "border-indigo-500 bg-indigo-500/10" : "border-white/20 hover:border-white/40 hover:bg-white/5"
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
                  Upload a 1024x1024 PNG or JPG for highest quality native Xcode and Android generation.
                </p>
                <button className={`py-3 px-6 rounded-xl font-semibold bg-white text-black pointer-events-none`}>
                  Browse Files
                </button>
              </div>
            ) : imgSrc && !zipBase64 ? (
              // Cropper State
              <div className="flex flex-col h-full gap-4">
                <div className="flex items-center justify-between">
                   <h3 className="text-lg font-bold">Crop & Adjust</h3>
                   <button onClick={resetImages} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> Reset Image
                   </button>
                </div>
                <div className="relative w-full flex-1 min-h-[400px] bg-black/40 rounded-2xl overflow-hidden group border border-white/10">
                  <Cropper
                    image={imgSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    objectFit="vertical-cover"
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111111]/80 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-4 border border-white/10">
                    <span className="text-sm font-medium">Zoom</span>
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-32 accent-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-end gap-3 mt-auto">
                    <button 
                      onClick={handleGenerate} 
                      disabled={isGenerating || platforms.length === 0}
                      className={`${btnPrimaryClass} !w-auto !px-8 hover:!bg-indigo-500 !bg-indigo-600 !text-white !border-none`}
                    >
                      {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><Archive className="w-4 h-4" /> Generate Export ZIP</>}
                    </button>
                </div>
              </div>
            ) : (
              // Results State
              <div className="flex flex-col items-center justify-center flex-1 py-12 space-y-8 animate-in fade-in duration-500">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 text-green-400 rounded-full mb-2 border border-green-500/30">
                  <CheckCircle2 size={48} />
                </div>
                <div className="text-center">
                   <h2 className="text-3xl font-extrabold text-white mb-3">Folders Generated!</h2>
                   <p className="text-gray-400 max-w-md mx-auto">
                     Your developer-ready ZIP file containing exact native folder structures is ready.
                   </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm mt-4">
                  <button onClick={downloadZip} className={btnPrimaryClass + " !w-auto !px-8 !bg-green-500 hover:!bg-green-400 !text-black"}>
                    <Download size={18} /> Download ZIP
                  </button>
                  <button onClick={resetImages} className={btnSecondaryClass + " !w-auto !px-8"}>
                    <RefreshCw size={18} /> Start Over
                  </button>
                </div>
              </div>
            )}
            
          </div>

          {/* Right Col: Settings & Preview */}
          <div className="flex flex-col gap-6">
            
            <div className={cardBaseClass}>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                <Settings2 size={18} className="text-indigo-400" /> Options
              </h3>
              
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-300">Target Platforms</label>
                    <div className="flex flex-wrap gap-2">
                      {['iOS', 'Android', 'Web'].map((p) => (
                         <button 
                           key={p} 
                           onClick={() => togglePlatform(p)}
                           className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${platforms.includes(p) ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
                         >
                           {p}
                         </button>
                      ))}
                    </div>
                 </div>

                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
                    <div className="flex justify-between items-center group cursor-pointer" onClick={() => setPadding(!padding)}>
                       <label className="text-sm font-semibold text-gray-300 cursor-pointer group-hover:text-white transition-colors">Safe Area Padding</label>
                       <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" checked={padding} readOnly className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white appearance-none cursor-pointer" style={{ right: padding ? 0 : '1.25rem' }}/>
                          <label className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${padding ? 'bg-indigo-500' : 'bg-gray-600'}`}></label>
                       </div>
                    </div>
                    <p className="text-[10px] text-gray-500">Shrinks the icon to make room for system UI rounded corners and overlaps.</p>
                 </div>

                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-300">Fill Background</label>
                    <select 
                      value={backgroundColor} 
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full bg-[#111111] text-sm text-white border border-white/20 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                    >
                      <option value="transparent">Transparent (Original)</option>
                      <option value="#FFFFFF">White</option>
                      <option value="#000000">Black</option>
                      <option value="#F3F4F6">Light Gray</option>
                      <option value="#4F46E5">Indigo</option>
                    </select>
                    <p className="text-[10px] text-gray-500">iOS generally requires a solid background without alpha channels.</p>
                 </div>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className={`${cardBaseClass} flex-1`}>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                <PlaySquare size={18} className="text-orange-400" /> Icon Preview
              </h3>

              <div className="flex bg-[#111111] border border-white/10 p-1 rounded-xl mb-4 w-full">
                  <button onClick={() => setPreviewStyle('ios')} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${previewStyle === 'ios' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>iOS</button>
                  <button onClick={() => setPreviewStyle('android')} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${previewStyle === 'android' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>Android</button>
                  <button onClick={() => setPreviewStyle('web')} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${previewStyle === 'web' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>Web</button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-2xl bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAM0lEQVQ4T2P8z8Dwn5GMwMRgNBwwIhiNhgNGwmA0HDAiHDCgRxhQ8sEoOIyGw2hwAAAPgQk/e9XnGwAAAABJRU5ErkJggg==')]">
                  <div 
                    className={pClasses.base}
                    style={{ width: '120px', height: '120px', backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : '#222' }}
                  >
                      <div className={pClasses.inner}>
                        {cropPreview ? (
                          <img src={cropPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Real-time Crop Mock" />
                        ) : (
                          <ImageIcon size={40} className="text-white/20" />
                        )}
                      </div>
                  </div>
                  <span className="text-[10px] mt-4 text-white/50 bg-black/50 px-2 py-1 rounded-md">{pClasses.label}</span>
              </div>
            </div>

          </div>

        </div>

        {/* FAQs */}
        <div className="mt-12 flex flex-col gap-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about preparing app assets.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            
            <div className={cardBaseClass}>
               <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-lg">
                 01
               </div>
              <h3 className="text-lg font-bold text-white">How to generate an iOS app icon set?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Upload a high-quality 1024x1024 image. Our tool slices it into 20x20 up to 1024x1024 scales (@1x, @2x, @3x). 
                Once downloaded, simply drag the <code className="bg-white/10 px-1 py-0.5 rounded text-gray-300">AppIcon.appiconset</code> folder directly into Xcode's Asset Catalog, and your icons will instantly map perfectly.
              </p>
            </div>

            <div className={cardBaseClass}>
               <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-lg">
                 02
               </div>
              <h3 className="text-lg font-bold text-white">What is Contents.json in Xcode?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                <code className="bg-white/10 px-1 py-0.5 rounded text-gray-300">Contents.json</code> is a metadata file required by Xcode to understand which specific image resolutions apply to which device idioms (iPhone, iPad) and display scales. Our tool auto-generates this so you don't have to assign them manually.
              </p>
            </div>

            <div className={cardBaseClass}>
               <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-lg">
                 03
               </div>
              <h3 className="text-lg font-bold text-white">How to create Android adaptive icons?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Check the "Android" generation option. The generator will create both the legacy mipmap resolution sizes, as well as the <code className="bg-white/10 px-1 py-0.5 rounded text-gray-300">mipmap-anydpi-v26/ic_launcher.xml</code> vector template wrapping your foreground element—providing the exact structure Android Studio expects.
              </p>
            </div>
            
            <div className={cardBaseClass}>
               <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-lg">
                 04
               </div>
              <h3 className="text-lg font-bold text-white">What size is required for the App Stores?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                The iOS App Store mandates a <code className="bg-white/10 px-1 py-0.5 rounded text-gray-300">1024x1024</code> PNG icon without an alpha channel (no transparency). The Google Play Store requires a <code className="bg-white/10 px-1 py-0.5 rounded text-gray-300">512x512</code> high-res PNG. Our tool automatically provisions and outputs both.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
