# Admin Panel - Architecture & Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    App.tsx                              │   │
│  │  - Main application component                           │   │
│  │  - Handles authentication state (isLoggedIn)            │   │
│  │  - Routes to AdminPage when admin tab selected          │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                      │
│                         ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  AdminPage.tsx                          │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ STATE MANAGEMENT                                 │  │   │
│  │  │ ├─ activeTab (orders|quotes|products)            │  │   │
│  │  │ ├─ orders[] - order data                         │  │   │
│  │  │ ├─ quotes[] - quote data                         │  │   │
│  │  │ ├─ products[] - product data (from PRODUCTS)    │  │   │
│  │  │ ├─ isAddingProduct (boolean)                    │  │   │
│  │  │ ├─ editingProduct (Product | null)             │  │   │
│  │  │ └─ newProduct (Omit<Product, 'id'>)            │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ EVENT HANDLERS                                   │  │   │
│  │  │ ├─ handleAddProduct()                            │  │   │
│  │  │ ├─ handleEditProduct(product)                    │  │   │
│  │  │ ├─ handleCancelEdit()                            │  │   │
│  │  │ ├─ updateOrderStatus(id, status)                │  │   │
│  │  │ └─ updateQuoteStatus(id, status)                │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ UI SECTIONS                                      │  │   │
│  │  │ ├─ Header (title + back button)                 │  │   │
│  │  │ ├─ Tab Navigation                               │  │   │
│  │  │ ├─ Orders Tab                                   │  │   │
│  │  │ ├─ Quotes Tab                                   │  │   │
│  │  │ └─ Products Tab (with form + table)             │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER (Current)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  constants.ts     │  │   types.ts      │  │ AdminPage.ts │ │
│  │                   │  │                 │  │              │ │
│  │ ├─ PRODUCTS[]     │  │ ├─ Product      │  │ State stores:│ │
│  │ │ (8 products)    │  │ │ ├─ id         │  │ ├─ Products  │ │
│  │ │                 │  │ │ ├─ name       │  │ ├─ Orders    │ │
│  │ ├─ PRODUCT_       │  │ │ ├─ category   │  │ ├─ Quotes    │ │
│  │ │ CATEGORIES[]    │  │ │ ├─ imageUrl   │  │ └─ Forms     │ │
│  │ │ (6 categories)  │  │ │ ├─ specs      │  │              │ │
│  │ │                 │  │ │ └─ ...        │  │ (Not persisted
│  │ └─ TESTIMONIALS[] │  │ │                 │  │  across page  │
│  │   FAQS[]          │  │ └─ Quote        │  │  refresh)     │ │
│  │                   │  │ └─ Order        │  │              │ │
│  └───────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                                 │
│  ⚠️  NOTE: Data is only in React state, NOT in database       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│            PLANNED ARCHITECTURE (For Production)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend State (same as above)                                 │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ API Layer (fetch/axios)                                 │   │
│  │ ├─ POST /api/products (add)                             │   │
│  │ ├─ GET /api/products (fetch all)                        │   │
│  │ ├─ PUT /api/products/:id (update)                       │   │
│  │ └─ DELETE /api/products/:id (delete)                    │   │
│  └──────────────┬───────────────────────────────────────────┘   │
│                 │                                               │
│                 ▼                                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ PHP Backend API Endpoints                               │   │
│  │ ├─ api/products.php                                     │   │
│  │ ├─ api/orders.php                                       │   │
│  │ └─ api/quotes.php                                       │   │
│  └──────────────┬───────────────────────────────────────────┘   │
│                 │                                               │
│                 ▼                                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Database (MySQL/PostgreSQL)                             │   │
│  │ ├─ products table                                       │   │
│  │ ├─ orders table                                         │   │
│  │ ├─ quotes table                                         │   │
│  │ └─ categories table                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Add Product Flow

```
User Input
   │
   ▼
┌──────────────────┐
│ Add Product Form │
│ - Fill fields    │
│ - Add specs      │
└────────┬─────────┘
         │
         ▼
   ┌─────────────────┐
   │ User clicks     │
   │ Save Product    │
   └────────┬────────┘
            │
            ▼
    ┌───────────────────────┐
    │ Validation Check      │
    │ ├─ Name filled?       │
    │ ├─ Category set?      │
    │ ├─ Image URL set?     │
    │ └─ Description set?   │
    └────────┬──────────────┘
             │
        YES  │  NO
            /│\
           / │ \
        /    │    \
       /     ▼     \
      /   ALERT   ──┘
     /    Error
    │
    ▼
┌────────────────────────────────────┐
│ handleAddProduct()                 │
│ ├─ Create Product object           │
│ ├─ Add to products state           │
│ ├─ Reset form                      │
│ └─ Close form                      │
└────────┬─────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ Product appears in table           │
│ Display in Products list           │
└────────────────────────────────────┘

⚠️  Future: Send to backend via API
    POST /api/products
    Save to database
```

