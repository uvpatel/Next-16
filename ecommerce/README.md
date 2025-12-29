You are a senior full-stack engineer assigned to build a modern web application from scratch.


## Objective

(explain object in couple of lines)


## Structure 

(be specific about tech stack and structure of project)


## Tasks

(define clear tasks by breaking down into smaller chunks)


## Output Requirements

(define what's expected)


## Notes

(any other required specifics)



You start with a general guideline so that AI thinks of itself like that one. 

For example, saying, 

> You are a senior full-stack engineer assigned to build a modern web application from scratch.
> 

That way, it’ll position itself more as full stack engineer than a generalist responding to your chat. 

Next, you specify

### Objective

Explain the goal of the feature or project in 1–2 lines. For example, 

> Build a minimal blog editor that supports markdown formatting and autosave.
> 

Not too long. This is only objective. Like a main headline of news. 

Then you specify, 

### Structure

Define the tech stack and structural decisions. For example, 

> Next.js 14 with App Router, TailwindCSS for styling, Better Auth for auth, PostgreSQL for DB, Drizzle ORM, etc.
> 

And finally, you very specifically define tasks

### Tasks

Break the job into logical chunks.

> Set up project with Tailwind and PostgreSQL with Drizzle ORM
Create `posts` table with `title`, `content`, `slug`, `created_at` 
Build markdown editor using `react-markdown` 
Add autosave feature
Render blog post at `/blog/[slug]`
> 

Right after that, you repeat yourself again and define

### Output Requirements

What do you expect the AI to return?

> Output the full React component and tell me where to put it.
> 

And for any other information, you can provide

### Notes

Any extra details or constraints? Mention them as Notes. For example, 

> Keep it minimal. Follow industry code guidelines and . Don’t use heavy packages.
>

Create a Next.js app with TypeScript, ESLint, TailwindCSS, Better Auth, Neon PostgreSQL, Drizzle ORM, and Zustand. Also define a products table, seed sample Nike items, and render it on homepage that queries the DB with Drizzle and renders the list.




# Auth UI Prompt
You are a senior full-stack engineer assigned to build a modern web application from scratch.

## 💼 Objective
Design and build fully responsive, styled authentication pages (Sign In and Sign Up) using a shared group layout. These pages must support email/password login, social sign-in buttons (Google and Apple), and follow the application’s theme and typography.

The design should take inspiration from the attached layout and adapt it into this application’s brand identity, following the theme and typography defined in `src/app/globals.css`.


## 🧰 Structure
- Use Next.js App Router and group layout feature for sign-in and sign-up pages.
- Respect existing theme and typography in src/app/globals.css.
- Folder structure:
	/src
	├── app/
	│   ├── (auth)/
	│   │   ├── layout.tsx ← shared layout
	│   │   ├── sign-in/
	│   │   │   └── page.tsx
	│   │   └── sign-up/
	│   │       └── page.tsx
	├── components/
	│   ├── AuthForm.tsx
	│   └── SocialProviders.tsx
	├── public/

## ✅ Tasks
- Create a layout in `/app/(auth)/layout.tsx` with proper structure, margins, and responsiveness.
- Put/Move everything else in `/app/(root)/layout.tsx` file which will have its own shared layout. 
- Ensure the design feels cohesive across both pages.
- Sign In and Sign Up pages should use common form components.
- Create email/password inputs.
- Add social sign-in buttons (Google, Apple) using icons from Lucide or public assets.
- Style all components with Tailwind CSS using the theme in `globals.css`.
- Make it Responsive.
- Design must work well across devices.
- Use mobile-first and accessible practices.

## 📦 Output Requirements
- `/sign-in` and `/sign-up` pages with shared layout
- Responsive, mobile-friendly, accessible forms
- Reusable form and provider components
- Assets must be sourced from `/public`

## 📝 Notes
- Keep UI modular and theme-aligned.
- Focus is only on frontend (UI). Auth logic will be implemented separately.
- Maintain clean code and proper folder structure.



# Auth Backend Prompt
You are a senior full-stack engineer assigned to build a modern web application from scratch.

## Objective

Develop a robust and scalable authentication system for a Nike-style e-commerce application. The system should support both authenticated users and guests using Better Auth, enabling email-password login (no verification in MVP), session management, and smooth guest-to-user transitions during login/signup. This system must be modular, extensible, and production-ready.

## Structure

- **Stack**: PostgreSQL + Drizzle ORM + Next.js (App Router) + Better Auth
- **Auth**: Cookie-based session auth using Better Auth (`auth_session`) and guest session (`guest_session`)
- **ORM Setup**: Modular schema files using Drizzle ORM
- **Folder Structure**:
	```
	/lib
		/db
		└── /schema
		    ├── user.ts
		    ├── account.ts
		    ├── session.ts
		    ├── verification.ts
		    └── guest.ts
		    └── index.ts
	```

## Tasks

1. **Create Auth-Related Database Schemas** (PostgreSQL via Drizzle ORM)
 
 a. `user` table  
 - `id`: uuid (UUID, primary key)  
 - `name`: string (optional)  
 - `email`: string (unique, not null)  
 - `emailVerified`: boolean (default false, not null)  
 - `image`: string (optional)  
 - `createdAt`: Date (default now, not null)  
 - `updatedAt`: Date (default now, not null)  

 b. `session` table  
 - `id`: uuid (UUID, primary key)  
 - `userId`: uuid (foreign key to `user.id`, not null)  
 - `token`: string (unique, not null)  
 - `ipAddress`: string  
 - `userAgent`: string  
 - `expiresAt`: Date (not null)  
 - `createdAt`: Date (default now, not null)  
 - `updatedAt`: Date (default now, not null)  

 c. `account` table  
 - `id`: uuid (UUID, primary key)  
 - `userId`: string (foreign key to `user.id`, not null)  
 - `accountId`: string (used for both email-password and OAuth accounts, not null)  
 - `providerId`: string (e.g. "credentials", "google", not null)  
 - `accessToken`: string (optional)  
 - `refreshToken`: string (optional)  
 - `accessTokenExpiresAt`: Date (optional)  
 - `refreshTokenExpiresAt`: Date (optional)  
 - `scope`: string (optional)  
 - `idToken`: string (optional)  
 - `password`: string (used for credentials login, optional)  
 - `createdAt`: Date (default now, not null)  
 - `updatedAt`: Date (default now, not null)  

 d. `verification` table  
 - `id`: uuid (UUID, primary key)  
 - `identifier`: string (e.g. email, not null)  
 - `value`: string (token/code to verify, not null)  
 - `expiresAt`: Date (not null)  
 - `createdAt`: Date (default now, not null)  
 - `updatedAt`: Date (default now, not null)  

 e. `guest` table  
 - `id`: uuid (UUID, primary key)  
 - `sessionToken`: string (unique, not null)  
 - `createdAt`: Date (default now, not null)  
 - `expiresAt`: Date (for auto-expiry, not null)

2. **Use Secure, Cookie-Based Session Management**
 - Use `auth_session` cookie for authenticated users (Better Auth handles this)
 - Use `guest_session` cookie for guests with UUID sessionToken
 - Cookies should be `HttpOnly`, `Secure`, `SameSite=strict`, `path=/`, `7-day expiry`

3. **Enable Guest-to-User Migration**
 - On successful login/signup, migrate guest cart and related records to the user account
 - Remove `guest_session` cookie and associated DB record

4. **Use Next.js Server Actions**
- Implement all auth-related logic using Next.js Server Actions
- Create `signUp`, `signIn`, `signOut`, `guestSession`, `createGuestSession`, and `mergeGuestCartWithUserCart`
- Put all of these functions in `lib/auth/actions.ts` 

5. **Route Protection & Checkout Flow**
- All product pages, categories, and cart routes are publicly accessible.
- Users can fully browse and use cart features without signing in.
- When proceeding to checkout, if user is not authenticated:
  - Redirect them to sign in/sign up page.
  - After successful login or account creation, merge cart data, then redirect to checkout page.

6. **Security & Validation**
- Follow industry best practices for, Authentication flow, Secure session handling, Input sanitation and Error handling
- Use Zod for strict validation, On all server action inputs, user-provided form data, and API payloads where applicable
- Ensure type safety across the stack using TypeScript + Zod schemas


## Output Requirements

- Drizzle-compatible schema definitions for all tables listed above
- Type-safe fields with correct defaults and constraints
- Modular files per table
- Ready to use with Better Auth (must not rename required tables/fields)
- Reusable and consistent schema that can be extended in future (e.g., 2FA, roles)

## Notes

- This is the MVP setup: email-password login only, no verification yet
- OAuth and verification are planned post-MVP, so include schema support now
- Do not implement cart, products, or orders — only auth-related tables
- Use correct TypeScript types as expected by Drizzle ORM
- Follow Better Auth's required structure strictly for `user`, `session`, `account`, and `verification`


# Database Schemas Prompt
You are a senior full-stack engineer assigned to build a modern web application from scratch.

## 💼 Objective

Design and implement robust, normalized **database schemas** using **Drizzle ORM** for a scalable eCommerce application. This includes user accounts, product catalog, filters, reviews, orders, and supporting features,  all aligned with industry best practices for long-term scalability and clean code architecture.

## 🧰 Structure

- Tech Stack:
  - **ORM**: Drizzle ORM
  - **Database**: PostgreSQL (hosted on Neon Serverless)
  - **Language**: TypeScript
  - **Validation**: Zod schema integration
- Folder & File Structure:
	/lib
	└── db
	    ├── schema/
	    │   ├── addresses.ts
	    │   ├── products.ts
	    │   ├── variants.ts
	    │   ├── categories.ts
	    │   ├── collections.ts
	    │   ├── orders.ts
	    │   ├── carts.ts
	    │   ├── reviews.ts
	    │   ├── filters/
	    │   │   ├── genders.ts
	    │   │   ├── colors.ts
	    │   │   ├── sizes.ts
	    │   └── index.ts

## ✅ Tasks

0. Clean already existing schemas from `lib/db/schema.ts` file and delete that file.  
1. **Define Schema Files**
 - Implement Drizzle ORM schemas for the following entities:
   - Addresses
     ```
		  id: uuid (pk)
		  user_id: uuid (fk -> user.id)
		  type: enum('billing', 'shipping')
		  line1: string
		  line2: string
		  city: string
		  state: string
		  country: string
		  postal_code: string
		  is_default: boolean
	  ```
   - Products
     ```
		  id: uuid (pk)
		  name: string
		  description: text
		  category_id: uuid (fk -> categories.id)
		  gender_id: uuid (fk -> genders.id)
		  brand_id: uuid (fk -> brands.id)
		  is_published: boolean
		  default_variant_id: uuid (nullable, fk -> product_variants.id)
		  created_at: timestamp
		  updated_at: timestamp
		 ```
   - Categories
     ```
		  id: uuid (pk)
		  name: string
		  slug: string (unique)
		  parent_id: uuid (nullable, fk -> categories.id)
     ```
   - Product Variants
     ```
		  id: uuid (pk)
		  product_id: uuid (fk -> products.id)
		  sku: string (unique)
		  price: numeric(10, 2)
		  sale_price: numeric(10, 2) nullable
		  color_id: uuid (fk -> colors.id)
		  size_id: uuid (fk -> sizes.id)
		  in_stock: int
		  weight: float
		  dimensions: jsonb  // { length, width, height }
		  created_at: timestamp
     ```
  - Product Images
     ```
		  id: uuid (pk)
		  product_id: uuid (fk -> products.id)
		  variant_id: uuid (nullable, fk -> product_variants.id)
		  url: string
		  sort_order: int default 0 // for gallery ordering
		  is_primary: boolean
     ```
   - Genders
     ```
		  id: uuid (pk)
		  label: string  // e.g., "Men"
		  slug: string   // e.g., "men"
     ```
   - Brands
     ```
		  id: uuid (pk)
		  name: string  // e.g.,  “Nike”, “Adidas”
		  slug: string   // e.g., "men"
		  logo_url: string // optional
     ```
   - Colors
     ```
		  id: uuid (pk)
		  name: string       // "Red"
		  slug: string       // "red"
		  hex_code: string   // "#FF0000"
		 ```
   - Sizes
     ```
		  id: uuid (pk)
		  name: string       // "M"
		  slug: string       // "m"
		  sort_order: int    // for ordering: S < M < L
		 ```
   - Reviews
     ```
			id: uuid (pk)
		  product_id: uuid (fk -> products.id)
		  user_id: uuid (fk -> user.id)
		  rating: int (1-5)
		  comment: text
		  created_at: timestamp
     ```
   - Carts
     ```
		  id: uuid (pk)
		  user_id: uuid (nullable, fk -> user.id) // for guests: null
		  guest_id: string (nullable, fk -> guest.id) // 
		  created_at: timestamp
		  updated_at: timestamp
     ```
   - Cart Items
     ```
		  id: uuid (pk)
		  cart_id: uuid (fk -> carts.id)
		  product_variant_id: uuid (fk -> product_variants.id)
		  quantity: int
     ```
   - Orders
     ```
		  id: uuid (pk)
		  user_id: uuid (fk -> user.id)
		  status: enum('pending', 'paid', 'shipped', 'delivered', 'cancelled')
		  total_amount: numeric(10, 2)
		  shipping_address_id: uuid (fk -> addresses.id)
		  billing_address_id: uuid (fk -> addresses.id)
		  created_at: timestamp
     ```
   - Order Items
     ```
		  id: uuid (pk)
		  order_id: uuid (fk -> orders.id)
		  product_variant_id: uuid (fk -> product_variants.id)
		  quantity: int
		  price_at_purchase: numeric(10, 2)
		 ```
   - Payments
     ```
		  id: uuid (pk)
		  order_id: uuid (fk -> orders.id)
		  method: enum('stripe', 'paypal', 'cod')
		  status: enum('initiated', 'completed', 'failed')
		  paid_at: timestamp
		  transaction_id: string (nullable)
     ```
   - Coupons
     ```
		  id: uuid (pk)
		  code: string (unique)
		  discount_type: enum('percentage', 'fixed')
		  discount_value: numeric
		  expires_at: timestamp
		  max_usage: int
		  used_count: int
     ```
   - Wishlists
     ```
		  id: uuid (pk)
		  user_id: uuid (fk -> user.id)
		  product_id: uuid (fk -> products.id)
		  added_at: timestamp
     ```
   - Collections
     ```
		  id: uuid (pk)
		  name: string       // "Summer '25"
		  slug: string       // "summer-25"
		  created_at: timestamp
     ```
   - Product–Collection relationships
     ```
		  id: uuid (pk)
		  product_id: uuid (fk -> products.id)
		  collection_id: uuid (fk -> collections.id)
     ```
 
2. **Data Modeling Best Practices**
 - Use accurate data types: `uuid`, `text`, `numeric`, `jsonb`, `timestamp`, `enum`, etc.
 - Define proper **foreign key relationships** using `relations()`.
 - Normalize the structure for referential integrity and scalability.
 - Include **constraints**: `unique`, `not null`, `default`, etc.
 - Use **snake_case** for database columns and **camelCase** in TypeScript.

3. **Validation & Typing**
 - Use Zod validation for each table.
 - Create proper enums and use them into the relevant schemas.

4. **Maintainability**
 - Keep schema files modular and readable.
 - Group related entities (e.g. `filters/`) logically.
 - Ensure compatibility with `drizzle-kit` migration tools.
 - Design to support future use in APIs (REST/tRPC), admin dashboards, and internal tooling.
 
5. **Seed**
	- Study the product-related schema (including any product, product_variants, categories, etc. that were or will be defined).
	- Create a `seed.ts` function that populates the database with 15 realistic Nike products with variants
	- Seeds filters (genders, colors, sizes), brand(s), categories, collections
	- Seed data should reflect proper foreign key relationships and follow any constraints
	- For each product randomize colors, multiple sizes, multiple variants and images per variant/color (for few).
	- Upload images from `public/shoes` to server using `fs` as static images to `static/uploads/...`
	- Log progress and errors clearly
	- Add `db:seed` script to `package.json`

## 📦 Output Requirements

- Fully typed Drizzle ORM schema definitions per table
- Zod-based validation for each insert/select
- Foreign keys and relations defined with `relations()`
- Clean file separation and index export
- Ready for production with no placeholder/mocked data

## 📝 Notes

- This will power a production-grade system.
- Focus on scalability, modularity, and clarity.
- Don’t include dummy data or test code.
- Code must be clean, reusable, and aligned with modern TypeScript best practices.

# Product Listing Page Prompt
You are a senior full-stack engineer assigned to build a modern web application from scratch.

## Objective

Build a **Product Listing Page** for a Nike e-commerce web app that supports filterable, sortable product listings. Product data must render **server-side** using URL query parameters. The filter & sort UI must be built using **client-only components** that sync state to the URL, without performing any data fetching themselves.

The design should take inspiration from the attached layout and adapt it into this application’s brand identity, following the theme and typography defined in `src/app/globals.css`.

## Structure

* Use **Next.js App Router**.
* Use **`query-string`** for parsing and stringifying query parameters.
* Use **Next.js** for routing & shallow updates (do not use the `URLSearchParams` API directly).
* Query-related helpers must live in `/lib/utils/query.ts`.
* Keep logic modular: separate client components for `Filters.tsx` and `Sort.tsx`.
* Existing UI components like `Card.tsx` must be reused.
* Use Tailwind CSS, respecting global theme from `/src/app/globals.css`.
* Folder Structure

	```
	/src
	├── app/
	├── (root)/
	│   └── products/
	│       └── page.tsx              ← server-rendered product listing
	├── components/
	│   ├── Filters.tsx               ← client-only filters
	│   ├── Sort.tsx                  ← client-only sort
	│   └── Card.tsx                  ← reused product card
	├── lib/
	│   └── utils/
	│       └── query.ts              ← helpers for parsing/stringifying URL filters
	```

## ✅ Tasks

- 1. **Server-Rendered Product Page**

  * Read filter/sort state from `searchParams`.
  * Use helper functions from `/lib/utils/query.ts` to parse query params.
  * Filter and sort mocked product data accordingly (no data fetching. Use images from `/public` folder)
  * Render a responsive grid of `Card` components with filtered results.
  * Show active filters (e.g., badges like “Men”, “Red”, “Size: M”).

- 2. **Filters UI (`Filters.tsx`)**

	Build a **client-only** sidebar/drawer component:

  * Filter groups: Gender, Size, Color, Price Range (should be checkboxes).
  * Each group supports **multi-selection** with checkboxes.
  * Clicking a selected filter **removes** it from the URL.
  * Must use `query-string` npm package to **read and update URL filters**.
  * Must use **Next.js routing for URL params update**.
  * Reads initial state from URL and updates it without full reload.
  * **Responsive**:
    * Sidebar on desktop.
    * A collapsible filter drawer that slides in from the left on mobile devices, appearing above the product page with a semi-transparent overlay for focus.
  * Expands/collapses filter groups.
  * Styled with Tailwind while strictly respecting `src/app/globals.css` style theme

- 3. **Sort UI (`Sort.tsx`)**
	
	* Build a **client-only** dropdown or button group.
  * Options: Featured, Newest, Price (High → Low), Price (Low → High).
  * Sort state must sync to URL query param (e.g., `?sort=price_desc`).
  * Use `query-string` with Next.js routing.
  * Also resets pagination to page 1 on sort change.

- 4. **Query Utilities (`/lib/utils/query.ts`)**
	
	* Write reusable functions for updating and removing URL params.
	* Must use `query-string` package.
	* These should be pure functions (easy to test).

- 5. **Navigation Links**

	* Other pages (e.g., category navigation like “Men”) must link to `/products?gender=men`.
	* Clicking those links must pre-apply filters server-side and reflect them in UI.

- 6. **Responsiveness**

	* **Entire layout must be mobile-first and fully responsive**.
	* Filters collapse into drawer on small screens.
	* Use Tailwind utility classes (no inline styles unless strictly necessary).
	* Whole layout should respect max width structure as all other pages. It should be uniform in structure. 

- 7. **URL & State Sync**

	Filter/Sort UI should:
  * Stay in sync with URL query string.
  * Work with browser back/forward.
  * Clear filters via UI and update URL accordingly.
  * Emit filter changes that cause shallow navigation.

- 8. **Accessibility**

	* Use semantic HTML.
	* Keyboard-navigable filter checkboxes.
	* Visibly focused states.

## 📦 Output Requirements

- A fully functional server side rendered `/products` page:
	* Filters, sort options, and URL sync working end-to-end.
	* Responsive design with sidebar/drawer behavior.
- `Filters.tsx` and `Sort.tsx` implemented as isolated client-only components.
- `lib/utils/query.ts` utility with tested, modular URL-handling functions.
- All UI interactions update the URL and rerender data accordingly.
- Clean, maintainable code with modular structure and component reuse.
- Handle empty state gracefully if no products match filters.

## 📝 Notes

* No real backend integration; mocked data only.
* Filters should apply **immediately** on change (no Apply button).
* Refer to Next.js 15 way of reading values from searchParams
* Product cards should reflect active filters (e.g., show gender or color tags).
* Placeholder product data must mirror actual schema (refer to product structure + variants).
* Study the DB architecture provided separately before writing the seed function to match.