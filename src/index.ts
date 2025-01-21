//import * as skia from 'skia-canvas'
import skia from '@napi-rs/canvas'
import { useCanvas } from '@leafer-ui/node'
import '@leafer-in/viewport'
import '@leafer-in/find'
import '@leafer-in/export'

//useCanvas('skia', skia)
useCanvas('napi', skia) // must

export * from '@leafer-ui/node'