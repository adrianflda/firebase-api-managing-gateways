import IDevice from './IDevice'

export default interface IGateway {
    serial: string,
    name: string,
    address: string,
    devices: IDevice[],
    deleted: boolean
}
