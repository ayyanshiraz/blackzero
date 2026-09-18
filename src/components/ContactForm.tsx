// src/components/ContactForm.tsx

'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import PhoneInput from './form/PhoneInput';
import { submitServiceForm, type FormSubmissionPayload } from '@/lib/formSubmissionHelper';

// --- Reusable UI Components (These remain the same) ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string;
}
const Input: React.FC<InputProps> = ({ label, name, error, required, ...rest }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
            {label} {required && <span className="text-gray-400">(Required)</span>}
        </label>
        <input id={name} name={name} className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white text-black placeholder-gray-400`} {...rest} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    error?: string;
}
const Select: React.FC<SelectProps> = ({ label, name, options, error, required, ...rest }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
            {label} {required && <span className="text-gray-400">(Required)</span>}
        </label>
        <select id={name} name={name} className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-white text-black`} {...rest}>
            {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.value === ''}>{option.label}</option>
            ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    error?: string;
}
const Textarea: React.FC<TextareaProps> = ({ label, name, error, required, ...rest }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
            {label} {required && <span className="text-gray-400">(Required)</span>}
        </label>
        <textarea id={name} name={name} className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white text-black placeholder-gray-400`} {...rest} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => (
    <button className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`} {...rest}>
        {children}
    </button>
);


// --- The Main Contact Form Component ---

