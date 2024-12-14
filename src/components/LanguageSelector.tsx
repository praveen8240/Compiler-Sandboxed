import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onLanguageChange,
}) => {
  const languages: Language[] = ['javascript', 'python', 'cpp', 'java'];

  return (
    <select
      className="px-4 py-2 border border-gray-300 rounded-md bg-white"
      value={language}
      onChange={(e) => onLanguageChange(e.target.value as Language)}
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  );
}