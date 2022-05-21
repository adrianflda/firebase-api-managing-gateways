import * as functions from 'firebase-functions'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './routes'
import * as cors from 'cors'
import './services'

class Api {
  public api: express.Application
  public app: express.Application
  public routes: Routes

  constructor() {
    this.app = express()
    this.api = express()
    this.config()
    this.routes = new Routes(this.app)
  }

  private config(): void {
    this.app.use(cors())
    this.api.use('/api/v1', this.app)
    this.api.use(bodyParser.json())
    this.api.use(bodyParser.urlencoded({ extended: false }))
  }
}
// webApi is your functions name, and you will pass this.api as a parameter
export const webApi = functions.https.onRequest(new Api().api)
