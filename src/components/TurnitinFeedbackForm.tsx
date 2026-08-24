'use client';

import React, { useState } from 'react';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function TurnitinFeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message) newErrors.message = 'Feedback message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'An unexpected error occurred.');
      }

      setStatusMessage({ type: 'success', text: result.message });
      setFormData({ name: '', email: '', message: '' });
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

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Send us your Feedback
          </h2>
          <p className="text-lg text-gray-600">
            We'd love to hear your thoughts on our Turnitin detection service
          </p>
        </div>

        {/* Feedback Form Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none placeholder-gray-600 text-gray-900 ${
                  errors.name
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-black focus:ring-2 focus:ring-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none placeholder-gray-600 text-gray-900 ${
                  errors.email
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-black focus:ring-2 focus:ring-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your feedback or suggestions..."
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none resize-none placeholder-gray-600 text-gray-900 ${
                  errors.message
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-black focus:ring-2 focus:ring-gray-300'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 font-medium">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Status Message */}
            {statusMessage.text && (
              <div
                className={`p-4 rounded-lg font-medium text-center ${
                  statusMessage.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-lg hover:from-black hover:to-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-md"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Sending...
                </span>
              ) : (
                'Send Feedback'
              )}
            </button>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center mt-8 text-sm text-gray-600">
          We read and appreciate every piece of feedback. Thank you for helping
          us improve!
        </p>
      </div>
    </div>
  );
}
