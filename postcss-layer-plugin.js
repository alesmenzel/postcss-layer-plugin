import postcss from 'postcss'

const plugin = (opts = {}) => {
  const layerName = opts.layerName || 'default'

  return (root) => {
    // The stylesheet is empty
    if (!root.nodes.length) return

    // Avoid wrapping if it's already layered
    const alreadyLayered = root.nodes.some(
      (node) => node.type === 'atrule' && node.name === 'layer'
    )
    if (alreadyLayered) return

    // Create a new @layer rule and move all existing nodes inside it
    const layer = postcss.atRule({ name: 'layer', params: layerName })

    root.each((node) => {
      node.remove()
      layer.append(node)
    })
    root.append(layer)
  }
}

plugin.postcss = true

export default plugin
