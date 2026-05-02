'use server';

import { registerSchema, type RegisterFormData } from '@/lib/schema';

export async function registerAction(data: unknown) {
  try {
    // Double Validation (Server-side validation)
    const validatedData = registerSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { email, password, firstName, lastName, phone, dateOfBirth, address, city } =
      validatedData.data;

    // Simulate API call / Database operation
    console.log('Đang xử lý đăng ký:', {
      email,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address,
      city,
    });

    // In a real application, you would:
    // 1. Check if email already exists
    // 2. Hash the password
    // 3. Save to database
    // 4. Send confirmation email

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    return {
      success: true,
      message: 'Đăng ký thành công! Vui lòng kiểm tra email của bạn.',
    };
  } catch (error) {
    console.error('Lỗi server:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra trên máy chủ',
    };
  }
}