### Edit Product Flow

```
User Action
   │
   ▼
┌──────────────────────┐
│ Find product in table│
│ Click Edit button    │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────────┐
│ handleEditProduct()      │
│ ├─ Load product data     │
│ ├─ Set newProduct state  │
│ ├─ Set editingProduct    │
│ └─ Show form             │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────┐
│ Form displays with   │
│ current data filled  │
│ in fields            │
└────────┬─────────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
┌────────┐  ┌──────────┐
│ Modify │  │ Click    │
│ fields │  │ Update   │
└────┬───┘  └────┬─────┘
     │           │
     └─────┬─────┘
           │
           ▼
┌──────────────────────────┐
│ handleAddProduct()       │
│ (with editingProduct set)│
│ ├─ Update product       │
│ ├─ Map over array       │
│ ├─ Replace old product  │
│ ├─ Reset state          │
│ └─ Close form           │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────┐
│ Updated product     │
│ appears in table    │
└──────────────────────┘
```

### Delete Product Flow

```
User Action
   │
   ▼
┌──────────────────────┐
│ Find product in table│
│ Click Delete button  │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────────┐
│ setProducts()            │
│ ├─ Filter out product   │
│ ├─ Keep others          │
│ └─ Update state         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────┐
│ Product removed from │
│ table immediately    │
└──────────────────────┘

⚠️  WARNING: Cannot be undone!
    Future: Confirm dialog before delete
```

## Component Structure

```
AdminPage
├── Header
│   ├── Title
│   └── Back Button
│
├── Tab Navigation
│   ├── Orders Tab (active)
│   ├── Quotes Tab
│   └── Products Tab
│
├── Tab Content (rendered by activeTab)
│   │
│   ├─ Orders View
│   │  └── Orders Table
│   │      ├── Order ID
│   │      ├── Customer
│   │      ├── Product
│   │      ├── Quantity
│   │      ├── Date
│   │      ├── Status (dropdown)
│   │      └── Actions
│   │
│   ├─ Quotes View
│   │  └── Quotes Table
│   │      ├── Quote ID
│   │      ├── Customer
│   │      ├── Product
│   │      ├── Quantity
│   │      ├── Date
│   │      ├── Status (dropdown)
│   │      └── Actions (View, Convert)
│   │
│   └─ Products View
│      ├── Product Management Header
│      │   ├── Title
│      │   └── Add Product Button
│      │
│      ├── Add/Edit Form (conditional)
│      │   ├── Basic Info Section
│      │   │  ├── Product Name *
│      │   │  ├── Category *
│      │   │  ├── Image URL *
│      │   │  └── Description *
│      │   │
│      │   ├── Specifications Section
│      │   │  ├── Dimensions
│      │   │  ├── Material
│      │   │  ├── Load Capacity
│      │   │  ├── Weight
│      │   │  ├── Entry Points
│      │   │  ├── Treatment
│      │   │  └── Notes
│      │   │
│      │   └── Form Actions
│      │      ├── Save/Update Button
│      │      └── Cancel Button
│      │
│      └── Products Table
│         ├── Name
│         ├── Category
│         ├── Material
│         ├── Dimensions
│         ├── Load Capacity
│         └── Actions
│            ├── Edit Button
│            └── Delete Button
```

## State Management Diagram

```
AdminPage Component State
│
├─ activeTab: 'orders' | 'quotes' | 'products'
│  └─ Controls which tab content is displayed
│
├─ orders: Order[]
│  ├─ id, customer, product, quantity, date, status
│  └─ Mock data for demonstration
│
├─ quotes: Quote[]
│  ├─ id, customer, product, quantity, date, status
│  └─ Mock data for demonstration
│
├─ products: Product[]
│  ├─ Loaded from constants.PRODUCTS
│  └─ Updated when add/edit/delete
│
├─ isAddingProduct: boolean
│  └─ Controls form visibility
│
├─ editingProduct: Product | null
│  ├─ Null when adding new
│  └─ Set when editing existing
│
└─ newProduct: Omit<Product, 'id'>
   ├─ Form input state
   ├─ Basic fields: name, category, categorySlug, description, imageUrl
   └─ Specifications: dimensions, material, loadCapacity, etc.
```

