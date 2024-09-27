import { describe, expect, test } from 'vitest'

import { App } from 'leafer-test'
import { Arrow } from '@leafer-in/arrow'

describe('Arrow', () => {

    const app = new App({ width: 100, height: 100 })
    const leafer = app.addLeafer()


    test('box bounds', () => {
        const arrow = new Arrow({ stroke: 'green' })
        arrow.path = 'M304 302 L402 302 A5 5 0 0 1 407 307 L407 497 A5 5 0 0 0 412 502 L419 502 L500 502'
        leafer.add(arrow)

        expect(arrow.boxBounds).toEqual({ x: 304, y: 302, width: 196, height: 200 }) // 不能包含箭头的大小
    })

})