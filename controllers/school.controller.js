import executeQuery from '../config/database.js'
import asyncHandler from '../utils/AsyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import listSchoolsService from '../services/list-schools-by-distance.service.js'
import {
    validateSchool,
    validateCoordinates,
} from '../services/validation.service.js'

const addSchool = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new ApiError(400, 'Request body is missing')
    }

    const { name, address, latitude, longitude } = req.body
    validateSchool(name, address, latitude, longitude)
    const result = await executeQuery(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
    )
    res.status(200).json(
        new ApiResponse(201, result, 'School added successfully')
    )
})

const listSchools = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.query
    validateCoordinates(latitude, longitude)
    const result = await listSchoolsService(latitude, longitude)
    if (!result || result.length === 0) {
        new ApiResponse(200, [], 'No schools found')
    }
    res.status(200).json(
        new ApiResponse(200, result, 'Schools fetched successfully')
    )
})

export { addSchool, listSchools }
