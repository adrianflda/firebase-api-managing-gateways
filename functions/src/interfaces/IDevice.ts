import DeviceStatusEnum from "../enums/DeviceStatusEnum";

export default interface IDevice {
    uuid: number,
    vendor: string,
    createdAt: Date,
    status: DeviceStatusEnum
}