const countryCodes = [
    { iso: `pk`, dial: `+92` },
    { iso: `af`, dial: `+93` }, { iso: `al`, dial: `+355` }, { iso: `dz`, dial: `+213` }, { iso: `ad`, dial: `+376` },
    { iso: `ao`, dial: `+244` }, { iso: `ag`, dial: `+1` }, { iso: `ar`, dial: `+54` }, { iso: `am`, dial: `+374` },
    { iso: `au`, dial: `+61` }, { iso: `at`, dial: `+43` }, { iso: `az`, dial: `+994` }, { iso: `bs`, dial: `+1` },
    { iso: `bh`, dial: `+973` }, { iso: `bd`, dial: `+880` }, { iso: `bb`, dial: `+1` }, { iso: `by`, dial: `+375` },
    { iso: `be`, dial: `+32` }, { iso: `bz`, dial: `+501` }, { iso: `bj`, dial: `+229` }, { iso: `bt`, dial: `+975` },
    { iso: `bo`, dial: `+591` }, { iso: `ba`, dial: `+387` }, { iso: `bw`, dial: `+267` }, { iso: `br`, dial: `+55` },
    { iso: `bn`, dial: `+673` }, { iso: `bg`, dial: `+359` }, { iso: `bf`, dial: `+226` }, { iso: `bi`, dial: `+257` },
    { iso: `kh`, dial: `+855` }, { iso: `cm`, dial: `+237` }, { iso: `ca`, dial: `+1` }, { iso: `cv`, dial: `+238` },
    { iso: `cf`, dial: `+236` }, { iso: `td`, dial: `+235` }, { iso: `cl`, dial: `+56` }, { iso: `cn`, dial: `+86` },
    { iso: `co`, dial: `+57` }, { iso: `km`, dial: `+269` }, { iso: `cg`, dial: `+242` }, { iso: `cd`, dial: `+243` },
    { iso: `cr`, dial: `+506` }, { iso: `hr`, dial: `+385` }, { iso: `cu`, dial: `+53` }, { iso: `cy`, dial: `+357` },
    { iso: `cz`, dial: `+420` }, { iso: `dk`, dial: `+45` }, { iso: `dj`, dial: `+253` }, { iso: `dm`, dial: `+1` },
    { iso: `do`, dial: `+1` }, { iso: `ec`, dial: `+593` }, { iso: `eg`, dial: `+20` }, { iso: `sv`, dial: `+503` },
    { iso: `gq`, dial: `+240` }, { iso: `er`, dial: `+291` }, { iso: `ee`, dial: `+372` }, { iso: `sz`, dial: `+268` },
    { iso: `et`, dial: `+251` }, { iso: `fj`, dial: `+679` }, { iso: `fi`, dial: `+358` }, { iso: `fr`, dial: `+33` },
    { iso: `ga`, dial: `+241` }, { iso: `gm`, dial: `+220` }, { iso: `ge`, dial: `+995` }, { iso: `de`, dial: `+49` },
    { iso: `gh`, dial: `+233` }, { iso: `gr`, dial: `+30` }, { iso: `gd`, dial: `+1` }, { iso: `gt`, dial: `+502` },
    { iso: `gn`, dial: `+224` }, { iso: `gw`, dial: `+245` }, { iso: `gy`, dial: `+592` }, { iso: `ht`, dial: `+509` },
    { iso: `hn`, dial: `+504` }, { iso: `hu`, dial: `+36` }, { iso: `is`, dial: `+354` }, { iso: `in`, dial: `+91` },
    { iso: `id`, dial: `+62` }, { iso: `ir`, dial: `+98` }, { iso: `iq`, dial: `+964` }, { iso: `ie`, dial: `+353` },
    { iso: `il`, dial: `+972` }, { iso: `it`, dial: `+39` }, { iso: `jm`, dial: `+1` }, { iso: `jp`, dial: `+81` },
    { iso: `jo`, dial: `+962` }, { iso: `kz`, dial: `+7` }, { iso: `ke`, dial: `+254` }, { iso: `ki`, dial: `+686` },
    { iso: `kp`, dial: `+850` }, { iso: `kr`, dial: `+82` }, { iso: `kw`, dial: `+965` }, { iso: `kg`, dial: `+996` },
    { iso: `la`, dial: `+856` }, { iso: `lv`, dial: `+371` }, { iso: `lb`, dial: `+961` }, { iso: `ls`, dial: `+266` },
    { iso: `lr`, dial: `+231` }, { iso: `ly`, dial: `+218` }, { iso: `li`, dial: `+423` }, { iso: `lt`, dial: `+370` },
    { iso: `lu`, dial: `+352` }, { iso: `mg`, dial: `+261` }, { iso: `mw`, dial: `+265` }, { iso: `my`, dial: `+60` },
    { iso: `mv`, dial: `+960` }, { iso: `ml`, dial: `+223` }, { iso: `mt`, dial: `+356` }, { iso: `mh`, dial: `+692` },
    { iso: `mr`, dial: `+222` }, { iso: `mu`, dial: `+230` }, { iso: `mx`, dial: `+52` }, { iso: `fm`, dial: `+691` },
    { iso: `md`, dial: `+373` }, { iso: `mc`, dial: `+377` }, { iso: `mn`, dial: `+976` }, { iso: `me`, dial: `+382` },
    { iso: `ma`, dial: `+212` }, { iso: `mz`, dial: `+258` }, { iso: `mm`, dial: `+95` }, { iso: `na`, dial: `+264` },
    { iso: `nr`, dial: `+674` }, { iso: `np`, dial: `+977` }, { iso: `nl`, dial: `+31` }, { iso: `nz`, dial: `+64` },
    { iso: `ni`, dial: `+505` }, { iso: `ne`, dial: `+227` }, { iso: `ng`, dial: `+234` }, { iso: `mk`, dial: `+389` },
    { iso: `no`, dial: `+47` }, { iso: `om`, dial: `+968` }, { iso: `pw`, dial: `+680` }, { iso: `pa`, dial: `+507` }, 
    { iso: `pg`, dial: `+675` }, { iso: `py`, dial: `+595` }, { iso: `pe`, dial: `+51` }, { iso: `ph`, dial: `+63` },
    { iso: `pl`, dial: `+48` }, { iso: `pt`, dial: `+351` }, { iso: `qa`, dial: `+974` }, { iso: `ro`, dial: `+40` },
    { iso: `ru`, dial: `+7` }, { iso: `rw`, dial: `+250` }, { iso: `kn`, dial: `+1` }, { iso: `lc`, dial: `+1` },
    { iso: `vc`, dial: `+1` }, { iso: `ws`, dial: `+685` }, { iso: `sm`, dial: `+378` }, { iso: `st`, dial: `+239` },
    { iso: `sa`, dial: `+966` }, { iso: `sn`, dial: `+221` }, { iso: `rs`, dial: `+381` }, { iso: `sc`, dial: `+248` },
    { iso: `sl`, dial: `+232` }, { iso: `sg`, dial: `+65` }, { iso: `sk`, dial: `+421` }, { iso: `si`, dial: `+386` },
    { iso: `sb`, dial: `+677` }, { iso: `so`, dial: `+252` }, { iso: `za`, dial: `+27` }, { iso: `ss`, dial: `+211` },
    { iso: `es`, dial: `+34` }, { iso: `lk`, dial: `+94` }, { iso: `sd`, dial: `+249` }, { iso: `sr`, dial: `+597` },
    { iso: `se`, dial: `+46` }, { iso: `ch`, dial: `+41` }, { iso: `sy`, dial: `+963` }, { iso: `tj`, dial: `+992` },
    { iso: `tz`, dial: `+255` }, { iso: `th`, dial: `+66` }, { iso: `tl`, dial: `+670` }, { iso: `tg`, dial: `+228` },
    { iso: `to`, dial: `+676` }, { iso: `tt`, dial: `+1` }, { iso: `tn`, dial: `+216` }, { iso: `tr`, dial: `+90` },
    { iso: `tm`, dial: `+993` }, { iso: `tv`, dial: `+688` }, { iso: `ug`, dial: `+256` }, { iso: `ua`, dial: `+380` },
    { iso: `ae`, dial: `+971` }, { iso: `gb`, dial: `+44` }, { iso: `us`, dial: `+1` }, { iso: `uy`, dial: `+598` },
    { iso: `uz`, dial: `+998` }, { iso: `vu`, dial: `+678` }, { iso: `va`, dial: `+379` }, { iso: `ve`, dial: `+58` },
    { iso: `vn`, dial: `+84` }, { iso: `ye`, dial: `+967` }, { iso: `zm`, dial: `+260` }, { iso: `zw`, dial: `+263` }
];

