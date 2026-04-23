// src/components/ContactForm.tsx

'use client';

import React, { useState, useMemo } from 'react';
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

interface ServiceOption {
    value: string;
    label: string;
}

interface ContactFormProps {
    title: string;
    subtitle: string;
    serviceOptions?: ServiceOption[];
    serviceName?: string; // NEW: Service name to include in email
}

export default function ContactForm({ title, subtitle, serviceOptions, serviceName }: ContactFormProps) {
    const [formData, setFormData] = useState({
        fullName: '', email: '', subject: '', message: '', selectedService: '',
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
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.message) newErrors.message = 'Message is required';
        // Only require service selection if service options exist and serviceName is not passed
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
            // Prepare the payload with serviceName if available
            const payload: FormSubmissionPayload = {
                fullName: formData.fullName,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                ...(serviceName && { serviceName }), // Add serviceName if provided
                ...(formData.selectedService && { serviceName: formData.selectedService }), // Or use selected service
            };

            // Use the reusable helper function
            const result = await submitServiceForm(payload);

            if (!result.success) {
                setStatusMessage({ type: 'error', text: result.message });
                return;
            }

            setStatusMessage({ type: 'success', text: result.message });
            setFormData({ fullName: '', email: '', subject: '', message: '', selectedService: '' });

        } catch (error) {
            // Check if the caught object is an actual Error to safely access its message
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