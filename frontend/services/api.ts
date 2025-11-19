// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAuthToken = () => localStorage.getItem('adminToken');

export const setAuthToken = (token: string) => {
  localStorage.setItem('adminToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUsername');
};

// ==================== AUTH ENDPOINTS ====================

export const authLogin = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Password change failed');
  }

  return response.json();
};

// ==================== PRODUCTS ENDPOINTS ====================

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  // Normalize DB fields to frontend model
  const apiBase = API_URL.replace(/\/api\/?$/, '');
  return (data || []).map((p: any) => {
    const specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || {});
    let imageUrl = p.image_url || p.imageUrl || '';
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${apiBase}/${imageUrl.replace(/^\//, '')}`;
    }

    const category = p.category || p.category_name || '';
    const categorySlug = p.category_slug || p.categorySlug || (category ? category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');

    return {
      id: p.id,
      name: p.name,
      category,
      categorySlug,
      description: p.description,
      imageUrl,
      specifications: specs,
    };
  });
};

export const getProductById = async (id: string | number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const p = await response.json();
  const apiBase = API_URL.replace(/\/api\/?$/, '');
  const specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || {});
  let imageUrl = p.image_url || p.imageUrl || '';
  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = `${apiBase}/${imageUrl.replace(/^\//, '')}`;
  }
  const category = p.category || '';
  const categorySlug = p.category_slug || (category ? category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');

  return {
    id: p.id,
    name: p.name,
    category,
    categorySlug,
    description: p.description,
    imageUrl,
    specifications: specs,
  };
};

export const createProduct = async (formData: FormData) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create product');
  }

  return response.json();
};

export const updateProduct = async (id: string | number, formData: FormData) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update product');
  }

  return response.json();
};

export const deleteProduct = async (id: string | number) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete product');
  }

  return response.json();
};

// ==================== ORDERS ENDPOINTS ====================

export const getOrders = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return response.json();
};

export const createOrder = async (orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productId: number;
  quantity: number;
  notes?: string;
}) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create order');
  }

  return response.json();
};

export const updateOrderStatus = async (id: string | number, status: string) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update order');
  }

  return response.json();
};

// ==================== QUOTES ENDPOINTS ====================

export const getQuotes = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/quotes`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }

  return response.json();
};

// Updated createQuote function to match server expectations and use the API_URL constant
export const createQuote = async (quoteData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  productIds: number[];
  details?: string;
  deliveryDate?: string;
  specialRequirements?: string;
  address: string;
}) => {
  const response = await fetch(`${API_URL}/quotes`, // Resolves to http://localhost:5000/api/quotes
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quoteData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create quote');
  }

  return response.json();
};

export const updateQuoteStatus = async (id: string | number, status: string) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/quotes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update quote');
  }

  return response.json();
};

// ==================== AGGREGATE / UTILITY ====================

export const getAllData = async () => {
  // Fetch products (public), orders and quotes (require auth)
  const [products, orders, quotes] = await Promise.all([
    getProducts(),
    getOrders().catch(() => []),
    getQuotes().catch(() => []),
  ]);

  return { products, orders, quotes };
};

export const fetchAndStoreAll = async () => {
  const { products, orders, quotes } = await getAllData();
  try {
    if (products) localStorage.setItem('appProducts', JSON.stringify(products));
    if (orders) localStorage.setItem('appOrders', JSON.stringify(orders));
    if (quotes) localStorage.setItem('appQuotes', JSON.stringify(quotes));
    return { products, orders, quotes };
  } catch (err) {
    throw new Error('Failed to store data in localStorage');
  }
};