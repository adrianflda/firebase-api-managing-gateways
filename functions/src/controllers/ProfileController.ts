import { Response } from 'express'
import InvalidValueError from '../errors/InvalidValueError'
import IProfile from '../interfaces/IProfile'
import ProfileService from '../services/ProfileService'
import { info } from 'firebase-functions/lib/logger'
import { IUser } from '../interfaces/IUser'
import { IRequest } from '../interfaces/IRequest'
import UnauthenticatedError from '../errors/UnauthenticatedError'

export default class ProfileController {
  async upsert(req: IRequest, res: Response) {
    try {
      const user = req.user as IUser
      const {
        email,
        firstName,
        lastName,
        uid,
        ...remainingData
      } = req.body as unknown as IProfile

      if (Object.keys(remainingData).length > 0) {
        throw new InvalidValueError(`Unknown data ${Object.keys(remainingData).join(', ')}`)
      }

      if (user.uid !== uid) {
        throw new UnauthenticatedError('You have not access to do this')
      }

      const newProfileResponse = await ProfileService.upsert(user.uid, { uid: user.uid, email, firstName, lastName })

      res.status(200)
      res.json({
        status: 'success',
        message: 'Profile processed successfully',
        data: newProfileResponse,
      })
    } catch (error: any) {
      res.status(error.httpStatusCode || 500).json(error.message)
    }
  }

  async get(req: IRequest, res: Response): Promise<void> {
    try {
      const user = req.user as IUser
      const {
        ...remainingQueryParams
      } = req.params as Record<string, string>

      if (Object.keys(remainingQueryParams).length > 0) {
        throw new InvalidValueError(`Unknown query params ${Object.keys(remainingQueryParams).join(', ')}`)
      }

      const profileResponse = await ProfileService.get(user.uid)

      res.status(200)
      res.json({
        status: 'success',
        message: 'Profile read successfully',
        data: profileResponse,
      })
    } catch (error: any) {
      res.status(error.httpStatusCode || 500).json(error.message)
    }
  }
}
