import GatewayRoutes from './Gateway'
import ProfileRoutes from './Profile'
import { Auth } from '../Middleware/Auth'

export class Routes {
  public auth: Auth = new Auth()
  public gatewaysRouter: GatewayRoutes = new GatewayRoutes()
  public profileRouter: ProfileRoutes = new ProfileRoutes()

  constructor(api) {
    this.routeMiddleware(api)
    this.routerSetup(api)
  }

  public routeMiddleware(api) {
    api.use(this.auth.firebaseAuth)
  }

  public routerSetup(api): void {
    this.gatewaysRouter.routes(api)
    this.profileRouter.routes(api)
  }
}
