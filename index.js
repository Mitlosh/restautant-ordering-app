import { menuArray } from './data.js'
const orderArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.btn) {
        handleAddBtn(e.target.dataset.btn)
    } else if(e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove)
    } 
})

function handleAddBtn(foodId){
    const targetMealObj = menuArray.filter(meal => meal.id === foodId)[0]
    const duplicate = orderArray.includes(targetMealObj)
    if(!duplicate) orderArray.push(targetMealObj)
    else orderArray.filter(meal => {
        if (meal.id === foodId) {
            meal.amount += 1
        }
    })
    
    // const deleteDuplicateMeal = orderArray.filter((item, index) => {
    //     const isdDuplicate = orderArray.indexOf(item) === index
    //     if (isdDuplicate) {
    //         return isdDuplicate
    //     }
    // })

    const totalCost = orderArray.reduce((acc, meal) => {
        acc + meal.price * meal.amount
        
        console.log(acc + meal.price * meal.amount)
    }, 0)

    getOrderHtml(totalCost)
}

function getOrderHtml(totalCost) {
    let orderHtml = ``
    orderArray.map(item => {
        orderHtml += `
        <div class="order-detail">
            <h2>${item.name}
                <span data-remove=${item.id} class="button remove-btn">
                    remove
                </span>
            </h2>        
            <p>$${item.price}</p>
        </div>
    `
    })
    
    let totalOrder = `
        <div class="container">
            <h2>Your order</h2>
            ${orderHtml}
            <div class="total-price">
                <h2>Total price:</h2>
                <p>$${totalCost}</p>
            </div>
            <button>Complete order</button>
        </div>
    `
    document.getElementById('total-order').innerHTML = totalOrder
}

function handleRemoveBtn(foodId) {
    const targetObj = orderArray.filter(meal => {
        return meal.id === foodId
    })[0]
    const indexToDelete = orderArray.findIndex(order => {
        return order.id === targetObj.id
    })
    
    orderArray.splice(indexToDelete, 1)
    console.log(orderArray)
    getOrderHtml()
}

function getMenuHtml(){    
    let menuHtml = ``
    
    menuArray.map(meal => {        
        menuHtml += `
        <div class="container">
        <div class="section">
            <div class="food-selection">
                <img class="food-img" src="${meal.image}" alt="pizza-img">
                <div>
                    <h2>${meal.name}</h2>
                    <p>${meal.ingredients}</p>
                    <p>$${meal.price}</p>  
                </div>  
            </div>
            <button class="button" data-btn="${meal.id}">+</button>
        </div>
    </div>
        `   
    })    
    document.getElementById('foodMenu').innerHTML = menuHtml
}

getMenuHtml()

