export interface Device {
	userId: string;
	ip: string;
	cpu: number;
	ram: number;
	ping: number;
	isOnline: boolean;
}

export type DeviceInfoKeys = keyof Device;