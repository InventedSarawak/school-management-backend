import { Router } from 'express'
import { addSchool, listSchools } from '../controllers/school.controller.js'

const router = Router()

router.get('/', (req, res) => {
    res.send('School')
})

router.post('/addSchool', addSchool)
router.get('/listSchools', listSchools)

export default router
