import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  className?: string;
}

export default function BrandedSelect({ value, onChange, options, placeholder, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find(option => option.value === value);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}
        className="w-full flex items-center justify-between gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-gray-800 dark:text-gray-100 text-xs font-semibold transition-colors hover:border-[#00BFA5] focus:outline-none focus:ring-2 focus:ring-[#00BFA5]/20"
      >
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        <span className={`truncate ${selected ? '' : 'text-gray-400'}`}>{selected?.label ?? placeholder}</span>
      </button>
      <div className={`absolute left-0 right-0 top-[calc(100%+0.4rem)] z-50 origin-top rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-1.5 shadow-2xl transition-all duration-200 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} role="listbox">
        {options.map(option => (
          <button
            type="button"
            role="option"
            aria-selected={option.value === value}
            key={option.value}
            onClick={() => { onChange(option.value); setOpen(false); }}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-right text-xs transition-colors ${option.value === value ? 'bg-[#E0F7F4] dark:bg-teal-900/40 text-[#00897B] dark:text-teal-300 font-bold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            {option.value === value ? <Check size={14} /> : <span className="w-3.5" />}
            <span className="truncate">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
