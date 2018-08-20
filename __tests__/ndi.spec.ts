import Ndi from "../src";
import { INdi } from "../src/structures";

const logger = s => {
	process.stdout.write(s + "\n");
};
let ndi: INdi;

it("create instance", () => {
	ndi = new Ndi(
		{
			throwSetParameter: false,
			debugSetParameter: true
		},
		logger
	);
});

it("set/get varible", () => {
	ndi.set("firstname", () => "Jhon");
	ndi.set("lastname", () => "Konstantin");
	expect(ndi.get("firstname")).toEqual("Jhon");
	expect(ndi.get("lastname")).toEqual("Konstantin");
});

it("debug on rewrite", () => {
	let debugIsTriggered = false;
	ndi.logger = () => debugIsTriggered = true;
	ndi.set("firstname", () => "Piter");
	expect(debugIsTriggered).toEqual(true);
	ndi.logger = logger;
	ndi.config.throwSetParameter = true;
});

it("throwed on rewrite", () => {
	expect(() => ndi.set("firstname", () => "Piter")).toThrow();
});

it("toObject method", () => {
	expect(ndi.toObject()).toEqual({
		firstname: "Jhon",
		lastname: "Konstantin"
	});
});

it("toLazyObject method", () => {
	const lazyObject = ndi.toLazyObject();
});

it("test eventemmiter", () => {
	let isFire = false;
	ndi.on("fire", () => isFire = true);
	ndi.emit("fire");
	expect(isFire).toEqual(true);
});
