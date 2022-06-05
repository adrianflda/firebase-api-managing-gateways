import { Response } from 'express'
import InvalidValueError from '../errors/InvalidValueError'
import IGateway from '../interfaces/IGateway'
import GatewayService from '../services/GatewayService'
import { info } from 'firebase-functions/lib/logger'
import { IUser } from '../interfaces/IUser'
import { IRequest } from '../interfaces/IRequest'

export default class GatewayController {
  async upsert(req: IRequest, res: Response) {
    try {
      const user = req.user as IUser
      const {
        serial,
        name,
        address,
        devices,
        deleted,
        ...remainingData
      } = req.body as unknown as IGateway

      if (Object.keys(remainingData).length > 0) {
        throw new InvalidValueError(`Unknown data ${Object.keys(remainingData).join(', ')}`)
      }

      const newGatewayResponse = await GatewayService.upsert(user.uid, {
        serial, name, address, devices, deleted
      })

      res.status(200)
      res.json({
        status: 'success',
        message: 'Gateway processed successfully',
        data: { entries: [newGatewayResponse] },
      })
    } catch (error: any) {
      res.status(error.httpStatusCode || 500).json(error.message)
    }
  }

  async list(req: IRequest, res: Response) {
    try {
      const user = req.user as IUser
      const {
        limit,
        lastElementId,
        ...remainingQueryParams
      } = req.query as Record<string, string | number>

      if (Object.keys(remainingQueryParams).length > 0) {
        throw new InvalidValueError(`Unknown query params ${Object.keys(remainingQueryParams).join(', ')}`)
      }

      const filter = {
        limit: typeof limit === 'string' ? parseInt(limit || '10') : limit || 0,
        lastElementId: `${lastElementId}`
      }
      const gatewayResponse = await GatewayService.list(user.uid, filter)

      res.status(200)
      res.json({
        status: 'success',
        message: 'Gateway read successfully',
        data: gatewayResponse,
      })
    } catch (error: any) {
      res.status(error.httpStatusCode || 500).json(error.message)
    }
  }

  async get(req: IRequest, res: Response): Promise<void> {
    try {
      const user = req.user as IUser
      const {
        serial,
        ...remainingQueryParams
      } = req.params as Record<string, string>

      if (Object.keys(remainingQueryParams).length > 0) {
        throw new InvalidValueError(`Unknown query params ${Object.keys(remainingQueryParams).join(', ')}`)
      }

      const gatewayResponse = await GatewayService.get(user.uid, serial)

      res.status(200)
      res.json({
        status: 'success',
        message: 'Gateway read successfully',
        data: { entries: [gatewayResponse] },
      })
    } catch (error: any) {
      res.status(error.httpStatusCode || 500).json(error.message)
    }
  }

  async delete(req: IRequest, res: Response) {
    try {
      const user = req.user as IUser
      const {
        serial,
        ...remainingQueryParams
      } = req.params as Record<string, string>

      if (Object.keys(remainingQueryParams).length > 0) {
        throw new InvalidValueError(`Unknown query params ${Object.keys(remainingQueryParams).join(', ')}`)
      }

      const gatewayResponse = await GatewayService.delete(user.uid, serial)

      res.status(200)
      res.json({
        status: 'success',
        message: 'Gateway deleted successfully',
        data: { entries: [gatewayResponse] },
      })
    } catch (error: any) {
      res.status(error.httpStatusCode || 500).json(error.message)
    }
  }
}
