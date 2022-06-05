import * as express from 'express'
import ProfileController from '../controllers/ProfileController'

export default class ProfileRoutes {
  public profileController: ProfileController = new ProfileController()
  public router: express.Router = express.Router()

  public routes(api): any {
    this.router.post('/', this.profileController.upsert)
    this.router.get('/', this.profileController.get)
    api.use('/profiles', this.router)
  }
}
