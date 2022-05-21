import GatewayRoutes from "./Gateway";
import {Auth} from "../Middleware/Auth";

export class Routes {
    public auth: Auth = new Auth()
    public clientRouter: GatewayRoutes = new GatewayRoutes();

    constructor(api) {
      this.routeMiddleware(api);
      this.routerSetup(api);
    }

    public routeMiddleware(api) {
      api.use(this.auth.firebaseAuth);
    }

    public routerSetup(api): void {
      this.clientRouter.routes(api);
    }
}
