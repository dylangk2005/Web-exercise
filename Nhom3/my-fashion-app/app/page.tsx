"use client"; // Vì dùng useState và useEffect
import { useState, useEffect } from 'react';

export default function FashionPage() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/products/category/mens-shirts');
      const data = await response.json();

      // Sử dụng Math.random() để chọn ngẫu nhiên 1 sản phẩm
      const products = data.products;
      const randomIndex = Math.floor(Math.random() * products.length);
      setProduct(products[randomIndex]);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API lần đầu khi trang web load
  useEffect(() => {
    fetchRandomProduct();
  }, []);

  if (loading) return <div className="text-center mt-10">Đang tải sản phẩm...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Fashion Trending 2026</h1>

      {product && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center">
          <div className="bg-gray-50 rounded-xl mb-4 w-full flex justify-center p-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 object-contain"
            />
          </div>

          <div className="w-full text-left">
            <span className="text-blue-500 text-xs font-semibold">New Arrival</span>
            <div className="flex justify-between items-center mt-1">
              <h2 className="font-bold text-gray-800 truncate w-40">{product.title}</h2>
              <span className="text-red-500 font-bold">${product.price}</span>
            </div>
          </div>

          <button
            className="mt-6 bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => alert("Đã thêm vào giỏ hàng!")}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      )}

      <p className="mt-6 text-gray-500 text-sm italic">Nhấn F5 hoặc Refresh trang để đổi sản phẩm ngẫu nhiên</p>
    </div>
  );
}