import mongoose from 'mongoose'

const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new Error('ID của bạn không hợp lệ!')
}

export default validateMongodbId
