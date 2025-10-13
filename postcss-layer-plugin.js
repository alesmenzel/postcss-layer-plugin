import postcss from "postcss";

const plugin = (opts = {}) => {
	const layerName = opts.layerName || "default";

	return (root) => {
		// The stylesheet is empty
		if (!root.nodes.length) return;

		// Avoid wrapping if it's already layered
		const alreadyLayered = root.nodes.some(
			(node) => node.type === "atrule" && node.name === "layer"
		);
		if (alreadyLayered) return;

		const importNodes = [];
		const otherNodes = [];

		root.each((node) => {
			if (node.type === "atrule" && node.name === "import") {
				importNodes.push(node);
			} else {
				otherNodes.push(node);
			}
		});

		// Remove all nodes to rebuild in correct order
		root.removeAll();

		// Keep @import statements at the top
		importNodes.forEach((node) => {
			// Avoid duplicating if already has layer()
			if (!node.params.includes("layer(")) {
				// Trim trailing semicolon if present in params
				const params = node.params.trim().replace(/;$/, "");
				node.params = `${params} layer(${layerName})`;
			}
			root.append(node);
		});

		// Create @layer and move all non-import rules inside
		if (otherNodes.length) {
			const layer = postcss.atRule({ name: "layer", params: layerName });
			otherNodes.forEach((node) => layer.append(node));
			root.append(layer);
		}
	};
};

plugin.postcss = true;

export default plugin;
