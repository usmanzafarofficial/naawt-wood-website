import React, { useState, useEffect } from 'react';
import { Page, Product } from '../types';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../constants';
import {
  getProducts,
  getOrders,
  getQuotes,
  createProduct,
  updateProduct,
  deleteProduct,
  updateOrderStatus,
  updateQuoteStatus,
  changePassword,
} from '../services/api';

interface Order {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

interface Quote {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  date: string;
  status: 'pending' | 'quoted' | 'rejected';
}

interface AdminPageProps {
  navigateTo: (page: Page) => void;
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ navigateTo, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'products' | 'settings'>('products');
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [changePasswordMessage, setChangePasswordMessage] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ 
    name: '', 
    category: '',
    categorySlug: '',
    description: '', 
    imageUrl: '',
    specifications: {
      dimensions: '',
      material: 'Wood',
      loadCapacity: '',
      weight: '',
      treatment: undefined,
      entryPoints: '4-way',
      notes: ''
    }
  });

  // Load data from backend on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      // Load products
      const productsData = await getProducts();
      setProducts(productsData);

      // Load orders (map product_id -> product name)
      const ordersData = await getOrders();
      setOrders(ordersData.map((order: any) => {
        const prod = productsData.find((p: any) => Number(p.id) === Number(order.product_id));
        return {
          id: order.id.toString(),
          customer: order.customer_name,
          product: prod ? prod.name : String(order.product_id),
          quantity: order.quantity,
          date: new Date(order.created_at).toISOString().split('T')[0],
          status: order.status,
        };
      }));

      // Load quotes (map product_ids -> product names)
      const quotesData = await getQuotes();
      setQuotes(quotesData.map((quote: any) => {
        let productNames = '';
        try {
          const ids = Array.isArray(quote.product_ids) ? quote.product_ids : JSON.parse(quote.product_ids || '[]');
          if (Array.isArray(ids)) {
            productNames = ids.map((id: any) => {
              const p = productsData.find((pp: any) => Number(pp.id) === Number(id));
              return p ? p.name : String(id);
            }).join(', ');
          } else {
            productNames = String(quote.product_ids || '');
          }
        } catch (e) {
          productNames = String(quote.product_ids || '');
        }

        return {
          id: quote.id.toString(),
          customer: quote.customer_name,
          product: productNames,
          quantity: 1,
          date: new Date(quote.created_at).toISOString().split('T')[0],
          status: quote.status,
        };
      }));
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to localStorage
      const savedProducts = localStorage.getItem('appProducts');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(PRODUCTS);
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  // Handle image upload from file
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local file URL for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        // In a real app, you'd upload to a server
        // For now, we'll save as base64
        setNewProduct({...newProduct, imageUrl: result});
        
        // Simulate upload progress
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 50);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.category || !newProduct.imageUrl) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('description', newProduct.description);
      formData.append('specifications', JSON.stringify(newProduct.specifications));

      // Handle image upload
      if (newProduct.imageUrl.startsWith('data:')) {
        const blob = await (await fetch(newProduct.imageUrl)).blob();
        formData.append('image', blob);
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }

      await loadData();

      // Reset form
      setNewProduct({ 
        name: '', 
        category: '',
        categorySlug: '',
        description: '', 
        imageUrl: '',
        specifications: {
          dimensions: '',
          material: 'Wood',
          loadCapacity: '',
          weight: '',
          treatment: undefined,
          entryPoints: '4-way',
          notes: ''
        }
      });
      setImagePreview('');
      setEditingProduct(null);
      setIsAddingProduct(false);
      setUploadProgress(0);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to save product'}`);
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setImagePreview(product.imageUrl);
    setEditingProduct(product);
    setIsAddingProduct(true);
  };

  const handleDeleteProduct = async (id: number | string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteProduct(id);
      await loadData();
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to delete product'}`);
    }
  };

  const handleCancelEdit = () => {
    setNewProduct({ 
      name: '', 
      category: '',
      categorySlug: '',
      description: '', 
      imageUrl: '',
      specifications: {
        dimensions: '',
        material: 'Wood',
        loadCapacity: '',
        weight: '',
        treatment: undefined,
        entryPoints: '4-way',
        notes: ''
      }
    });
    setImagePreview('');
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(currentPassword, newPassword);
      setChangePasswordMessage('✅ Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setChangePasswordMessage(''), 3000);
    } catch (error) {
      setChangePasswordMessage(`❌ ${error instanceof Error ? error.message : 'Failed to change password'}`);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await updateOrderStatus(id, status);
      await loadData();
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to update order'}`);
    }
  };

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      await updateQuoteStatus(id, status);
      await loadData();
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to update quote'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoadingData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600 mx-auto mb-4"></div>
            <p className="text-gray-700">Loading data...</p>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigateTo('home')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Back to Website
            </button>
            <button 
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'products' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('products')}
            >
              📦 Products
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'orders' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('orders')}
            >
              🛒 Orders
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'quotes' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('quotes')}
            >
              💬 Quotes
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'settings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">{order.id}</td>
                        <td className="px-6 py-4 text-sm font-medium">{order.customer}</td>
                        <td className="px-6 py-4 text-sm">{order.product}</td>
                        <td className="px-6 py-4 text-sm">{order.quantity}</td>
                        <td className="px-6 py-4 text-sm">{order.date}</td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Quotes Management</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Quote ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">{quote.id}</td>
                        <td className="px-6 py-4 text-sm font-medium">{quote.customer}</td>
                        <td className="px-6 py-4 text-sm">{quote.product}</td>
                        <td className="px-6 py-4 text-sm">{quote.quantity}</td>
                        <td className="px-6 py-4 text-sm">{quote.date}</td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={quote.status}
                            onChange={(e) => updateQuoteStatus(quote.id, e.target.value as Quote['status'])}
                            className="border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="quoted">Quoted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Product Management</h2>
                {!isAddingProduct && (
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    + Add Product
                  </button>
                )}
              </div>

              {isAddingProduct && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-medium mb-4">{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Product Image Upload */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        {imagePreview ? (
                          <div className="relative">
                            <img src={imagePreview} alt="Preview" className="h-40 w-40 object-cover rounded mx-auto" />
                            {uploadProgress > 0 && uploadProgress < 100 && (
                              <div className="mt-2 bg-gray-200 rounded h-2">
                                <div className="bg-green-600 h-2 rounded" style={{width: `${uploadProgress}%`}}></div>
                              </div>
                            )}
                            {uploadProgress === 100 && <p className="text-center text-green-600 mt-2">✅ Uploaded successfully!</p>}
                          </div>
                        ) : (
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-8l-3.172-3.172a4 4 0 00-5.656 0L28 20M8 20l3.172-3.172a4 4 0 015.656 0L28 20" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Drag image here or click to upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="mt-2 w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="E.g., New Standard Wooden Pallet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => {
                          const selected = PRODUCT_CATEGORIES.find(c => c.name === e.target.value);
                          setNewProduct({
                            ...newProduct, 
                            category: e.target.value,
                            categorySlug: selected?.slug || ''
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select a category</option>
                        {PRODUCT_CATEGORIES.map(cat => (
                          <option key={cat.slug} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                      <input
                        type="text"
                        value={newProduct.specifications.dimensions}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {...newProduct.specifications, dimensions: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="E.g., 1200 x 1000mm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                      <select
                        value={newProduct.specifications.material}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {...newProduct.specifications, material: e.target.value as 'Wood' | 'Plastic' | 'Presswood'}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Wood">Wood</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Presswood">Presswood</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Load Capacity</label>
                      <input
                        type="text"
                        value={newProduct.specifications.loadCapacity}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {...newProduct.specifications, loadCapacity: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="E.g., 1500kg Dynamic"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                      <input
                        type="text"
                        value={newProduct.specifications.weight || ''}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {...newProduct.specifications, weight: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="E.g., Approx. 25kg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Entry Points</label>
                      <select
                        value={newProduct.specifications.entryPoints || '4-way'}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {...newProduct.specifications, entryPoints: e.target.value as '2-way' | '4-way'}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="2-way">2-way</option>
                        <option value="4-way">4-way</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                      <input
                        type="text"
                        value={newProduct.specifications.treatment || ''}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {...newProduct.specifications, treatment: e.target.value as 'Heat-Treated (ISPM15)' | undefined}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="E.g., Heat-Treated (ISPM15)"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Product description"
                        rows={3}
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={newProduct.specifications.notes || ''}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {...newProduct.specifications, notes: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Additional notes"
                        rows={2}
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={handleAddProduct}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      {editingProduct ? '💾 Update Product' : '➕ Save Product'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Material</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded" />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.specifications.material}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.specifications.loadCapacity}</td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-900 font-semibold"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900 font-semibold"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4">📊 Total Products: <strong>{products.length}</strong></p>
            </div>
          )}
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>
              
              <div className="max-w-md bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">🔐 Change Password</h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter current password"
                    />
                    <p className="text-xs text-gray-500 mt-1">Default: <code className="bg-white px-1">admin</code></p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter new password (min. 4 characters)"
                    />
                  </div>

                  {changePasswordMessage && (
                    <div className={`p-3 rounded text-sm ${changePasswordMessage.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {changePasswordMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    🔄 Change Password
                  </button>
                </form>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg max-w-md">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">ℹ️ Admin Information</h3>
                <p className="text-sm text-blue-800">
                  <strong>Username:</strong> admin<br/>
                  <strong>Current Password:</strong> admin<br/>
                  <strong>Products Saved:</strong> {products.length}<br/>
                  <strong>Session:</strong> Active ✅
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;