// app/admin/layout.js
'use client'
import Link from "next/link";
import "../admin.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="admin-layout">
          {/* Header */}
          <header className="admin-header">
            <h1>Admin Panel</h1>
            <nav>
              <ul className="admin-nav">
                <li><Link href="/">Home</Link></li>
                <li><a href="/admin/profile">Profile</a></li>
                <li><a href="/logout">Logout</a></li>
              </ul>
            </nav>
          </header>

          {/* Sidebar + Content */}
          <div className="admin-main">
            {/* Sidebar */}
            <aside className="admin-sidebar">
              <ul>
                <li><Link href="/admin">Dashboard</Link></li>
                <li><Link href="/admin/product">Product</Link></li>                
              </ul>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
              {children}
            </main>
          </div>

          {/* Footer */}
          <footer className="admin-footer">
            <p>&copy; {new Date().getFullYear()} All rights reserved. Raz Ahamed, ICT Officer, Gopalganj Sadar, Gopalganj.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
