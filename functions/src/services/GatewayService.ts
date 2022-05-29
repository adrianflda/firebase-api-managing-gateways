import IGateway from '../interfaces/IGateway'
import InvalidValueError from '../errors/InvalidValueError'
import BadRequest from '../errors/BadRequest'
import { db } from '.'
import { IGatewayFilter } from '../interfaces/IGatewayFilter'

class GatewayService {
    private gatewayCollectionRef = db.collection('gateways')

    async upsert(newGateway: IGateway): Promise<any> {
        this.isValid(newGateway)
        await this.gatewayCollectionRef.doc(newGateway.serial).set(newGateway)
        return this.get(newGateway.serial)
    }

    async list(filter: IGatewayFilter): Promise<{ entries: IGateway[], lastElementId: string | null, total: number }> {
        const gateways: IGateway[] = []
        let lastElementId = null

        const snapshot = await this.gatewayCollectionRef
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

    async get(serial: string): Promise<IGateway> {
        const gatewaySnapshot = await this.gatewayCollectionRef.doc(serial).get()
        return gatewaySnapshot.data() as IGateway
    }

    async delete(serial: string): Promise<IGateway> {
        const gatewayToRemove = await this.get(serial)
        await this.gatewayCollectionRef.doc(serial).delete()
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
