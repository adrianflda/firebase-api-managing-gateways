import IGateway from '../interfaces/IGateway'
import InvalidValueError from '../errors/InvalidValueError'
import BadRequest from '../errors/BadRequest'
import { db } from '.'
import { IGatewayFilter } from '../interfaces/IGatewayFilter'
import UnauthenticatedError from '../errors/UnauthenticatedError'


class GatewayService {
    private getGatewayCollectionRef(requesterUserId: string) {
        return db.collection(`profiles/${requesterUserId}/gateways`)
    }

    async upsert(requesterUserId: string, newGateway: IGateway): Promise<IGateway> {
        if (!requesterUserId) {
            throw new UnauthenticatedError('You do not have access to do this')
        }
        this.isValid(newGateway)
        await this.getGatewayCollectionRef(requesterUserId).doc(newGateway.serial).set(newGateway)
        return this.get(requesterUserId, newGateway.serial)
    }

    async list(requesterUserId: string, filter: IGatewayFilter): Promise<{ entries: IGateway[], lastElementId: string | null, total: number }> {
        if (!requesterUserId) {
            throw new UnauthenticatedError('You do not have access to do this')
        }
        const gateways: IGateway[] = []
        let lastElementId = null

        const snapshot = await this.getGatewayCollectionRef(requesterUserId)
            .orderBy('name')
            // .startAfter(filter.lastElementId)
            .limit(filter.limit || 10)
            .get()

        snapshot.forEach((doc) => {
            gateways.push(doc.data() as IGateway)
        })

        if (snapshot.docs.length > 0) {
            lastElementId = snapshot.docs[snapshot.docs.length - 1].data().serial
        }

        return {
            entries: gateways,
            lastElementId,
            // ! TODO be carefully with this, read here for more details: https://stackoverflow.com/questions/46554091/cloud-firestore-collection-count
            total: snapshot.size,
        }
    }

    async get(requesterUserId: string, serial: string): Promise<IGateway> {
        if (!requesterUserId) {
            throw new UnauthenticatedError('You do not have access to do this')
        }
        const gatewaySnapshot = await this.getGatewayCollectionRef(requesterUserId).doc(serial).get()
        return gatewaySnapshot.data() as IGateway
    }

    async delete(requesterUserId: string, serial: string): Promise<IGateway> {
        if (!requesterUserId) {
            throw new UnauthenticatedError('You do not have access to do this')
        }
        const gatewayToRemove = await this.get(requesterUserId, serial)
        await this.getGatewayCollectionRef(requesterUserId).doc(serial).delete()
        return gatewayToRemove
    }

    isValid(gateway: IGateway): boolean {
        if (!gateway) {
            throw new BadRequest('No gateway found to validate')
        }
        if (!gateway.serial) {
            throw new InvalidValueError('Serial is required')
        }
        if (gateway.address && !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(gateway.address)) {
            throw new InvalidValueError('Invalid ipv4 address')
        }
        if (gateway.devices && gateway.devices.length > 10) {
            throw new InvalidValueError('only 10 devices by gateway allowed')
        }
        return true
    }
}

export default new GatewayService()
