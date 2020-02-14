import React from 'react'

export default function Product({ product }) {
  return (
    <div class="card">
      {/* <img src="..." class="card-img-top" alt="..." /> */}
      <div class="card-body">
        <h5 class="card-title bg-primary text-white">{product.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Price: {product.price}</h6>
        <div class="card-footer">
          Quantity Left : {product.quantityLeft}
        </div>
      </div>
    </div>
  )
}
