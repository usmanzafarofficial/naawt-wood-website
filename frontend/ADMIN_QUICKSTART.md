# 🚀 QUICK START - Admin Panel Guide

## **Access Admin Panel**
```
URL: /admin
Username: admin
Password: admin
```

---

## **What's New?**

### ✅ **Image Upload**
- Click "Upload" area in the Add Product form
- Select an image from your computer
- Image previews and saves with the product
- Automatically displays on main website

### ✅ **Real-Time Product Management**
- Add product → Appears on website instantly
- Edit product → Changes live on website
- Delete product → Removed from website immediately
- No page refresh needed!

### ✅ **Product Persistence**
- Products saved to browser storage
- Survive page refreshes ✓
- Survive browser restarts ✓
- Always available

### ✅ **Hidden Admin Access**
- Admin button removed from main navigation
- Only accessible via `/admin` URL
- Login required
- Automatically logged out on page reload (unless token saved)

---

## **Admin Panel Tabs**

### **📦 Products Tab** (Default)
- View all products
- Click **+ Add Product** to add new product with image
- Click **✏️ Edit** to modify product details
- Click **🗑️ Delete** to remove product

### **🛒 Orders Tab**
- View customer orders
- Update order status: Pending → Processing → Shipped → Delivered

### **💬 Quotes Tab**
- View quote requests
- Update status: Pending → Quoted → Rejected

### **⚙️ Settings Tab**
- Change admin password
- View admin information
- Session status

---

## **Product Upload Process**

1. **Go to Admin Panel**: Navigate to `/admin`
2. **Login**: Enter `admin` / `admin`
3. **Click "+" Add Product** button
4. **Upload Image**:
   - Click the dashed box
   - Select image from computer
   - See image preview
   - Upload progress shows 100%
5. **Fill Product Details**:
   - Product Name *
   - Category *
   - Description *
   - Dimensions, Material, Capacity, Weight, etc.
6. **Click "Save Product"**
7. **Check Website**: Go to Products page → Your new product is there! 🎉

---

## **Making Changes**

### **Add Product**
1. Admin Dashboard → Products tab
2. Click "+ Add Product"
3. Upload image
4. Fill details
5. Click "Save Product"
✓ Product appears on website instantly

### **Edit Product**
1. Find product in table
2. Click "Edit" button
3. Change any field or upload new image
4. Click "Update Product"
✓ Website updates automatically

### **Delete Product**
1. Find product in table
2. Click "Delete" button
3. Product is removed
✓ Website updates automatically

### **Change Password**
1. Click "Settings" tab
2. Enter current password: `admin`
3. Enter new password
4. Click "Change Password"
✓ Password changed and saved

---

## **Important Info**

- **Images are stored in your browser** (localStorage)
- **All changes are instant** - no waiting needed
- **Data persists** - products stay even after closing browser
- **Session expires** - login again if browser cache cleared
- **Images under 500KB** - recommended for best performance

---

## **Troubleshooting**

**Q: Image upload not working?**
- A: Try a different image format (JPG, PNG)
- Smaller file size (under 500KB)

**Q: Product not showing on website?**
- A: Refresh the Products page (F5)
- Check if product was actually saved (see it in table)

**Q: Lost login/Can't access admin?**
- A: Browser cache might be cleared
- Go to `/admin` and login again with admin/admin

**Q: Changes not saving?**
- A: Check browser console for errors (F12)
- Try refreshing page and trying again

---

## **Features at a Glance**

✅ Upload images directly from computer
✅ Add/Edit/Delete products
✅ Changes appear on website instantly
✅ All data saved automatically
✅ Password change capability
✅ Order & quote management
✅ Hidden from regular website users
✅ No backend needed (works offline)

---

**You're all set! Start managing your products! 🎉**
