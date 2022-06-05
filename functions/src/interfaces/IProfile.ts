import IGateway from './IGateway'

export default interface IProfile {
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
    gateways?: IGateway[],
} 