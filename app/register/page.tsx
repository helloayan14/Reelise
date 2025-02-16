'use client';


import { useRouter } from 'next/navigation';
import { useState} from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '', confirmPassword: '' });
    let isValid = true;

    if (!formData.email.includes('@')) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
      isValid = false;
    }
    if (formData.password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters long' }));
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords don't match" }));
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            })
         

            if (response.ok) {
                console.log('Registration successful');
                setFormData({ email: '', password: '', confirmPassword: '' });
                setErrors({ email: '', password: '', confirmPassword: '' });
                router.push('/login')
            } else {
                console.error('Registration failed');
            }

            
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setLoading(false);

      }
    }


  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <form onSubmit={handleSubmit} className="card w-[500px] bg-white p-8 shadow-2xl rounded-3xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

        <div>
          <label className="label text-lg text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full p-3 text-lg rounded-xl text-black" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="label text-lg text-gray-700">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input input-bordered w-full p-3 text-lg rounded-xl  text-black" />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="label text-lg text-gray-700">Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input input-bordered w-full p-3 text-lg rounded-xl  text-black" />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" disabled={loading} className="btn hover:bg-purple-400 bg-blue-500 text-white w-full text-lg rounded-xl py-3">
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
