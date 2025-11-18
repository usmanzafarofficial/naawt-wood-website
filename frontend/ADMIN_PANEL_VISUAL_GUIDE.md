# Admin Panel - Quick Start Visual Guide

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Admin Dashboard                                    [Back to Website] btn │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ [Orders Tab] | [Quotes Tab] | [Products Tab]                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Tab Content (Orders/Quotes/Products Management)                        │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Table with sortable columns and action buttons                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

## Product Management Form

```
┌─────────────────────────────────────────────────────────────────┐
│ Product Management                  [Add Product] button        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ When [Add Product] clicked:                                    │
│ ┌───────────────────────────────────────────────────────────┐  │
│ │ Add New Product                                           │  │
│ ├───────────────────────────────────────────────────────────┤  │
│ │                                                           │  │
│ │ Product Name * │  Category *      │                      │  │
│ │ [_________]    │ [dropdown____]   │                      │  │
│ │                                                           │  │
│ │ Image URL *    │  Dimensions      │                      │  │
│ │ [_________]    │ [_________]      │                      │  │
│ │                                                           │  │
│ │ Material       │  Load Capacity   │                      │  │
│ │ [dropdown____] │ [_________]      │                      │  │
│ │                                                           │  │
│ │ Weight         │  Entry Points    │                      │  │
│ │ [_________]    │ [dropdown____]   │                      │  │
│ │                                                           │  │
│ │ Treatment      │  Notes           │                      │  │
│ │ [_________]    │ [_________]      │                      │  │
│ │                                                           │  │
│ │ Description *                     │                      │  │
│ │ [_________________________________]                      │  │
│ │ [_________________________________]                      │  │
│ │                                                           │  │
│ │ [Save Product] [Cancel]                                 │  │
│ │                                                           │  │
│ └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Product Table                                           │   │
│  ├──────┬──────────┬───────────┬────────────┬────┬────────┤   │
│  │ Name │ Category │ Material  │ Dimensions │Cap │ Actions│   │
│  ├──────┼──────────┼───────────┼────────────┼────┼────────┤   │
│  │ ...  │ ...      │ ...       │ ...        │... │ Ed Del │   │
│  └──────┴──────────┴───────────┴────────────┴────┴────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Orders Tab View

```
┌──────────────────────────────────────────────────────────────────────┐
│ Recent Orders                                                         │
├─────────┬──────────────┬──────────────┬──────┬────────┬────────┬─────┤
│Order ID │ Customer     │ Product      │ Qty  │ Date   │ Status │ Act │
├─────────┼──────────────┼──────────────┼──────┼────────┼────────┼─────┤
│ORD001   │ ABC Company  │ New Wooden.. │ 100  │ ...-10 │ ✓ Dlvd │ View│
│ORD002   │ XYZ Corp     │ Plastic Pal..│  50  │ ...-11 │ Process│ View│
│ORD003   │ LMN Ltd      │ Heat-Treated │  75  │ ...-12 │ Pending│ View│
└─────────┴──────────────┴──────────────┴──────┴────────┴────────┴─────┘

Status Dropdown Options:
├─ Pending
├─ Processing  
├─ Shipped
└─ Delivered
```

## Quotes Tab View

```
┌──────────────────────────────────────────────────────────────────────┐
│ Recent Quotes                                                         │
├─────────┬──────────────┬──────────────┬──────┬────────┬────────┬─────┤
│ Quote ID│ Customer     │ Product      │ Qty  │ Date   │ Status │ Act │
├─────────┼──────────────┼──────────────┼──────┼────────┼────────┼─────┤
│QTE001   │ DEF Inc      │ Used Wooden..│ 200  │ ...-10 │ Quoted │V/Con│
│QTE002   │ GHI Ltd      │ Custom Size..│   1  │ ...-11 │ Pending│V/Con│
└─────────┴──────────────┴──────────────┴──────┴────────┴────────┴─────┘

Status Dropdown Options:
├─ Pending
├─ Quoted
└─ Rejected

