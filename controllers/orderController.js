const Order = require("../models/OrderModel")
const OrderItems = require("../models/OrderItemsModel")

// place order
exports.placeOrder = async (req, res) => {
    let orderItemsIds = await Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let new_orderItem = new OrderItems({
                product: orderItem.product,
                quantity: orderItem.quantity
            })
            new_orderItem = await new_orderItem.save()
            if (!new_orderItem) {
                return res.status(400).json({ error: "Something went wrong" })
            }
            return new_orderItem._id
        })
    )

    // calculate total_price
    let individual_order_total = await Promise.all(
        orderItemsIds.map(async (orderItem) => {
            let order = await OrderItems.findById(orderItem).populate('product', 'product_price')
            let individual_total = order.quantity * order.product.product_price
            return individual_total
        })
    )
    //order total
    let total_price = individual_order_total.reduce((acc, cur) => acc + cur)

    let order = new Order({
        orderItems: orderItemsIds,
        user: req.body.user,
        total_price: total_price,
        shipping_address: req.body.shipping_address,
        alternate_shipping_address: req.body.alternate_shipping_address,
        city: req.body.city,
        country: req.body.country,
        zip: req.body.zip,
        phone: req.body.phone
    })
    order = await order.save()
    if (!order) {
        res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// orderItems = [{product: product1, quantity: 5},{product: product2, quantity: 10}]

// view orders
exports.orderlist = async (req, res) => {
    let orders = await Order.find()
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(orders)
}

// order details
exports.orderDetails = async (req, res) => {
    let order = await Order.findById(req.params.id).populate({ path: 'orderItems', populate: { path: 'product', populate: { path: 'category' } } }).populate('user', 'username')
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// update order
exports.updateOrder = async (req, res) => {
    let order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    },
        { new: true })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// to view order of a user
exports.userOrder = async (req, res) => {
    let order = await Order.find({ user: req.params.user_id }).populate({ path: 'orderItems', populate: { path: 'product', populate: { path: 'category' } } })
    if (!order) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(order)
}

// delete order
exports.deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(400).json({ error: "Order not found" })
            }
            order.orderItems.map((orderItemId) => {
                OrderItems.findByIdAndRemove(orderItemId)
                    .then(orderItem => {
                        if (!orderItem) {
                            return res.status(400).json({ error: "Failed to delete item" })
                        }
                    })
            })
            res.status(200).json({ message: "order deleted successfully" })

        })
}