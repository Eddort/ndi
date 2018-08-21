import { IObject } from "./structures";
import { protectSet } from "./decorators";
import { EventEmitter } from "events";

class Ndi extends EventEmitter {
	public config: IObject;
	public logger: (s: any) => void;
	private cache: IObject;
	private state: IObject;
	constructor(config: object, logger: (s: any) => void) {
		super();
		this.config = config;
		this.logger = logger;
		this.cache = {};
		this.state = {};
	}
	public toObject(): object {
		return Object.keys(this.state).reduce(
			(accum: IObject, key): IObject => {
				accum[key] = this.get(key);
				return accum;
			},
			{}
		);
	}
	public toLazyObject(): object {
		return Object.keys(this.state).reduce(
			(accum: IObject, key): IObject => {
				accum[key] = this.get(key);
				return accum;
			},
			{}
		);
	}
	public get(key: string): any {
		if (this.cache[key]) {
			return this.cache[key];
		}
		this.cache[key] = this.state[key]();
		return this.cache[key];
	}
	@protectSet
	public set(key: string, value: () => any): void {
		this.state[key] = value;
	}
	// несколько хуков и хендлеров
	// для того, что можно было делать не только lazy но и вотчить изменения итд
	private proxify(
		target: object,
		handler: () => void,
		hook: string,
		deep: boolean
	): any {
		if (!deep) {
			return this.proxifyOnce(target, handler, hook);
		}
		return 1;
	}
	private proxifyOnce(
		target: object,
		handler: () => void,
		hook: string
	): any {
		return new Proxy(target, {
			// [hook]:
		});
	}
}

export default Ndi;
