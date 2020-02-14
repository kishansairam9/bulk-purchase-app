import React from 'react'

export default function Order({ order, showReviewRating }) {
  return (
    <div class="card">
      {/* <img src="..." class="card-img-top" alt="..." /> */}
      <div class="card-body">
        <h5 class="card-title bg-primary text-white">{order.name}</h5>
        <h6 class="card-subtitle mb-2 font-bold">Price of each</h6>
        <p class="card-text">{order.productPrice}</p>
        <h6 class="card-subtitle mb-2 text-muted font-bold">Quantity</h6>
        <p class="card-text text-muted">{order.quantity}</p>
        {showReviewRating &&
          <div>
            <div>
              {order.rating &&
                <div class="bg-warning text-dark container">
                  <h6 class="card-subtitle mb-2 font-bold">Rating</h6>
                  <p class="card-text">{order.rating}</p>
                </div>
              }
              {order.review &&
                <div class="bg-info text-white container">
                  <h6 class="card-subtitle mb-2 font-bold">Review</h6>
                  <hr />
                  <p class="card-text">{order.review}</p>
                </div>
              }
            </div>

            <div class="card-footer">
              <h6 class="card-subtitle mb-2 font-bold">Customer Name</h6>
              <p class="card-text">{order.customerName}</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
