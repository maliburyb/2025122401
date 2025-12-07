import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Upload, Loader2, Download, RefreshCw, Camera, Wand2 } from 'lucide-react';

const MagicPhotoBooth: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
          setGeneratedImage(null);
          setError(null);
          setPrompt('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;

    setLoading(true);
    setError(null);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Extract base64 data and mime type
        const base64Data = image.split(',')[1];
        const mimeType = image.split(';')[0].split(':')[1];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType
                        }
                    },
                    {
                        text: prompt
                    }
                ]
            }
        });

        let found = false;
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const url = `data:image/png;base64,${part.inlineData.data}`;
                    setGeneratedImage(url);
                    found = true;
                    break;
                }
            }
        }
        
        if (!found) {
            setError("抱歉，聖誕精靈這次沒能成功施展魔法，請換個指令試試看！");
        }

    } catch (err) {
        console.error(err);
        setError("發生了一些錯誤，請稍後再試！");
    } finally {
        setLoading(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'christmas-magic-2025.png';
        link.click();
    }
  };

  const reset = () => {
    setImage(null);
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
  };

  return (
    <section className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border-2 border-xmas-gold/30">
        <div className="bg-xmas-green p-4 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-white flex items-center justify-center gap-2 relative z-10">
                <Camera className="w-6 h-6" />
                聖誕魔法照相亭
                <Sparkles className="w-6 h-6 text-xmas-gold animate-pulse" />
            </h2>
            <p className="text-xmas-cream text-xs md:text-sm mt-1 opacity-90 relative z-10">
                上傳照片，讓 AI 施展聖誕魔法！
            </p>
        </div>

        <div className="p-6">
            {!image ? (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-xmas-green/20 rounded-2xl p-8 text-center cursor-pointer hover:bg-xmas-green/5 transition-colors group h-64 flex flex-col items-center justify-center"
                >
                    <div className="bg-xmas-green/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-xmas-green" />
                    </div>
                    <p className="font-bold text-xmas-brown text-lg mb-2">點擊上傳照片</p>
                    <p className="text-sm text-gray-500">或直接將照片拖曳到這裡</p>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="relative rounded-xl overflow-hidden shadow-inner bg-gray-100 min-h-[300px] flex items-center justify-center">
                        {generatedImage ? (
                            <img src={generatedImage} alt="Generated" className="max-w-full max-h-[400px] object-contain" />
                        ) : (
                            <div className="relative w-full flex justify-center">
                                <img src={image} alt="Original" className={`max-w-full max-h-[400px] object-contain ${loading ? 'opacity-50 blur-sm' : ''} transition-all`} />
                                {loading && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-xmas-red font-bold z-10">
                                        <Loader2 className="w-12 h-12 animate-spin mb-2" />
                                        <span>施展魔法中...</span>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {generatedImage && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button 
                                    onClick={downloadImage}
                                    className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-xmas-green transition-colors"
                                    title="下載圖片"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {!generatedImage && !loading && (
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <label className="block text-sm font-bold text-xmas-brown mb-2 flex items-center gap-2">
                                <Wand2 className="w-4 h-4" />
                                你想要施什麼魔法？
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="例如：戴上聖誕帽、背景變成雪地..."
                                    className="flex-1 border-2 border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:border-xmas-gold text-sm"
                                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                />
                                <button 
                                    onClick={handleGenerate}
                                    disabled={!prompt.trim()}
                                    className="bg-xmas-red text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                                >
                                    變身！
                                </button>
                            </div>
                            <div className="mt-2 flex gap-2 flex-wrap">
                                <span className="text-xs text-gray-500">試試看：</span>
                                {['加上復古濾鏡', '把背景換成北極', '所有人戴上麋鹿角', '變成卡通風格'].map(suggestion => (
                                    <button 
                                        key={suggestion}
                                        onClick={() => setPrompt(suggestion)}
                                        className="text-xs bg-white border border-orange-200 rounded-full px-2 py-1 text-orange-800 hover:bg-orange-100 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    {generatedImage && (
                        <div className="flex gap-3 justify-center">
                             <button 
                                onClick={() => {
                                    setGeneratedImage(null);
                                    setPrompt('');
                                }}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                再試一次
                            </button>
                            <button 
                                onClick={reset}
                                className="flex-1 bg-xmas-green text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-800 transition-colors"
                            >
                                換一張照片
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    </section>
  );
};

export default MagicPhotoBooth;