## Function Call Flow

```
User Action → Event Handler → State Update → Re-render → UI Change

Example: Adding a Product

1. Click [Add Product] 
   → setIsAddingProduct(true)
   → Form appears

2. Fill form fields
   → setNewProduct({...})
   → State updates

3. Click [Save Product]
   → handleAddProduct()
     ├─ Validate inputs
     ├─ Create Product object
     ├─ setProducts([...products, newProduct])
     ├─ Reset form state
     ├─ setIsAddingProduct(false)
   → Component re-renders
   → New product appears in table
```

## Event Handler Connections

```
┌─────────────────────────────────────────────────┐
│ handleAddProduct()                              │
│ ├─ Validation check                            │
│ ├─ If editing:                                 │
│ │  └─ Update existing (map + replace)          │
│ ├─ If adding:                                  │
│ │  └─ Add to array                             │
│ ├─ Reset form                                  │
│ └─ Hide form                                   │
└─────────────────────────────────────────────────┘
        │
        ├─ Triggered by: Save Product button
        ├─ Updates state: products, editingProduct, newProduct
        └─ Causes re-render: Product table updates

┌─────────────────────────────────────────────────┐
│ handleEditProduct(product)                      │
│ ├─ Load product data into form                 │
│ ├─ Set editingProduct state                    │
│ ├─ Show form                                   │
│ └─ Copy product to newProduct state            │
└─────────────────────────────────────────────────┘
        │
        ├─ Triggered by: Edit button
        ├─ Updates state: newProduct, editingProduct, isAddingProduct
        └─ Causes re-render: Form populated with data

┌─────────────────────────────────────────────────┐
│ handleCancelEdit()                              │
│ ├─ Clear newProduct                            │
│ ├─ Clear editingProduct                        │
│ └─ Hide form                                   │
└─────────────────────────────────────────────────┘
        │
        ├─ Triggered by: Cancel button
        ├─ Updates state: newProduct, editingProduct, isAddingProduct
        └─ Causes re-render: Form disappears

┌─────────────────────────────────────────────────┐
│ Delete (inline onClick)                         │
│ setProducts(products.filter(p => p.id !== id))│
└─────────────────────────────────────────────────┘
        │
        ├─ Triggered by: Delete button
        ├─ Updates state: products
        └─ Causes re-render: Product removed from table

┌─────────────────────────────────────────────────┐
│ updateOrderStatus(id, status)                  │
│ ├─ Find order by id                            │
│ ├─ Update status                               │
│ └─ Update array                                │
└─────────────────────────────────────────────────┘
        │
        ├─ Triggered by: Status dropdown change
        ├─ Updates state: orders
        └─ Causes re-render: Status updates in table

┌─────────────────────────────────────────────────┐
│ updateQuoteStatus(id, status)                  │
│ ├─ Find quote by id                            │
│ ├─ Update status                               │
│ └─ Update array                                │
└─────────────────────────────────────────────────┘
        │
        ├─ Triggered by: Status dropdown change
        ├─ Updates state: quotes
        └─ Causes re-render: Status updates in table
```

## Data Transformation Example

### Adding a Product

```typescript
// User fills form:
newProduct = {
  name: "New Product",
  category: "New Wooden Pallets",
  categorySlug: "new-wooden",
  description: "Description here",
  imageUrl: "/images/product.png",
  specifications: {
    dimensions: "1200 x 1000mm",
    material: "Wood",
    loadCapacity: "1500kg",
    weight: "25kg",
    entryPoints: "4-way",
    treatment: undefined,
    notes: "Some notes"
  }
}

// After clicking Save:
const product: Product = {
  id: 9,  // auto-generated
  ...newProduct
}

// Added to array:
products = [
  // ... existing products
  { id: 9, name: "New Product", ... }
]
```

## Responsive Behavior

```
Desktop (>= 1024px)
├─ Form: 2 columns
├─ Table: Full width with horizontal scroll
└─ Buttons: Side by side

Tablet (768px - 1023px)
├─ Form: 2 columns
├─ Table: Responsive with scroll
└─ Buttons: Stacked or side by side

Mobile (< 768px)
├─ Form: 1 column
├─ Table: Horizontal scroll required
└─ Buttons: Full width stacked
```

---

This architecture is scalable and ready for backend integration. The structure can easily be extended to use API calls instead of local state.

