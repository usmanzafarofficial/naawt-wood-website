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
  updateOrderStatus as apiUpdateOrderStatus,
  updateQuoteStatus as apiUpdateQuoteStatus,
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
  email: string;
  phone: string;
  company?: string;
  product: string;
  quantity: number;
  date: string;
  status: 'pending' | 'quoted' | 'rejected';
  details?: string;
  deliveryDate?: string;
  specialRequirements?: string;
  address: string;
}

interface AdminPageProps {
  navigateTo: (page: Page) => void;
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ navigateTo, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'products' | 'settings'>('products');
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
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
          email: quote.customer_email,
          phone: quote.customer_phone,
          company: quote.customer_company,
          product: productNames,
          quantity: 1,
          date: new Date(quote.created_at).toISOString().split('T')[0],
          status: quote.status,
          details: quote.details,
          deliveryDate: quote.delivery_date,
          specialRequirements: quote.special_requirements,
          address: quote.address,
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
        setNewProduct({ ...newProduct, imageUrl: result });

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
        const ext = blob.type.split('/')[1] || 'jpg';
        formData.append('image', blob, `image.${ext}`);
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
      await apiUpdateOrderStatus(id, status);
      await loadData();
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to update order'}`);
    }
  };

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      await apiUpdateQuoteStatus(id, status);
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
              Products
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'orders' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'quotes' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('quotes')}
            >
              Quotes
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'settings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Add New Product
                </button>
              </div>

              {isAddingProduct ? (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => {
                          const selectedCat = PRODUCT_CATEGORIES.find(c => c.name === e.target.value);
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                            categorySlug: selectedCat ? selectedCat.slug : ''
                          });
                        }}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select Category</option>
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <option key={cat.slug} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded" />
                        </div>
                      )}
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Dimensions</label>
                      <input
                        type="text"
                        value={newProduct.specifications.dimensions}
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          specifications: { ...newProduct.specifications, dimensions: e.target.value }
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Load Capacity</label>
                      <input
                        type="text"
                        value={newProduct.specifications.loadCapacity}
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          specifications: { ...newProduct.specifications, loadCapacity: e.target.value }
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddProduct}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {editingProduct ? 'Update Product' : 'Save Product'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img
                              src={product.imageUrl.startsWith('http') ? product.imageUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '')}/uploads/${product.imageUrl}`}
                              alt={product.name}
                              className="h-12 w-12 object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                              }}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className={`text-sm rounded-full px-3 py-1 font-semibold ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                              }`}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quotes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                      <tr key={quote.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{quote.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={quote.status}
                            onChange={(e) => updateQuoteStatus(quote.id, e.target.value as Quote['status'])}
                            className={`text-sm rounded-full px-3 py-1 font-semibold ${quote.status === 'quoted' ? 'bg-green-100 text-green-800' :
                              quote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="quoted">Quoted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedQuote(quote)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Change Password</h3>
                <form onSubmit={handleChangePassword}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Update Password
                  </button>
                  {changePasswordMessage && (
                    <p className="mt-4 text-center text-sm font-medium">
                      {changePasswordMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quote Details Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Quote Details #{selectedQuote.id}</h3>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Customer Info</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-semibold">Name:</span> {selectedQuote.customer}</p>
                    <p><span className="font-semibold">Email:</span> {selectedQuote.email}</p>
                    <p><span className="font-semibold">Phone:</span> {selectedQuote.phone}</p>
                    {selectedQuote.company && <p><span className="font-semibold">Company:</span> {selectedQuote.company}</p>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Request Info</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-semibold">Date:</span> {selectedQuote.date}</p>
                    <p><span className="font-semibold">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${selectedQuote.status === 'quoted' ? 'bg-green-100 text-green-800' :
                        selectedQuote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {selectedQuote.status.toUpperCase()}
                      </span>
                    </p>
                    {selectedQuote.deliveryDate && <p><span className="font-semibold">Delivery Needed:</span> {selectedQuote.deliveryDate}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Products</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{selectedQuote.product}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Delivery Address</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedQuote.address}</p>
                </div>
              </div>

              {(selectedQuote.details || selectedQuote.specialRequirements) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Additional Details</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    {selectedQuote.details && (
                      <div>
                        <p className="font-semibold text-gray-700">Project Details:</p>
                        <p className="whitespace-pre-wrap">{selectedQuote.details}</p>
                      </div>
                    )}
                    {selectedQuote.specialRequirements && (
                      <div>
                        <p className="font-semibold text-gray-700">Special Requirements:</p>
                        <p className="whitespace-pre-wrap">{selectedQuote.specialRequirements}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedQuote(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;