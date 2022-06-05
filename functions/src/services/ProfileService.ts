import IProfile from '../interfaces/IProfile'
import InvalidValueError from '../errors/InvalidValueError'
import BadRequest from '../errors/BadRequest'
import { db } from '.'
import UnauthenticatedError from '../errors/UnauthenticatedError'


class ProfileService {
    private getProfileCollectionRef() {
        return db.collection('profiles')
    }

    async upsert(requesterUserId: string, newProfile: IProfile): Promise<IProfile> {
        if (!requesterUserId) {
            throw new UnauthenticatedError('You do not have access to do this')
        }
        this.isValid(newProfile)
        await this.getProfileCollectionRef().doc(requesterUserId).set(newProfile)
        return this.get(requesterUserId)
    }

    async get(requesterUserId: string): Promise<IProfile> {
        if (!requesterUserId) {
            throw new UnauthenticatedError('You do not have access to do this')
        }
        const profileSnapshot = await this.getProfileCollectionRef().doc(requesterUserId).get()
        return profileSnapshot.data() as IProfile
    }

    isValid(profile: IProfile): boolean {
        if (!profile) {
            throw new BadRequest('No profile found to validate')
        }
        if (!profile.uid) {
            throw new InvalidValueError('UID is required')
        }
        return true
    }
}

export default new ProfileService()
