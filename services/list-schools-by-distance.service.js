import executeQuery from '../config/database.js'
const RADIUS_OF_EARTH_KM = 6371

function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180

    lat1 = Number(lat1)
    lon1 = Number(lon1)
    lat2 = Number(lat2)
    lon2 = Number(lon2)

    const lat1Rad = toRad(lat1)
    const lon1Rad = toRad(lon1)
    const lat2Rad = toRad(lat2)
    const lon2Rad = toRad(lon2)

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
    const userLat = Number(latitude)
    const userLon = Number(longitude)

    const schools = await executeQuery('SELECT * FROM schools')

    if (!schools || schools.length === 0) {
        return []
    }

    const schoolsWithDistance = schools.map((school) => {
        const schoolLat = Number(school.latitude)
        const schoolLon = Number(school.longitude)
        const distance = calculateDistance(
            userLat,
            userLon,
            schoolLat,
            schoolLon
        )
        return { ...school, distance: Number(distance.toFixed(2)) }
    })
    schoolsWithDistance.sort((a, b) => a.distance - b.distance)

    return schoolsWithDistance
}

export default listSchoolsService
