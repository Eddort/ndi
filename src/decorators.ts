export function protectSet(
	target: object,
	method: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	descriptor.value = function(key: string, ...args: [any]) {
		const { config } = this;
		const { logger } = this;
		const { state } = this;
		if (state[key]) {
			if (config.throwSetParameter) {
				throw new Error(`container has ${key}`);
			}
			if (config.debugSetParameter) {
				logger(`${target} has ${key}`);
			}
		}
		return originalMethod.apply(this, [key, ...args]);
	};
}