interface ServiceOption {
    value: string;
    label: string;
}

interface ContactFormProps {
    title: string;
    subtitle: string;
    serviceOptions?: ServiceOption[];
    serviceName?: string;
}

export default function ContactForm({ title, subtitle, serviceOptions, serviceName }: ContactFormProps) {
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', subject: '', message: '', selectedService: '',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof formData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.message) newErrors.message = 'Message is required';
        if (!serviceName && serviceOptions && serviceOptions.length > 0 && !formData.selectedService) {
            newErrors.selectedService = 'Please select a service';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        setIsSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone ? `${selectedCountry.dial} ${formData.phone}` : ``,
                subject: formData.subject,
                message: formData.message,
                ...(serviceName && { serviceName }),
                ...(formData.selectedService && { serviceName: formData.selectedService }),
            } as FormSubmissionPayload;

            const result = await submitServiceForm(payload);

            if (!result.success) {
                setStatusMessage({ type: 'error', text: result.message });
                return;
            }

            setStatusMessage({ type: 'success', text: result.message });
            setFormData({ fullName: '', email: '', phone: '', subject: '', message: '', selectedService: '' });

        } catch (error) {
            if (error instanceof Error) {
                setStatusMessage({ type: 'error', text: error.message });
            } else {
                setStatusMessage({ type: 'error', text: 'An unknown error occurred.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const finalServiceOptions = useMemo(() => {
        const defaultOptions = [
            { value: 'brand-strategy', label: 'Brand Strategy' },
            { value: 'web-development', label: 'Web Development' },
            { value: 'digital-marketing', label: 'Digital Marketing' },
            { value: 'other', label: 'Other' },
        ];
        
        const optionsToShow = serviceOptions && serviceOptions.length > 0 ? serviceOptions : defaultOptions;

        return [ { value: '', label: 'Select a service' }, ...optionsToShow ];
    }, [serviceOptions]);

    return (
        <div className="bg-black text-white p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">{title}</h2>
                <p className="mt-3 text-lg text-gray-300">{subtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 px-4 md:px-8">
                <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required error={errors.fullName} />
                
                <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required error={errors.email} />

                <div>
                    <label htmlFor={`phone`} className={`block text-sm font-medium text-gray-300 mb-1`}>Phone Number</label>
                    <div ref={dropdownRef} className={`mt-1 flex w-full bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-red-500 focus-within:border-red-500 relative`}>
                        <div
                            className={`flex items-center pl-3 pr-3 py-2 bg-transparent text-black border-r border-gray-300 cursor-pointer sm:text-sm hover:bg-gray-50 transition-colors`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.iso} className={`w-5 h-auto mr-2 shadow-sm`} />
                            <span className={`mr-2 font-medium`}>{selectedCountry.dial}</span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>

                        {isDropdownOpen && (
                            <ul className={`absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-xl z-50 py-1`}>
                                {countryCodes.map((c, i) => (
                                    <li
                                        key={i}
                                        className={`flex items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-black sm:text-sm transition-colors`}
                                        onClick={() => {
                                            setSelectedCountry(c);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt={c.iso} className={`w-5 h-auto mr-3 shadow-sm`} />
                                        <span className={`font-medium w-12`}>{c.dial}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <input
                            type={`tel`}
                            name={`phone`}
                            id={`phone`}
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={`Enter your phone number`}
                            className={`block w-full px-3 py-2 bg-transparent outline-none text-black placeholder-gray-400 sm:text-sm rounded-r-md`}
                        />
                    </div>
                </div>

                {!serviceName && finalServiceOptions.length > 1 && (
                    <Select 
                        label="Service" 
                        name="selectedService" 
                        value={formData.selectedService}
                        onChange={handleChange}
                        options={finalServiceOptions}
                        required={!serviceName}
                        error={errors.selectedService}
                    />
                )}
                
                <Input label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required error={errors.subject} />
                
                <Textarea label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="Type your message here..." rows={5} required error={errors.message} />
                
                {statusMessage.text && (
                    <div className={`p-3 text-center rounded-md text-sm ${
                        statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {statusMessage.text}
                    </div>
                )}
                
                <div className="text-left pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </div>
    );
}