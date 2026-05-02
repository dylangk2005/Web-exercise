'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/schema';
import { registerAction } from '@/actions/register';
import { useState } from 'react';

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur', // Real-time validation on blur
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setServerMessage(null);

    try {
      // Client-side validation already passed (via Zod resolver)
      // Now submit to server
      const result = await registerAction(data);

      if (result.success) {
        setServerMessage({
          type: 'success',
          message: result.message,
        });
        reset(); // Clear form on success
      } else {
        setServerMessage({
          type: 'error',
          message: result.message,
        });
      }
    } catch (error) {
      setServerMessage({
        type: 'error',
        message: 'Có lỗi xảy ra',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Đăng Ký Tài Khoản</h1>

      {serverMessage && (
        <div
          className={`p-4 mb-6 rounded-md ${
            serverMessage.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {serverMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="example@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mật Khẩu
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="Tối thiểu 8 ký tự, có chữ hoa và chữ số"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Xác Nhận Mật Khẩu
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên
          </label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            placeholder="Nhập tên của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Họ
          </label>
          <input
            {...register('lastName')}
            type="text"
            id="lastName"
            placeholder="Nhập họ của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Số Điện Thoại
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="Nhập 10 chữ số"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
            Ngày Sinh
          </label>
          <input
            {...register('dateOfBirth')}
            type="date"
            id="dateOfBirth"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Địa Chỉ
          </label>
          <input
            {...register('address')}
            type="text"
            id="address"
            placeholder="Nhập địa chỉ của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            Thành Phố
          </label>
          <select
            {...register('city')}
            id="city"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn thành phố</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hochiminh">Thành phố Hồ Chí Minh</option>
            <option value="danang">Đà Nẵng</option>
            <option value="haiphong">Hải Phòng</option>
            <option value="cantho">Cần Thơ</option>
          </select>
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center">
          <input
            {...register('agreedToTerms')}
            type="checkbox"
            id="agreedToTerms"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="agreedToTerms" className="ml-2 text-sm text-gray-700">
            Tôi đồng ý với các điều khoản và chính sách bảo mật
          </label>
        </div>
        {errors.agreedToTerms && (
          <p className="mt-1 text-sm text-red-600">{errors.agreedToTerms.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Đăng Ký'}
        </button>
      </form>
    </div>
  );
}
