import postcss from "postcss"
import layerPlugin from "../postcss-layer-plugin"

const FIXTURES = {
  empty: {
    before: ``,
    after: ``
  },
  input1: {
    before: `\
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
@layer default {.btn {
  padding: 12px;
  color: gray;
}.btn-danger {
  padding: 12px;
  color: red;
}
}
`
  }
}

describe('default options', () => {
  for (const [name, data] of Object.entries(FIXTURES)) {
    it(`Fixture: ${name}`, async () => {
      const res = await postcss([layerPlugin()]).process(data.before, { from: 'test-file.js' })
      expect(res.css).toBe(data.after)
    })
  }
})
