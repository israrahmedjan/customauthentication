import React from 'react'
import axios from 'axios';
async function getCategories(slug="") {

  const response = await axios.get('/api/categories',
    
  );
  return response.data.data;
}


async function productDetail(categorySlug="",productSlug="") {
console.log("My slug",productSlug);
  const response = await axios.get('/api/productsDetail', {
    params: {
      productSlug: productSlug,
      categorySlug: categorySlug
    },
  });
  return response.data.data;
}




  export {getCategories,productDetail}