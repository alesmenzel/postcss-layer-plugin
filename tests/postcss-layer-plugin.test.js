import postcss from "postcss";
import layerPlugin from "../postcss-layer-plugin";

describe("Default options", () => {
	const FIXTURES = {
		empty: {
			before: ``,
			after: ``,
		},
		input1: {
			before: `\
@import "path/to/file.css";

.btn {
  padding: 12px;
  color: gray;
}

.btn-danger {
  padding: 12px;
  color: red;
}
`,
			after: `\
@import "path/to/file.css" layer(default);

@layer default{

.btn {
  padding: 12px;
  color: gray;
}

.btn-danger {
  padding: 12px;
  color: red;
}
}
`,
		},
	};

	for (const [name, data] of Object.entries(FIXTURES)) {
		it(`Fixture: ${name}`, async () => {
			const res = await postcss([layerPlugin()]).process(data.before, {
				from: "test-file.js",
			});
			expect(res.css).toBe(data.after);
		});
	}
});

describe("Custom layer name", () => {
	const FIXTURES = {
		input1: {
			before: `\
@import "path/to/file.css";

.btn {
  padding: 12px;
  color: gray;
}

.btn-danger {
  padding: 12px;
  color: red;
}
`,
			after: `\
@import "path/to/file.css" layer(CustomName);

@layer CustomName{

.btn {
  padding: 12px;
  color: gray;
}

.btn-danger {
  padding: 12px;
  color: red;
}
}
`,
		},
	};

	for (const [name, data] of Object.entries(FIXTURES)) {
		it(`Fixture: ${name}`, async () => {
			const res = await postcss([
				layerPlugin({ layerName: "CustomName" }),
			]).process(data.before, {
				from: "test-file.js",
			});
			expect(res.css).toBe(data.after);
		});
	}
});
