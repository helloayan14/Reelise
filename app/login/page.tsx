"use client";

import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showpassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Please enter email and password to login");
            return;
        }

        try {
            const response = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (!response?.ok) throw new Error('Login failed');

            console.log('Login successful');
            router.push('/profile');
        } catch (error) {
            console.error(error);
            setError('Login failed due to server error or invalid credentials');
        }
    };

    return (
        <div className="relative flex items-center justify-center flex-col min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            


            {/* Login Box */}
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login to Start the Experience
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-black border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type={showpassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowPassword(!showpassword)}
                        >
                            {showpassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition font-semibold"
                    >
                        Login
                    </button>

                    <div>
                        <p className="text-center mt-4 text-black">
                            Don&apos;t have an account?
                            <a href="/register" className="text-blue-500 hover:underline">
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            {/* Error Toast */}
            {error && (
                <div className="mt-4">
                    <div className="toast">
                        <div className="alert alert-error text-white font-bold">
                            <span>{error}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
