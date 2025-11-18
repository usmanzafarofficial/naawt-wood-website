# Admin Panel Guide

## Overview
The Admin Panel is a comprehensive management system for handling products, orders, and quotes on the NAAWT (No Angle Wood Trading) website.

## Accessing the Admin Panel

### Login Requirement
The admin panel requires authentication. You must be logged in to access it:
1. Navigate to the admin panel by clicking "Admin Panel" in the navigation menu (visible after login)
2. Or go to the URL: `http://localhost:5173/#admin` (when running locally)

### Login Instructions
- Click the "Login" button in the header
- Enter your admin credentials
- After successful login, the "Admin Panel" link becomes available in the navigation menu

## Admin Panel Features

### 1. **Orders Tab**
Manage all customer orders and track their status.

**Features:**
- View all orders with customer details
- Track order IDs, products, quantities, and dates
- Update order status through a dropdown menu
- Status options: Pending → Processing → Shipped → Delivered

**Columns:**
- **Order ID**: Unique identifier for each order
- **Customer**: Customer company name
- **Product**: Product name ordered
- **Quantity**: Number of units
- **Date**: Order date
- **Status**: Current order status (editable)

### 2. **Quotes Tab**
Manage customer quote requests and convert them to orders.

**Features:**
- View all quote requests
- Track quote status
- Convert quotes to orders (future functionality)
- Update quote status

**Status Options:**
- **Pending**: Quote request received, awaiting response
- **Quoted**: Quote has been sent to customer
- **Rejected**: Quote was rejected by customer

### 3. **Products Tab**
Add, edit, and delete products from the catalog.

## Product Management - Detailed Guide

### Adding a New Product

1. Click the **"Add Product"** button
2. Fill in all required fields (marked with *):
   - **Product Name**: The full name of the product (e.g., "New Standard Wooden Pallet")
   - **Category**: Select from existing categories or create a new one
   - **Image URL**: Path to the product image (e.g., `/images/newpallet.png`)
   - **Description**: Detailed product description

3. Fill in specifications:
   - **Dimensions**: Size of the product (e.g., "1200 x 1000mm")
   - **Material**: Choose from Wood, Plastic, or Presswood
   - **Load Capacity**: Maximum weight capacity (e.g., "1500kg Dynamic")
   - **Weight**: Approximate weight of the product
   - **Entry Points**: 2-way or 4-way entry
   - **Treatment**: Special treatment if applicable (e.g., "Heat-Treated (ISPM15)")
   - **Notes**: Additional information or special features

4. Click **"Save Product"** to add the product to the catalog

### Editing a Product

1. Click the **"Edit"** button next to the product in the table
2. Modify the product details as needed
3. Click **"Update Product"** to save changes
4. Click **"Cancel"** to discard changes

### Deleting a Product

1. Click the **"Delete"** button next to the product in the table
2. The product will be immediately removed from the catalog
3. **Note**: This action cannot be undone. Products will need to be re-added if deleted by mistake.

## Product Categories

Available product categories:
- New Wooden Pallets
- Used Wooden Pallets
- Plastic Pallets
- Heat Treated Pallets
- Pallet Collars & Cases
- Pallet Collection Service

## Product Example

Here's an example of a complete product entry:

```
Name: New Standard Wooden Pallet
Category: New Wooden Pallets
Description: Brand new, durable wooden pallets built to standard UK and EU sizes. Perfect for all general freight and storage needs.
Image URL: /images/newpallet.png

Specifications:
- Dimensions: 1200 x 1000mm
- Material: Wood
- Load Capacity: 1500kg Dynamic
- Weight: Approx. 25kg
- Entry Points: 4-way
- Treatment: (leave blank if not applicable)
- Notes: Sturdy construction for heavy loads and repeated use.
```

## Data Structure

### Product Interface
Products are structured with the following properties:

```typescript
interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  imageUrl: string;
  specifications: {
    dimensions: string;
    material: 'Wood' | 'Plastic' | 'Presswood';
    loadCapacity: string;
    treatment?: 'Heat-Treated (ISPM15)';
    weight?: string;
    entryPoints?: '2-way' | '4-way';
    notes?: string;
  };
}
```

## Important Notes

### Data Storage
- **Current Implementation**: Products are stored in the component's React state. Changes are NOT persisted to a backend.
- **For Production**: To make changes persistent, you'll need to:
  1. Connect to a backend database (e.g., PHP database)
  2. Implement API endpoints for CRUD operations
  3. Update the admin panel to use these API endpoints

### Image Files
- Store all product images in the `/public/images/` directory
- Reference them in the Image URL field as `/images/filename.png`
- Supported formats: PNG, JPG, SVG, WebP

### Best Practices
1. Use consistent naming conventions for products
2. Provide detailed, accurate descriptions
3. Ensure all images are optimized for web (compressed)
4. Keep specifications consistent with actual product details
5. Regularly review and update product information

## Troubleshooting

**Issue**: Admin panel shows "Please log in to access admin panel" message
- **Solution**: Make sure you're logged in. Click the "Login" button in the header first.

**Issue**: Adding a product fails with error
- **Solution**: Ensure all required fields (marked with *) are filled in before saving.

**Issue**: Product changes disappear after page refresh
- **Solution**: This is normal in the current implementation as data is stored in React state only. To make changes permanent, connect to a backend database.

**Issue**: Image doesn't load for a product
- **Solution**: Check that the image file exists in `/public/images/` and the URL path is correct.

## Next Steps for Integration

To fully integrate the admin panel with a backend:

1. **Create API Endpoints** (in PHP backend):
   - `POST /api/products` - Add new product
   - `GET /api/products` - Get all products
   - `PUT /api/products/:id` - Update product
   - `DELETE /api/products/:id` - Delete product

2. **Update AdminPage Component**:
   - Replace mock data with API calls
   - Add loading states and error handling
   - Implement proper form validation

3. **Add Authentication**:
   - Implement JWT or session-based authentication
   - Protect admin endpoints with authentication middleware

4. **Database Setup**:
   - Create products table in your database
   - Define proper relationships and constraints

## Support

For additional support or questions, please refer to:
- Project documentation in the `/docs` folder
- Backend API documentation
- React/TypeScript documentation

