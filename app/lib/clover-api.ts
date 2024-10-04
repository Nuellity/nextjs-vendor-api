import axios, { AxiosInstance, AxiosError } from 'axios';
import { Product, Order } from '@/app/types';

const API_KEY = process.env.CLOVER_API_TOKEN;
const MERCHANT_ID = process.env.MERCHANT_ID;
const API_BASE_URL = `https://sandbox.dev.clover.com/v3/merchants/${MERCHANT_ID}`;
console.log(API_KEY, MERCHANT_ID, API_BASE_URL);


if (!API_KEY || !MERCHANT_ID) {
  throw new Error('CLOVER_API_TOKEN or MERCHANT_ID is not set in environment variables');
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

function handleApiError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error(`${context}:`, {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });
    if (axiosError.response?.status === 401) {
      console.error('Authentication failed. Please check your API key and permissions.');
    }
  } else {
    console.error(`${context}:`, error);
  }
  throw error;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await api.get('/items');
    return response.data.elements;
  } catch (error) {
    handleApiError(error, 'Error fetching products');
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Error fetching product with id ${id}`);
  }
}

export async function createOrder(order: Partial<Order>): Promise<Order> {
  const response = await api.post('/v3/merchants/{mId}/orders', order);
  return response.data;
}

export async function getOrderById(id: string): Promise<Order> {
  const response = await api.get(`/v3/merchants/{mId}/orders/${id}`);
  return response.data;
}
