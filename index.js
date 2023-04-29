import { menuArray } from "./data.js"

const orderArray = []

document.addEventListener("click", (e) => {
  if (e.target.dataset.btn) {
    handleAddBtn(e.target.dataset.btn)
  } else if (e.target.dataset.remove) {
    handleRemoveBtn(e.target.dataset.remove)
  }
})

function handleAddBtn(foodId) {
  const targetMealObj = menuArray.filter((meal) => meal.id === foodId)[0]
  const duplicate = orderArray.includes(targetMealObj)

  if (!duplicate) orderArray.push(targetMealObj)
  else
    orderArray.filter((meal) => {
      return meal.id === foodId ? meal.amount++ : meal.amount
    })
  console.log(orderArray)
  getOrderHtml()
}

function totalCost() {
  const totalCost = orderArray.reduce((acc, meal) => {
    return acc + meal.price * meal.amount
  }, 0)
  return totalCost
}

function handleRemoveBtn(foodId) {
  const targetObj = orderArray.filter((meal) => {
    return meal.id === foodId
  })[0]
  const indexToDelete = orderArray.findIndex((order) => {
    return order.id === targetObj.id
  })

  orderArray.filter((meal) => {
    if (meal.id === foodId && meal.amount > 1) {
      meal.amount -= 1
    } else if (meal.amount === 1) {
      orderArray.splice(indexToDelete, 1)
      return orderArray
    }
  })
  getOrderHtml()
}

function getOrderHtml() {
  let orderHtml = ``
  orderArray.map((item) => {
    orderHtml += `
        <div class="order-detail">
            <h2>${item.name} ${item.amount}
                <span data-remove=${item.id} class="remove-btn">
                    remove
                </span>
            </h2>        
            <p>$${item.price * item.amount}</p>
        </div>
    `
  })

  let totalOrder = `
        <div class="container">
            <h2>Your order</h2>
            ${orderHtml}
            <div class="total-price">
                <h2>Total price:</h2>
                <p>$${totalCost()}</p>
            </div>
            
        </div>
    `
  document.querySelector(".order").innerHTML = totalOrder
}

const completeOrderBtn = document.querySelector(".complete-order-btn")
const payForm = document.querySelector(".pay-form")

completeOrderBtn.addEventListener("click", () => {
  if (orderArray.length) payForm.classList.remove("hidden")
})

function getMenuHtml() {
  let menuHtml = ``

  menuArray.map((meal) => {
    menuHtml += `
        <div class="container">
        <div class="section">
            <div class="food-selection">
                <div>
                    <h2>${meal.name}</h2>
                    <p>${meal.ingredients.join(", ")}</p>
                    <p>$${meal.price}</p>  
                </div>  
            </div>
            <button data-btn="${meal.id}">+</button>
        </div>
    </div>
        `
  })
  document.getElementById("foodMenu").innerHTML = menuHtml
}

getMenuHtml()
