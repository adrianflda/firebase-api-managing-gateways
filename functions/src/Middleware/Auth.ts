import { info } from 'firebase-functions/lib/logger'
import { admin } from '../services'

export class Auth {
  public firebaseAuth(req, res, next): void {
    const authorizationHeader: string | undefined = req.header('Authorization')
    if (authorizationHeader) {
      const idToken = authorizationHeader.replace('Bearer ', '')
      admin.auth().verifyIdToken(idToken)
        .then((user) => {
          req.user = user
          next()
        })
        .catch((err) => {
          res.status(401).json(err)
        })
    } else {
      res.status(401).json({ error: 'Authorization header is not found' })
    }
  }
}
