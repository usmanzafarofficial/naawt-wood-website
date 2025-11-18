# Admin Panel - Quick Reference Card

## Quick Start

### Access Admin Panel
1. Login with admin credentials
2. Click "Admin Panel" in navigation
3. You're in the dashboard

## Three Main Tabs

### 📋 ORDERS
- View customer orders
- Update status: Pending → Processing → Shipped → Delivered
- See customer, product, quantity, date

### 💬 QUOTES
- Track quote requests
- Status: Pending → Quoted → Rejected
- Convert to orders when ready

### 📦 PRODUCTS ⭐ (Main Feature)
- Add new products
- Edit existing products
- Delete products
- Full specification management

---

## Product Management Guide

### ➕ ADD PRODUCT

**Step 1:** Click [Add Product]

**Step 2:** Fill required fields (*)
- Name*
- Category*
- Image URL*
- Description*

**Step 3:** Fill specifications (recommended)
- Dimensions (e.g., 1200 x 1000mm)
- Material (Wood/Plastic/Presswood)
- Load Capacity (e.g., 1500kg Dynamic)
- Weight (e.g., Approx. 25kg)
- Entry Points (2-way or 4-way)
- Treatment (e.g., Heat-Treated ISPM15)
- Notes (additional info)

**Step 4:** Click [Save Product]

### ✏️ EDIT PRODUCT

**Step 1:** Find product in table

**Step 2:** Click [Edit]

**Step 3:** Modify any fields

**Step 4:** Click [Update Product]

### 🗑️ DELETE PRODUCT

**Step 1:** Find product in table

**Step 2:** Click [Delete]

⚠️ **Warning**: Cannot be undone!

---

## Product Categories

```
✓ New Wooden Pallets
✓ Used Wooden Pallets
✓ Plastic Pallets
✓ Heat Treated Pallets
✓ Pallet Collars & Cases
✓ Pallet Collection Service
```

## Material Types

```
✓ Wood
✓ Plastic
✓ Presswood
```

## Entry Points

```
✓ 2-way
✓ 4-way
```

---

## Example Product Entry

```
Name: Heavy-Duty Nestable Plastic Pallet

Category: Plastic Pallets

Description: Hygienic, easy-to-clean plastic 
pallets made from recycled materials. Ideal 
for food, pharmaceutical, and export industries.

Image URL: /images/heavyduty.png

Dimensions: 1200 x 1000mm
Material: Plastic
Load Capacity: 2000kg Static
Weight: 18kg
Entry Points: 4-way
Treatment: (leave blank)
Notes: Nestable design saves space. 
       Impervious to moisture.
```

---

## Field Rules

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| Name | YES | Text | "New Standard Wooden Pallet" |
| Category | YES | Dropdown | "New Wooden Pallets" |
| Image URL | YES | Path | "/images/newpallet.png" |
| Description | YES | Text | "Brand new, durable wooden..." |
| Dimensions | NO | "WxHmm" | "1200 x 1000mm" |
| Material | NO | Dropdown | "Wood" |
| Load Cap | NO | Text | "1500kg Dynamic" |
| Weight | NO | Text | "Approx. 25kg" |
| Entry Points | NO | Dropdown | "4-way" |
| Treatment | NO | Text | "Heat-Treated (ISPM15)" |
| Notes | NO | Text | "Sturdy construction..." |

---

## Common Tasks

### Add Multiple Products
1. Add Product 1 → Save → Add Product 2 → Save...
2. Form resets automatically each time

### Update Product Image
1. Edit product
2. Change Image URL
3. Update Product
4. New image shows on website

### Check Product Details
1. Look at table
2. Click Edit to see full details
3. Click Cancel to close (no changes)

### Find Specific Product
1. Use Ctrl+F (browser find)
2. Type product name
3. Browser highlights it

---

## Status Indicators

### Orders
- 🟡 **Pending** - Waiting to process
- 🔵 **Processing** - Being prepared
- 🟢 **Shipped** - On its way
- ✅ **Delivered** - Received by customer

### Quotes
- 🟡 **Pending** - Awaiting response
- 🟢 **Quoted** - Quote sent to customer
- ❌ **Rejected** - Customer declined

---

## Validation Rules

✅ **Required fields must be filled:**
- Product Name
- Category
- Image URL
- Description

❌ **Common errors:**
- Empty required fields → "Please fill in all required fields"
- Invalid image path → Check file exists in /public/images/
- Duplicate product name → Allowed but not recommended

---

## Tips & Tricks

💡 **Pro Tips:**
1. Use consistent naming for products
2. Add detailed descriptions for marketing
3. Include all specifications
4. Use clear, descriptive notes
5. Keep image URLs consistent
6. Review products regularly

🚀 **Keyboard:**
- Ctrl+F = Find product in table
- Tab = Navigate between fields
- Enter = Submit form (usually)
- Esc = Not bound (click Cancel instead)

---

## Important Notes

⚠️ **Current Behavior:**
- Products stored in browser only
- **Changes NOT saved after refresh**
- Perfect for testing and demo

✅ **Production Ready:**
- Connect to PHP backend database
- Implement proper authentication
- Data will persist permanently

---

## Image Management

### Image Placement
- Put images in: `/public/images/`
- Supported: PNG, JPG, SVG, WebP
- Optimize for web (compress images)

### Example Paths
```
✓ /images/newpallet.png
✓ /images/euroused.png
✓ /images/heavyduty.png
✓ /images/heattreated.png
✓ /images/collersofpallets.png
```

---

## Troubleshooting

### ❌ "Please log in to access admin panel"
**Solution:** Login first in the header

### ❌ "Please fill in all required fields"
**Solution:** Check all fields marked with * are filled

### ❌ Product changes lost after refresh
**Solution:** Normal - need backend database to persist

### ❌ Image not showing
**Solution:** Check path exists in /public/images/

### ❌ Can't edit or delete product
**Solution:** Try refreshing page, ensure you're logged in

---

## Contact & Support

📧 **For Issues:**
- Check ADMIN_PANEL_GUIDE.md (detailed)
- Check ADMIN_PANEL_VISUAL_GUIDE.md (diagrams)
- Check README_ADMIN_PANEL.md (overview)

---

## Quick Checklist

### When Adding a Product
- [ ] Product Name filled
- [ ] Category selected
- [ ] Image URL entered
- [ ] Description written
- [ ] Dimensions filled
- [ ] Material selected
- [ ] Load Capacity entered
- [ ] All good? → Click Save

### When Editing a Product
- [ ] Found the product
- [ ] Made your changes
- [ ] Double-checked values
- [ ] Ready? → Click Update

### When Deleting a Product
- [ ] SURE? (can't undo)
- [ ] Yes? → Click Delete

---

## Keyboard Shortcuts (Future)

```
NOT YET IMPLEMENTED:
Ctrl+S = Save form
Esc = Cancel form
Ctrl+F = Search products
Ctrl+D = Delete selected
Ctrl+E = Edit selected
```

---

## Data Structure Reference

```typescript
// Product looks like this:
{
  id: 1,
  name: "Product Name",
  category: "Category Name",
  categorySlug: "category-slug",
  description: "Description text",
  imageUrl: "/images/file.png",
  specifications: {
    dimensions: "1200 x 1000mm",
    material: "Wood",
    loadCapacity: "1500kg",
    weight: "25kg",
    entryPoints: "4-way",
    treatment: "Heat-Treated",
    notes: "Additional notes"
  }
}
```

---

**Version:** 1.0  
**Last Updated:** November 12, 2025  
**Status:** ✅ Active

