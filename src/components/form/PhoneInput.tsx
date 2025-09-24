'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { countries, Country } from '@/data/countries';

interface PhoneInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ label, name, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Default to Pakistan (+92) or the first country in the list
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.code === 'PK') || countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries based on search term
  const filteredCountries = useMemo(() =>
    countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dial_code.includes(searchTerm)
    ), [searchTerm]);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update parent form when country or number changes
  const handlePhoneNumberChange = (number: string) => {
    setPhoneNumber(number);
    const event = {
      target: { name, value: `${selectedCountry.dial_code} ${number}` },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    const event = {
      target: { name, value: `${country.dial_code} ${phoneNumber}` },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        {/* Country Selector Button */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-full bg-white border border-gray-300 rounded-l-md shadow-sm pl-3 pr-8 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 h-full"
          >
            <span className="flex items-center">
              <img
                src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                alt={`${selectedCountry.name} flag`}
                className="flex-shrink-0 h-5 w-5 rounded-full"
              />
              <span className="ml-2 text-black text-sm">{selectedCountry.dial_code}</span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>

          {/* Dropdown Panel */}
          {isOpen && (
            <div className="absolute z-10 mt-1 w-72 bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none max-h-60">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-black"
                />
              </div>
              <ul>
                {filteredCountries.map((country) => (
                  <li
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-black"
                  >
                    <div className="flex items-center">
                      <img
                        src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                        alt=""
                        className="flex-shrink-0 h-5 w-5 rounded-full"
                      />
                      <span className="font-normal ml-3 block truncate">{country.name}</span>
                      <span className="text-gray-500 ml-auto">{country.dial_code}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Phone Number Input */}
        <input
          type="tel"
          name={name}
          id={name}
          value={phoneNumber}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          className={`block w-full px-3 py-2 border rounded-r-md sm:text-sm bg-white text-black placeholder-gray-400 ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-red-500 focus:border-red-500`}
          placeholder="555-000-0000"
        />
      </div>
       {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PhoneInput;