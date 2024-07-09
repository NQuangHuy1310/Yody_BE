import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        order_code: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        order_address_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            required: true
        },
        order_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        order_item_ids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderItem',
                required: true
            }
        ],
        order_date: {
            type: Date,
            required: true,
            default: Date.now
        },
        order_total_price: {
            type: Number,
            required: true
        },
        order_voucher_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Voucher'
        },
        order_total_price_after_discount: {
            type: Number
        },
        order_status: {
            type: String,
            enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Giao hàng thành công', 'Đã huỷ'],
            default: 'Chờ xác nhận'
        },
        order_month: {
            type: Date,
            required: true
        },
        order_payment_method: {
            type: String,
            enum: [
                'Tiền mặt',
                'Ví điện tử ZaloPay',
                'Ví điện tử Momo',
                'Thẻ nội địa hoặc ngân hàng',
                'Thẻ quốc tế',
                'Ví điện tử VNPAY'
            ],
            required: true
        },
        order_cancellation_date: {
            type: Date
        },
        order_fulfilled_date: {
            type: Date
        },
        notes: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
)

export const orderModel = mongoose.model('Order', orderSchema)
