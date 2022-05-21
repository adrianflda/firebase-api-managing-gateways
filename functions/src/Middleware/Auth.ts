import {admin} from "../services";

export class Auth {
  public firebaseAuth(req, res, next): void {
    if (req.header("Authorization")) {
      admin.auth().verifyIdToken(req.header("Authorization"))
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            res.status(401).json(err);
          });
    } else {
      res.status(401).json({error: "Authorization header is not found"});
    }
  }
}
