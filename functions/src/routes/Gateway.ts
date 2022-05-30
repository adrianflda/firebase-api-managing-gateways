import * as express from 'express'
import GatewayController from '../controllers/GatewayController'

export default class GatewayRoutes {
  public gatewayController: GatewayController = new GatewayController()
  public router: express.Router = express.Router()

  public routes(api): any {
    this.router.get('/', this.gatewayController.list)
    this.router.post('/', this.gatewayController.upsert)
    this.router.get('/:serial', this.gatewayController.get)
    this.router.delete('/:serial', this.gatewayController.delete)

    api.use('/gateways', this.router)
  }
}
