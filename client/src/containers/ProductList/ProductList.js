import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Product from "../../components/Product/Product";
import Loader from "../../components/Loader/Loader";
import { formatFilters } from "../../helpers/formatFilters";
import { useDepartments } from "../../Hooks/useDepartments";
import {
  PRODUCT_ADDED_TO_CHECKOUT_SUCCESS,
  FETCH_DEPARTMENT_DATA_ERROR,
  FETCH_PRODUCT_DATA_ERROR,
  MULTIPLE_ERRORS,
} from "../../constants/constants";
import * as productApi from "../../services/productApi";
import * as checkoutApi from "../../services/checkoutApi";
import PropTypes from "prop-types";

import "./ProductList.css";

const ProductList = ({ updateCheckoutCount }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [filtersByBrand, setFiltersByBrand] = useState([]);
  const [filtersByDepartment, setFiltersByDepartment] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);

  const { departments, error: departmentError } = useDepartments();

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await productApi.getAllProducts();

      if (allProducts === FETCH_PRODUCT_DATA_ERROR) {
        setError(true);
        setProducts(allProducts);
      } else {
        setProducts(allProducts);
        const allFiltersByBrand = formatFilters(allProducts, "brand").sort(
          (a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
        );
        setFiltersByBrand(allFiltersByBrand);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (departments.length > 0) {
      setLoading(false);
      setFiltersByDepartment(departments);
    }
    if (departmentError) {
      setLoading(false);
      setError(true);
      setFiltersByDepartment(FETCH_DEPARTMENT_DATA_ERROR);
    }
  }, [departments, departmentError]);

  useEffect(() => {
    if (error === true) {
      if (
        products === FETCH_PRODUCT_DATA_ERROR &&
        filtersByBrand === FETCH_DEPARTMENT_DATA_ERROR
      ) {
        setErrMsg(MULTIPLE_ERRORS);
      } else if (products === FETCH_PRODUCT_DATA_ERROR) {
        setErrMsg(FETCH_PRODUCT_DATA_ERROR);
      } else if (filtersByBrand === FETCH_DEPARTMENT_DATA_ERROR) {
        setErrMsg(FETCH_DEPARTMENT_DATA_ERROR);
      }
    }
  }, [products, filtersByBrand, error]);

  const addItemToCheckout = async (product) => {
    const productAdded = await checkoutApi.addItemToCheckout(product);
    if (productAdded === PRODUCT_ADDED_TO_CHECKOUT_SUCCESS) {
      updateCheckoutCount();
      toast(`${PRODUCT_ADDED_TO_CHECKOUT_SUCCESS}`, {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "toast__Success",
      });
    } else {
      toast(`${productAdded}`, {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "toast__Error",
      });
    }
    setLoading(false);
    setError(false);
  };

  const onFilterChange = (filter) => {
    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      setActiveFilter(newFilter);
    } else {
      setActiveFilter([...activeFilter, filter]);
    }
  };

  let filteredList;

  if (
    activeFilter.length === 0 ||
    activeFilter.length === filtersByBrand.length + filtersByDepartment.length
  ) {
    filteredList = products;
  } else {
    filteredList = products.filter((item) => {
      return (
        activeFilter.includes(item.brand) ||
        activeFilter.includes(item.departmentId)
      );
    });
  }

  return (
    <div className="product-list-container">
      <section className="filter-wrapper">
        <p className="filter-title">Filter by Department</p>
        <div className="filter-data">
          {error ? <p>Cannot load department filters.</p> : null}
          {!error && filtersByDepartment.length
            ? filtersByDepartment.map((filter) => (
                <span key={filter.id} className="filter-item">
                  <input
                    className="filter-checkbox"
                    id={filter.id}
                    type="checkbox"
                    checked={activeFilter.includes(filter.id)}
                    onChange={() => onFilterChange(filter.id)}
                  />
                  <label htmlFor={filter.id}>{filter.name}</label>
                </span>
              ))
            : null}
        </div>
        <p className="filter-title">Filter by Brand</p>
        <div className="filter-data">
          {error ? <p>Cannot load product brand filters.</p> : null}
          {!error && filtersByBrand.length
            ? filtersByBrand.map((filter, index) => (
                <span key={index} className="filter-item">
                  <input
                    className="filter-checkbox"
                    id={index}
                    type="checkbox"
                    checked={activeFilter.includes(filter.value)}
                    onChange={() => onFilterChange(filter.value)}
                  />
                  <label htmlFor={index}>{filter.name}</label>
                </span>
              ))
            : null}
        </div>
      </section>
      <h1 className="productList__title">Products</h1>
      <section className="products-container">
        {error ? (
          <p className="product-list-message">
            {errMsg} Please refresh the page or try again later.
          </p>
        ) : null}
        {loading ? <Loader message="Loading product list..." /> : null}
        <div className="product-list-product-wrapper">
          {!loading && !error && filteredList.length
            ? filteredList.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  addItemToCheckout={addItemToCheckout}
                />
              ))
            : null}
          {!loading && !error && !filteredList.length ? (
            <p className="product-list-message">
              There are no products that match your filters. Please clear some
              filters to see more producs.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

ProductList.propTypes = {
  updateCheckoutCount: PropTypes.func.isRequired,
};

export default ProductList;
