import express, { Application, Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { config } from './db.config'
import { Edcan } from './entity'

const app: Application = express()

dotenv.config()

const port: any = process.env.PORT

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.post('/my-page', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;
    await config.query('DELETE FROM edcan')
    await config.query(`INSERT INTO edcan (id, name) VALUES (1, '${name}');`).then(
      async (result: any) => {
        res.json({ message: 'success', code: 200 })
      }
    )
  }
  catch (err) {
    console.log(err)
    res.json({ code: 404, message: 'failed' })
  }
})

app.get('/my-page', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.query;
    await config.query(`SELECT * from edcan where id=${id}`).then(
      async (result: any) => {
        res.json({ message: 'success', code: 200, result: result[0].name })
      }
    )
  }
  catch (err) {
    console.log(err)
    res.json({ code: 404, message: 'failed' })
  }
})

config.initialize().then(() =>
  console.log("☘️ DB Connection!")
)

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`)
})