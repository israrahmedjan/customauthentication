'use client';
import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { getCategories } from "@/helper/helper";
import { Search } from "lucide-react";
import Loader from "@/components/Loader";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery, selectedCategory) => {
      if (!searchQuery) return;
      console.log("Searching for:", selectedCategory);
      try {
        setLoading(true);
        const response = await axios.get('/api/search', {
          params: { search: searchQuery, category: selectedCategory },
        });
        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        setError(error.message || 'Server Error');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Input change event handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value, selectedCategory);
  };

  // Product click event handler
  const handleProductClick = (productName) => {
    setQuery(productName); // Input field ko update karo
    setProducts([]); // Search results ko hide kar do
  };

  // Get Categories setting
  const handelCategory = useCallback(async () => {
    const category = await getCategories();
    setCategory(category);
    console.log("Category List", category);
  }, []);

  useEffect(() => {
    handelCategory();
  }, [handelCategory]);

  // Trigger search when category changes
  useEffect(() => {
    debouncedSearch(query, selectedCategory);
  }, [selectedCategory]);

  return (

    <>
      <div className="flex flex-col relative">
        <div><div className="flex items-center  thin-border rounded-lg overflow-hidden shadow-sm w-full max-w-md bg-white">

          {category.length !== 0 && (<>
            <select
              className="h-10 px-4 bg-white border-r border-[#E7E9ED]  outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>All category</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>


         


          <input
            type="text"
            placeholder="Search Products"
            value={query}
            onChange={handleInputChange}
            className="h-8 px-4 flex-1 outline-none"
          />

          <button className="h-8 px-4 text-secondary hover:text-black flex items-center justify-center">
            <Search size={25} />
          </button>
          </>
          )}


        </div></div>
        <div>    
          {loading && (
            <div className=" bg-white border-gray-300 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] shadow-md top-12 w-full absolute z-[99999]"><Loader /></div>)}
           {products.length > 0 && (
          <div className=" bg-white border-gray-300 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] shadow-md top-12 w-full absolute z-[99999]">

            {products.map((prod, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer border-b-[0.5px]"
                onClick={() => handleProductClick(prod.name)}
              >
                <span>{index + 1} - </span>
                <span>{prod.name}</span>

              </div>
            ))}

          </div>
        )}</div>

      </div>



    </>

  );
};

export default SearchBox;