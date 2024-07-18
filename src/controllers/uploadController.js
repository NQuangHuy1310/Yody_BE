/* eslint-disable no-console */
import fs from 'fs'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cloudinaryUploadImage, cloudinaryDeleteImage } from '~/utils/cloudinary'

const uploadImages = async (req, res, next) => {
    try {
        const uploader = (path) => cloudinaryUploadImage(path, 'images')
        const urls = []
        const files = req.files
        for (const file of files) {
            const { path } = file
            const newpath = await uploader(path)
            // eslint-disable-next-line no-console
            console.log(newpath)
            urls.push(newpath)
            fs.unlinkSync(path)
        }
        const images = urls.map((file) => {
            return file
        })
        res.status(StatusCodes.OK).json({
            message: 'Upload hình ảnh thành công',
            images
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Server có lỗi, vui lòng thử lại sau'))
    }
}

const deleteImages = async (req, res, next) => {
    const { id } = req.params

    try {
        // eslint-disable-next-line no-unused-vars
        const deleted = await cloudinaryDeleteImage(id, 'images')
        res.status(StatusCodes.OK).json({
            message: 'Xoá hình ảnh thành công'
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Server có lỗi, vui lòng thử lại sau'))
    }
}

export { uploadImages, deleteImages }
