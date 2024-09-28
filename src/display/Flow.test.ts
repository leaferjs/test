import { describe, expect, test } from 'vitest'

import { App, Rect } from 'leafer-test'
import { Flow } from '@leafer-in/flow'

describe('Arrow', () => {

    const app = new App({ width: 100, height: 100 })
    const leafer = app.addLeafer()


    test('box bounds', () => {
        const flow = new Flow({ padding: 10, width: 160, flowAlign: 'center' })
        flow.add(new Rect({ width: 150, height: 30 }))
        leafer.add(flow)

        expect(flow.boxBounds).toEqual({ x: 0, y: 0, width: 160, height: 50 })

        flow.height = 40, flow.width = undefined
        expect(flow.boxBounds).toEqual({ x: 0, y: 0, width: 170, height: 40 })

        flow.height = undefined, flow.width = undefined
        expect(flow.boxBounds).toEqual({ x: 0, y: 0, width: 170, height: 50 })

    })

})