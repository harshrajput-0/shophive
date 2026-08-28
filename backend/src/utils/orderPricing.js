import Product from "../models/product.model.js"

export const decrementStock = async (items) => {
    const decremented = [];

    for (const item of items) {
        const updated = await Product.findOneAndUpdate(
            { _id: item.productId, stock: { $gte: item.qty } },
            { $inc: { stock: -item.qty } },
            { new: true }
        );

        if (!updated) {
            for (const d of decremented) {
                await Product.findByIdAndUpdate(d.productId, { $inc: { stock: d.qty } });
            }

            const err = new Error("An item went out of stock, please try again");
            err.status = 409
            throw err;
        }
        decremented.push(item);
    }
};


export const buildOrderItems = async (cartItems) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        const err = new Error("No order items");
        err.status = 400;
        throw err;
    }

    const items = [];
    let totalAmount = 0;

    for (const ci of cartItems) {
        const product = await Product.findById(ci.productId);

        if (!product) {
            const err = new Error(`Product not found: ${ci.productId}`);
            err.status = 404;
            throw err;
        }

        const qty = Number(ci.qty);
        if (!qty || qty < 1) {
            const err = new Error(`Invalid quantity for ${product.name}`);
            err.status = 400;
            throw err;
        }

        if (product.stock < qty) {
            const err = new Error(`Insufficient stock for ${product.name}`);
            err.status = 400;
            throw err;
        }


        items.push({
            productId: product._id,
            vendor: product.vendor,
            qty,
            price: product.price
        })
        totalAmount += product.price * qty;
    }

    return { items, totalAmount };
}
