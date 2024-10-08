"use client";

import Image from "next/image";
import { Product } from "../types";
import { useCartStore } from "../lib/store";

interface ProductCardProps {
  product: Product;
}

function getImageUrl(productName: string): string {
  return `/assets/images/${productName.toLowerCase()}.jpg`;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={getImageUrl(product.name)}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-contain"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">
          ${(product.price / 100).toFixed(2)}
        </p>
        <button
          onClick={() => addItem(product)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
