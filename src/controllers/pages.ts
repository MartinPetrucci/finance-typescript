import {Router} from 'express'
import auth from '../middlewares/auth'

const router = Router()

router.get("/", auth, async (req, res) => {
    res.status(200).send('OK')
})

export default router;