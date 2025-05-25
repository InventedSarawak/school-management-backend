import ApiError from '../utils/ApiError.js'

export const validateSchool = (name, address, latitude, longitude) => {
    // Check if name is provided and is a string
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new ApiError(400, 'Invalid school name')
    }

    // Check if address is provided and is a string
    if (!address || typeof address !== 'string' || address.trim() === '') {
        throw new ApiError(400, 'Invalid school address')
    }

    validateCoordinates(latitude, longitude)
}

export const validateCoordinates = (latitude, longitude) => {
    // Parse to numbers for validation
    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)

    // Check if coordinates are valid numbers
    if (isNaN(lat) || isNaN(lng)) {
        throw new ApiError(400, 'Latitude and longitude must be valid numbers')
    }

    // Check latitude range (-90 to 90)
    if (lat < -90 || lat > 90) {
        throw new ApiError(400, 'Latitude must be between -90 and 90')
    }

    // Check longitude range (-180 to 180)
    if (lng < -180 || lng > 180) {
        throw new ApiError(400, 'Longitude must be between -180 and 180')
    }
}
