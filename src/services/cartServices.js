import { cartModel } from '~/models/cartModel'

const createCart = async (cardData) => {
    return await cartModel.create(cardData)
}

const getCartByUserId = async (userId) => {
    return await cartModel.find({ cart_user_id: userId }).populate('cart_product_id').populate('cart_product_variant')
}

// cập nhật số lượng sản phẩm
const updateCartQuantityItem = async (cardId, newQuantity) => {
    return await cartModel.findByIdAndUpdate(cardId, { cart_quantity: newQuantity }, { new: true })
}

// Tính tổng giá trị của giỏ hàng
const calculateCartTotal = async (userId) => {
    const cart = await cartModel.find({ cart_user_id: userId })

    return cart.reduce((total, item) => total + item.cart_total_price, 0)
}

// Kiểm tra sản phẩm đã tòn tại trong giỏ hàng hay chưa
const isProductInCart = async (userId, productId) => {
    const cart = await cartModel.find({ cart_user_id: userId, cart_product_id: productId })
    return !!cart
}

// Cập nhật thông tin sản phẩm trong giỏ hàng
const updateCartItemProduct = async (cartId, newProductId, newVariantId) => {
    return await cartModel.findByIdAndUpdate(
        cartId,
        {
            cart_product_id: newProductId,
            cart_product_variant: newVariantId
        },
        { new: true }
    )
}

const deleteCartItem = async (cardId) => {
    return await cartModel.findByIdAndDelete(cardId)
}

const clearCart = async (userId) => {
    return await cartModel.deleteMany({ cart_user_id: userId })
}

export const cartServices = {
    createCart,
    getCartByUserId,
    updateCartQuantityItem,
    calculateCartTotal,
    isProductInCart,
    deleteCartItem,
    clearCart,
    updateCartItemProduct
}
