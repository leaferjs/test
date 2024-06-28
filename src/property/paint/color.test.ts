import { describe, expect, test } from 'vitest'

import { ColorConvert } from 'leafer-ui-node'


describe('color', () => {

    test('string', () => {
        expect(ColorConvert.string('#fff', 0.6)).toBe('#fff')
        expect(ColorConvert.string({ r: 255, g: 255, b: 255 }, 0.6)).toBe('rgba(255,255,255,0.6)')
        expect(ColorConvert.string({ r: 255, g: 255, b: 255, a: 1 }, 1)).toBe('rgb(255,255,255)')
    })

})