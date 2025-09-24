// src/components/ContactForm.tsx

'use client';

import React, { useState, useMemo } from 'react';
import PhoneInput from './form/PhoneInput';

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

interface ServiceOption {
    value: string;
    label: string;
}

interface ContactFormProps {
    title: string;
    subtitle: string;
    serviceOptions?: ServiceOption[];
}

export default function ContactForm({ title, subtitle, serviceOptions }: ContactFormProps) {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', service: '', message: '',
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof formData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.service) newErrors.service = 'Please select a service';
        if (!formData.message) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ================== THIS IS THE UPDATED SUBMIT FUNCTION ==================
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        setIsSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'An unexpected error occurred.');
            }
            
            setStatusMessage({ type: 'success', text: result.message });
            setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });

        } catch (error: any) {
            setStatusMessage({ type: 'error', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };
    // =======================================================================

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Type your answer here..." required error={errors.firstName} />
                    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Type your answer here..." required error={errors.lastName} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Type your answer here..." required error={errors.email} />
                    <PhoneInput
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                </div>
                <Select label="How can we help you?" name="service" value={formData.service} onChange={handleChange} options={finalServiceOptions} required error={errors.service} />
                <Textarea label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="Type your answer here..." rows={5} required error={errors.message} />
                
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