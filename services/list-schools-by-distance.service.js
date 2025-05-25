import executeQuery from '../config/database.js'
const RADIUS_OF_EARTH_KM = 6371 // Earth's radius in kilometers
// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const toRad = (value) => (value * Math.PI) / 180

    const lat1Rad = toRad(lat1)
    const lon1Rad = toRad(lon1)
    const lat2Rad = toRad(lat2)
    const lon2Rad = toRad(lon2)

    // Haversine formula
    const dLat = lat2Rad - lat1Rad
    const dLon = lon2Rad - lon1Rad

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) *
            Math.cos(lat2Rad) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = RADIUS_OF_EARTH_KM * c

    return distance
}

const listSchoolsService = async (latitude, longitude) => {
    // Parse coordinates to ensure they're numbers
    const userLat = parseFloat(latitude)
    const userLon = parseFloat(longitude)

    // Fetch all schools from the database
    const schools = await executeQuery('SELECT * FROM schools')

    // Check if we have valid user coordinates and schools
    if (!schools || schools.length === 0) {
        return []
    }

    // Add distance to each school
    const schoolsWithDistance = schools.map((school) => {
        // Make sure school coordinates are numbers
        const schoolLat = parseFloat(school.latitude)
        const schoolLon = parseFloat(school.longitude)

        // Log coordinates for debugging
        console.log(
            `User: ${userLat}, ${userLon} | School: ${schoolLat}, ${schoolLon}`
        )

        const distance = calculateDistance(
            userLat,
            userLon,
            schoolLat,
            schoolLon
        )

        console.log(`Calculated distance: ${distance} km`)

        return { ...school, distance: Number(distance.toFixed(2)) }
    })

    // Sort schools by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance)

    return schoolsWithDistance
}

export default listSchoolsService
