// src/lib/api.ts
import { API_URL } from "@/config";
import type {
  RegisterPayload,
  LoginPayload,
  ProductPayload,
  StorePayload,
  OrderPayload,
  ProductQuery,
  Product,
  Store,
  Category,
  Order,
  SubOrder,
  Cart,
  VendorStats,
} from "@/types";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("agora_token")
      : null;
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// AUTH
export const authApi = {
  register: (data: RegisterPayload) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: LoginPayload) =>
    request<{ accessToken: string; refreshToken: string; user: { id: string; email: string; firstName: string; lastName: string; role: "client" | "vendeur" } }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  refresh: (refreshToken: string) =>
    request<{ accessToken: string }>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  me: () => request<{ id: string; email: string; firstName: string; lastName: string; role: "client" | "vendeur" }>("/api/auth/me"),
};

// PRODUCTS
export const productsApi = {
  getAll: (params?: ProductQuery) =>
    request<{ products: Product[]; total: number }>(
      `/api/products?${new URLSearchParams(params as Record<string, string>)}`
    ),
  getById: (id: string) => request<Product>(`/api/products/${id}`),
  search: (q: string) =>
    request<{ products: Product[]; total: number }>(
      `/api/products?q=${encodeURIComponent(q)}`
    ),
  create: (data: ProductPayload) =>
    request<Product>("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<ProductPayload>) =>
    request<Product>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  toggleActive: (id: string) =>
    request<Product>(`/api/products/${id}/toggle`, { method: "PATCH" }),
  updateStock: (id: string, stock: number) =>
    request<Product>(`/api/products/${id}/stock`, {
      method: "PATCH",
      body: JSON.stringify({ stock }),
    }),
  getSellerProducts: () =>
    request<{ products: Product[]; total: number }>("/api/seller/products"),
  delete: (id: string) =>
    request(`/api/products/${id}`, { method: "DELETE" }),
};

// STORES
export const storesApi = {
  getById: (id: string) => request<Store>(`/api/stores/${id}`),
  getProducts: (id: string, params?: ProductQuery) =>
    request<{ products: Product[]; total: number }>(
      `/api/stores/${id}/products?${new URLSearchParams(params as Record<string, string>)}`
    ),
  getMyStore: () => request<Store>("/api/store/me"),
  create: (data: StorePayload) =>
    request<Store>("/api/store", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (data: Partial<StorePayload>) =>
    request<Store>("/api/store", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// CART
export const cartApi = {
  get: () => request<Cart>("/api/cart"),
  add: (productId: string, quantity: number) =>
    request<Cart>("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),
  updateQuantity: (productId: string, quantity: number) =>
    request<Cart>("/api/cart/update-quantity", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    }),
  remove: (productId: string) =>
    request<Cart>("/api/cart/remove", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
    }),
  clear: () => request<Cart>("/api/cart/clear", { method: "DELETE" }),
};

// ORDERS
export const ordersApi = {
  create: (data: OrderPayload) =>
    request<Order>("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getClientOrders: () => request<Order[]>("/api/orders"),
  getById: (id: string) => request<Order>(`/api/orders/${id}`),
  getSellerOrders: () => request<SubOrder[]>("/api/seller/orders"),
  getSellerOrderById: (id: string) =>
    request<SubOrder>(`/api/seller/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    request<SubOrder>(`/api/seller/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};

// CATEGORIES
export const categoriesApi = {
  getAll: () => request<Category[]>("/api/categories"),
  create: (data: { name: string }) =>
    request<Category>("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: { name: string }) =>
    request<Category>(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    request(`/api/categories/${id}`, { method: "DELETE" }),
};

// VENDOR STATS
export const vendorApi = {
  getStats: () => request<VendorStats>("/api/seller/stats"),
  getLowStockProducts: () =>
    request<Product[]>("/api/seller/products/low-stock"),
};
