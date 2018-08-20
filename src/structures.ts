import { EventEmitter } from "events";

export interface INdi extends EventEmitter {
	config: IObject;
	logger: (s: any) => void;
	toObject(): object;
	toLazyObject(): object;
	set(key: string, value: () => any): void;
	get(key: string): any;
}

export interface IObject {
	[key: string]: any;
}
