# Employee Management System

A production-minded CRUD application built with **Next.js 14 (App Router)**, **TypeScript**, and **Ant Design**. This project demonstrates component-driven architecture, custom hooks for state management, and responsive UI patterns.

## 🚀 Quick Start

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000/employees](http://localhost:3000/employees) to view the application.

---

## 📂 Codebase Walkthrough & Requirements Mapping

This section maps the specific project requirements to their implementation details in the codebase to assist code review.

### 1. Core Architecture & Component Split
The application follows a clean separation of concerns, dividing the View (UI) from the Logic (Hooks).

| Requirement | Implementation Details | File Location |
| :--- | :--- | :--- |
| **Data Logic** | **Custom Hook (`useEmployees`)**: Encapsulates all CRUD operations (Add, Edit, Delete) and handles side effects (LocalStorage persistence). This keeps the UI components pure and focused on rendering. | `src/hooks/useEmployees.ts` |
| **Data Types** | **TypeScript Interfaces**: Defines the `Employee` shape to ensure type safety across the application, preventing runtime errors for missing props. | `src/types/employee.ts` |
| **Main Layout** | **Page Composition**: Orchestrates the search state, modal visibility, and pagination logic. It passes data down to the "dumb" presentation components. | `src/app/employees/page.tsx` |

### 2. Feature Implementation

#### A. Data Grid (Read)
* **Requirement:** A table listing Name, Email, Role, Status, and Actions.
* **Implementation:** * Used `Ant Design Table` with strictly typed columns.
    * **Bonus:** Implemented **Column Sorting** for names and **Filtering** for Roles directly in the column definitions.
    * **UX Improvement:** Added a CSS override to enforce a **consistent table height** (520px). This prevents the UI from "jumping" when filtering results or navigating to a page with fewer items.
* **Location:** `src/components/employees/EmployeeTable.tsx`

#### B. Add & Edit Employee (Create/Update)
* **Requirement:** Modal with Form (Name, Email, Role, Status).
* **Implementation:** * Created a reusable `EmployeeFormModal` component. 
    * It accepts an `initialValues` prop; if present, the modal switches to "Edit Mode," otherwise it defaults to "Add Mode."
    * **Validation:** utilized AntD `rules` prop for required fields and email regex validation.
* **Location:** `src/components/employees/EmployeeFormModal.tsx`

#### C. Delete Employee (Delete)
* **Requirement:** Delete action with confirmation.
* **Implementation:** * Wrapped the delete button in an AntD `Popconfirm` component to prevent accidental deletions.
    * The delete function propagates ID changes back to the `useEmployees` hook.
* **Location:** `src/components/employees/EmployeeTable.tsx` (Inside `columns` definition)

---

## 🌟 Bonus Features & UX Enhancements

Beyond the core requirements, the following features were implemented to improve usability and data persistence:

### 1. Client-Side Search & Pagination Sync
**Challenge:** In standard paginated tables, searching while on "Page 2" often results in an empty view if the filtered results fit on a single page.
**Solution:**
* Lifted the search state to `page.tsx`.
* Implemented a handler that **automatically resets the current page to 1** whenever the search input changes.
* This ensures the user always sees the relevant results immediately.
* **Code:** `src/app/employees/page.tsx` (See `handleSearch` function)

### 2. LocalStorage Persistence
**Feature:** Data survives browser refreshes.
**Implementation:**
* The `useEmployees` hook initializes state by checking `window.localStorage`.
* A `useEffect` listener updates LocalStorage whenever the `employees` array changes.
* **Code:** `src/hooks/useEmployees.ts`

### 3. Responsive Design
**Feature:** Usable on Mobile and Desktop.
**Implementation:**
* Used Ant Design `Row` and `Col` Grid system in the header to stack the "Search" and "Add Button" vertically on mobile devices while keeping them inline on desktop.
* **Code:** `src/app/employees/page.tsx`

---

## 🛠 Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **UI Library:** Ant Design (v5)
* **Icons:** @ant-design/icons
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

