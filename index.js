import { menuArray } from './data.js'
const orderArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.btn) {
        getOrderField(e.target.dataset.btn)
    } else if(e.target.dataset.remove) {
        removeFromOrder(e.target.dataset.remove)
    }
    
})

function getOrderField(foodId){
    const targetMealObj = menuArray.filter(meal => meal.id === foodId)[0]
    orderArray.push(targetMealObj)
    
    const uniqueChars = orderArray.filter((item, index) => {
        const isdDuplicate = orderArray.indexOf(item) === index
        if (isdDuplicate) {
            return isdDuplicate
        }
        console.log(item.price + item.price)
    })
    // console.log(uniqueChars)
    
    let orderHtml = ``
    uniqueChars.map(item => {
        orderHtml += `
        <div class="order-detail">
            <h2>${item.name} <span data-remove=${item.id} id="remove">remove</span></h2>        
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
                <p>$14</p>
            </div>
            <button>Complete order</button>
        </div>
    `
    document.getElementById('total-order').innerHTML = totalOrder
}

function removeFromOrder(removeId) {
    const targetObj = orderArray.filter(meal => {
        return meal.id === removeId
    })[0]
    const indexToDelete = orderArray.findIndex(order => {
        return order.id === targetObj.id
    })
    
    orderArray.splice(indexToDelete, 1)
    render()
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
            <button data-btn="${meal.id}">+</button>
        </div>
    </div>
        `   
    })    
    return menuHtml
}

function getOrderHtml() {
    let orderHtml = ``
    
    
}

function render(){
    document.getElementById('foodMenu').innerHTML = getMenuHtml()
}

render()




{/* ORDER
<div class="container">
    <h2>Your order</h2>
    <div class="order-detail">
        <h2>${targetMealObj.name} <span id="remove">remove</span></h2>        
        <p>$${targetMealObj.price}</p>
    </div>
    <div class="total-price">
        <h2>Total price:</h2>
        <p>$14</p>
    </div>
    <button>Complete order</button>
</div>
*/}