Actions:
├─ View
└─ Convert to Order
```

## Product Table View

```
┌──────────────────────────────────────────────────────────────────────┐
│ Product Table                                                         │
├──────────────────┬──────────────┬──────┬────────────┬──────┬─────────┤
│ Name             │ Category     │ Mat. │ Dimensions │ Cap. │ Actions │
├──────────────────┼──────────────┼──────┼────────────┼──────┼─────────┤
│ New Standard...  │ New Wooden   │ Wood │ 1200x1000  │ 1500 │ E / Del │
│ Used Euro...     │ Used Wooden  │ Wood │ 1200x800   │ 1200 │ E / Del │
│ Heavy-Duty Nest..│ Plastic      │Plast │ 1200x1000  │ 2000 │ E / Del │
│ Heat-Treated...  │ Heat Treated │ Wood │ 1200x1000  │ 1250 │ E / Del │
└──────────────────┴──────────────┴──────┴────────────┴──────┴─────────┘

Legend:
E = Edit button (click to modify product)
Del = Delete button (click to remove product)
```

## Workflow Example

### Adding a New Product - Step by Step

```
1. START
   ↓
2. Click [Add Product] button
   ↓
3. Form appears with fields:
   - Product Name (required)
   - Category (required)
   - Image URL (required)
   - Description (required)
   - Specifications (optional but recommended)
   ↓
4. Fill in all fields:
   Name: "Rackable Plastic Pallet"
   Category: "Plastic Pallets"
   Image: "/images/rackable.png"
   Description: "Designed for high-bay racking systems..."
   Dimensions: "1200 x 1000mm"
   Material: "Plastic"
   Load Capacity: "1500kg Racking"
   Weight: "22kg"
   Entry Points: "4-way"
   Notes: "Reinforced for selective and drive-in racking"
   ↓
5. Click [Save Product]
   ↓
6. Product added to table
   ↓
7. END
```

### Editing a Product - Step by Step

```
1. START
   ↓
2. Locate product in table
   ↓
3. Click [Edit] button
   ↓
4. Form appears with current product data filled in
   ↓
5. Modify fields as needed
   ↓
6. Click [Update Product]
   ↓
7. Product updated in table
   ↓
8. END
```

### Deleting a Product - Step by Step

```
1. START
   ↓
2. Locate product in table
   ↓
3. Click [Delete] button
   ↓
4. Product immediately removed
   ↓
5. END (⚠️ Cannot be undone in current version)
```

## Field Requirements & Guidelines

### Required Fields (*)
- **Product Name**: Must be descriptive and unique
  Example: "New Standard Wooden Pallet" ✓
  Bad Example: "Pallet" ✗

- **Category**: Select from predefined list
  Options: New Wooden, Used Wooden, Plastic, Heat Treated, Collars, Collection

- **Image URL**: Must point to valid image file
  Format: `/images/filename.png`
  Supported: PNG, JPG, SVG, WebP

- **Description**: Should be detailed and marketing-focused
  Min: 10 characters recommended
  Include key benefits and use cases

### Recommended Fields
- **Dimensions**: Format: "1200 x 1000mm"
- **Material**: Select: Wood, Plastic, or Presswood
- **Load Capacity**: Format: "1500kg Dynamic" or "1500kg Racking"
- **Weight**: Format: "Approx. 25kg"
- **Entry Points**: Select: 2-way or 4-way
- **Notes**: Any additional features or special information

## Color & Status Indicators

```
✓ Delivered   → Green badge
→ Processing  → Blue highlight
● Pending     → Yellow/Orange highlight
✗ Rejected    → Red badge

In Stock      → Green badge
Out of Stock  → Red badge
```

## Tips & Tricks

1. **Quick Editing**: Click edit multiple times without refreshing
2. **Form Validation**: Required fields show in red if empty
3. **Dropdown Categories**: Auto-populates from PRODUCT_CATEGORIES constant
4. **Product ID**: Auto-generated (don't modify manually)
5. **Batch Operations**: Currently not available (coming soon)

## Keyboard Shortcuts

While form is open:
- `Ctrl/Cmd + S` - Not bound yet (click Save button)
- `Esc` - Not bound yet (click Cancel button)

## Common Tasks

### Task: Add Multiple Products
1. Click Add Product
2. Fill form
3. Click Save
4. Form resets automatically
5. Repeat from step 1

### Task: Update Product Image
1. Click Edit on product
2. Change Image URL field
3. Click Update Product
4. New image displays in products page

### Task: Check Product Details
1. Hover over product name in table
2. Full name shows in tooltip (if truncated)
3. Click View/Edit to see all details

### Task: Find Product in Table
1. Use Ctrl+F (browser find)
2. Search for product name
3. Or scroll table horizontally to see more fields

