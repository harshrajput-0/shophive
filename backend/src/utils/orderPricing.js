import Product from "../models/product.model.js"

export const decrementStock = async (items) => {
    const decrement = [];

    for (const item of items) {
        const updated = await Product.findOneAndUpdate(
            { _id: item.productId, stock: { $gte: item.qty } },
            { $inc: { stock: -item.qty } },
            { new: true }
        );

        if (!updated){
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

