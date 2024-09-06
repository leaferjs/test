import { describe, expect, test } from 'vitest'

import { ColorConvert } from 'leafer-test'
import '@leafer-in/color'


describe('color', () => {

    test('name to rgba', () => {
        expect(ColorConvert.object('transparent')).toEqual({ r: 255, g: 255, b: 255, a: 0 })
        expect(ColorConvert.object('springgreen')).toEqual({ r: 0, g: 255, b: 127, a: 1 })
        expect(ColorConvert.object('SpringGreen')).toEqual({ r: 0, g: 255, b: 127, a: 1 })
    })

    test('hex to rgba', () => {
        expect(ColorConvert.object('#FFFFFFFF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
        expect(ColorConvert.object('#FF0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(ColorConvert.object('#F000')).toEqual({ r: 255, g: 0, b: 0, a: 0 })
        expect(ColorConvert.object('#F00')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(ColorConvert.object('#FF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
        expect(ColorConvert.object('#F')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    })

    test('use hex cache', () => {
        expect(ColorConvert.object('#FFFFFFFF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
        expect(ColorConvert.object('#FF0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(ColorConvert.object('#F000')).toEqual({ r: 255, g: 0, b: 0, a: 0 })
        expect(ColorConvert.object('#F00')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(ColorConvert.object('#FF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
        expect(ColorConvert.object('#F')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    })

    test('rgb to rgba', () => {
        expect(ColorConvert.object('rgba(255, 0, 255,1 )')).toEqual({ r: 255, g: 0, b: 255, a: 1 })
        expect(ColorConvert.object('rgba(255, 0, 255, .5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
        expect(ColorConvert.object('rgba(255, 0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
        expect(ColorConvert.object('rgb(255,0,0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(ColorConvert.object('rgb(255, 0, 12 )')).toEqual({ r: 255, g: 0, b: 12, a: 1 })
    })

    test('hsl to rgba', () => {
        expect(ColorConvert.object('hsla(180, 100%, 50%,1 )')).toEqual({ r: 0, g: 255, b: 255, a: 1 })
        expect(ColorConvert.object('hsla(60, 50%, 50%,.5)')).toEqual({ r: 191, g: 191, b: 64, a: 0.5 })
        expect(ColorConvert.object('hsla(60, 50%, 50%, 0.5)')).toEqual({ r: 191, g: 191, b: 64, a: 0.5 })
        expect(ColorConvert.object('hsl(180,100%,50%)')).toEqual({ r: 0, g: 255, b: 255, a: 1 })
        expect(ColorConvert.object('hsl(60, 50%, 50% )')).toEqual({ r: 191, g: 191, b: 64, a: 1 })
    })

})