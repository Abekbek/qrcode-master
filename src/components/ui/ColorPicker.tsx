import React from 'react';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {label}
            </label>
            <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:scale-105 active:scale-95">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 cursor-pointer border-0"
                    />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    spellCheck={false}
                />
            </div>
        </div>
    );
};
