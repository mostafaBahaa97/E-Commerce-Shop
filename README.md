## E‑Commerce Shop (React + Vite)

Modern single‑page **e‑commerce web app** built with React, Vite, Redux Toolkit, and Bootstrap.  
The app consumes the public `https://dummyjson.com` API to display products, supports authentication via local storage, and includes a full shopping cart experience.

### Live Demo

- **GitHub Pages**: [E‑Commerce Shop](https://mostafaBahaa97.github.io/E-Commerce-Shop)

---

### Features

- **Product Listing**
  - Fetches products from `https://dummyjson.com/products` using Axios.
  - Paginated grid with responsive Bootstrap layout.
  - Ability to remove products from the current list in the UI.

- **Product Details**
  - Dedicated details page with images, price, description, rating stars, tags, and stock status.
  - Thumbnail gallery with selectable main image.
  - Quantity selector with stock validation.
  - **Add to Cart** / **Buy Now** actions with `react-toastify` notifications.
  - Wishlist icon UI (local toggle).

- **Shopping Cart**
  - Global cart state managed with **Redux Toolkit**.
  - Add, remove, clear cart, and update item quantities with stock limits.
  - Automatic total price calculation.

- **Authentication (Local Storage)**
  - **Register**: creates a user and stores it in `localStorage`.
  - **Login**: validates credentials from `localStorage` and updates Redux `user` state.
  - Header shows **Login** / **Logout** and protects cart access for authenticated users.

- **Internationalization Helper**
  - `LanguageContext` + `LanguageSwitcher` component.
  - Dynamically switches `dir` attribute (`ltr` / `rtl`) for layout direction.

- **UI & UX**
  - Responsive layout with **Bootstrap 5** and **Bootstrap Icons**.
  - Font Awesome icons in auth forms.
  - Custom loading spinner while routes and data are loading.
  - Toast notifications for cart actions and auth-related messages.

---

### Tech Stack

- **Frontend**: React + Vite
- **Routing**: `react-router`
- **State Management**: `@reduxjs/toolkit`, `react-redux`
- **HTTP Client**: Axios
- **Styling**: Bootstrap 5, Bootstrap Icons, custom CSS
- **Icons**: Font Awesome
- **Notifications**: `react-toastify`
- **Deployment**: GitHub Pages via `gh-pages`

---

### Getting Started

#### Prerequisites

- **Node.js** (LTS recommended) and **npm**

#### 1. Clone the repository

```bash
git clone https://github.com/mostafaBahaa97/E-Commerce-Shop.git
cd E-Commerce-Shop
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Run the app in development mode

```bash
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`) in your browser.

#### 4. Create a production build

```bash
npm run build
```

#### 5. Preview the production build (optional)

```bash
npm run preview
```

---

### Deployment (GitHub Pages)

This project is configured to deploy to **GitHub Pages** using the `gh-pages` package.

- The `homepage` field in `package.json` is set to `https://mostafaBahaa97.github.io/E-Commerce-Shop`.
- The app uses `BrowserRouter` with `basename="/E-Commerce-Shop"` for correct routing on GitHub Pages.

To deploy:

```bash
npm run deploy
```

This will:

- Build the app into the `dist` folder.
- Push the built files to the `gh-pages` branch on GitHub.

---

### Project Structure (Key Files)

- **`src/App.jsx`** – Main app shell, routing, global providers (Redux, LanguageContext, ToastContainer).
- **`src/pages/ProductList.jsx`** – Product listing with pagination and loader.
- **`src/pages/ProductDetails.jsx`** – Product detail view, wishlist, quantity control, add-to-cart.
- **`src/pages/Cart.jsx`** – Cart screen with quantity updates, remove, and clear cart.
- **`src/pages/Login.jsx` / `src/pages/Register.jsx`** – Local-storage based auth forms.
- **`src/redux/cartSlice.jsx`** – Redux Toolkit slice for cart state.
- **`src/redux/UserSlice.jsx`** – Redux Toolkit slice for user/auth state.
- **`src/apis/config.js`** – Axios instance with `https://dummyjson.com` base URL.
- **`src/components/Header.jsx`** – Navbar with links, cart badge, language switcher, and auth actions.

---

### Notes & Limitations

- Authentication is **demo-only** and uses `localStorage`, not a real backend.
- Product data comes from the public **DummyJSON** API and may change over time.
- Wishlist is currently stored only in component state (not persisted).

---

### Contributing

Pull requests and suggestions are welcome.  
If you find a bug or want to propose an enhancement, feel free to open an **issue** or **PR** on GitHub.
