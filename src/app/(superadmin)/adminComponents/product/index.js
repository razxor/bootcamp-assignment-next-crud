"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddProduct from "./add";
import EditProduct from "./edit";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductComponent() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState("list"); // 'list', 'add', or 'edit'
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://crud.teamrabbil.com/api/v1/ReadProduct");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        if (res.status == "success") setProduct(res.data);
        console.log(res.data); // Handle the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();     
  }, []);

  const handleProductUpdated = (updatedProduct) => {
    setProduct((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    setView('list');
  };

  const handleProductAdd = (newProduct) => {
    setProduct((prev) => [newProduct, ...prev]);
    setView('list');
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }
      setProduct((prev) => prev.filter((item) => item._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const showAddForm = () => setView("add");
  const showEditForm = (product) => {
    setEditProductData(product);
    setView("edit");
  };
  const showList = () => setView("list");

  return (
    <>
      {view === "list" && (
        <>
          <div className="grid grid-cols-12">
            <div className="col-span-10"></div>
            <div className="col-span-2">
              <button onClick={showAddForm} className="btn btn-primary">
                Add Product
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="uppercase">
                    <th>Product</th>
                    <th>Unit price</th>
                    <th>QTY</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product &&
                    product.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={
                                      item.Img
                                        ? item.Img
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
                                    }
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item?.ProductName}</div>
                                <div className="text-sm opacity-50">{item?.ProductCode}</div>
                              </div>
                            </div>
                          </td>
                          <td>{item?.UnitPrice}</td>
                          <td>{item?.Qty}</td>
                          <td className="">{item?.TotalPrice}</td>
                          <th>
                            <div className="join join-vertical lg:join-horizontal">
                              <button
                                className="btn join-item btn-success"
                                onClick={() => showEditForm(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn join-item btn-error"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {
      view === "add" && 
      <AddProduct 
        onCancel={showList} 
        onProductAdded={handleProductAdd}
      />
      }
      {view === "edit" && <EditProduct product={editProductData} onCancel = {showList} onProductUpdated = {handleProductUpdated}/>}

      <ToastContainer />
    </>
  );
}
