import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Monitor } from 'lucide-react';
import { ColorPicker } from './ui/ColorPicker';
import { LogoUploader } from './ui/LogoUploader';

export const QRCodeGenerator: React.FC = () => {
    const [text, setText] = useState('https://example.com');
    const [debouncedText, setDebouncedText] = useState(text);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [logo, setLogo] = useState<string | null>(null);
    const [logoSize, setLogoSize] = useState(24);
    const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
    const [size] = useState(300);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(text);
        }, 300);
        return () => clearTimeout(handler);
    }, [text]);

    const handleDownload = () => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `qrcode-${Date.now()}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const handleLogoUpload = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    const size = Math.min(img.width, img.height);
                    canvas.width = size;
                    canvas.height = size;

                    // Circular clipping
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();

                    // Draw image centered
                    ctx.drawImage(
                        img,
                        (img.width - size) / 2,
                        (img.height - size) / 2,
                        size,
                        size,
                        0,
                        0,
                        size,
                        size
                    );

                    setLogo(canvas.toDataURL());
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        } else {
            setLogo(null);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto p-4 sm:p-6">

            <div className="flex-1 space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <Monitor size={20} /> Content
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                URL or Text
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none h-24"
                                placeholder="Enter URL or text..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Error Correction Level
                            </label>
                            <select
                                value={errorLevel}
                                onChange={(e) => setErrorLevel(e.target.value as any)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="L">Low (7%)</option>
                                <option value="M">Medium (15%)</option>
                                <option value="Q">Quartile (25%)</option>
                                <option value="H">High (30%)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Use 'High' if you add a logo to ensure scanability.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Design</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ColorPicker label="Background Color" value={bgColor} onChange={setBgColor} />
                            <ColorPicker label="Dots Color" value={fgColor} onChange={setFgColor} />
                        </div>

                        <LogoUploader logo={logo} onUpload={handleLogoUpload} />

                        {logo && (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Logo Size</label>
                                    <span className="text-xs text-gray-500">{Math.round(logoSize)}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="60"
                                    value={logoSize}
                                    onChange={(e) => setLogoSize(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="flex-1 lg:max-w-md">
                <div className="sticky top-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-6 aspect-square relative overflow-hidden">

                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]"></div>

                        <div className="relative z-10 bg-white p-4 rounded-xl shadow-sm">
                            <QRCodeCanvas
                                value={debouncedText}
                                size={size}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level={errorLevel}
                                includeMargin={true}
                                imageSettings={logo ? {
                                    src: logo,
                                    x: undefined,
                                    y: undefined,
                                    height: logoSize,
                                    width: logoSize,
                                    excavate: true,
                                } : undefined}
                            />
                        </div>

                        <div className="text-center space-y-1 z-10">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate max-w-xs mx-auto">
                                {debouncedText}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Download size={20} />
                        Download PNG
                    </button>
                </div>
            </div>
        </div>
    );
};
