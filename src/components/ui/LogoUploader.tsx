import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface LogoUploaderProps {
    logo: string | null;
    onUpload: (file: File | null) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ logo, onUpload }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            onUpload(file);
        }
    };

    const handleRemove = () => {
        onUpload(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Logo
            </label>

            {logo ? (
                <div className="relative group w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
                    <img src={logo} alt="Uploaded logo" className="max-h-full max-w-full object-contain p-2 rounded-full" />
                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-sm hover:bg-red-600 transition-colors"
                        title="Remove logo"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/10 transition-all group"
                >
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-blue-500">
                        Upload Logo
                    </span>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            )}
        </div>
    );
};
