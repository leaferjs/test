import { describe, expect, test } from 'vitest'

import { Matrix } from 'leafer-test'
import { IMatrixData, ILayoutData } from '@leafer-ui/interface'


let m: IMatrixData
let layout: ILayoutData

describe('matrix', () => {


    test('decompose scale', () => {
        const matrix = new Matrix()

        // int
        layout = { x: 100, y: 100, scaleX: 1, scaleY: 3, rotation: 0, skewX: 0, skewY: 0 }
        matrix.setLayout(layout)
        m = matrix.get()

        expect(matrix.getLayout()).toEqual(layout)
        expect(matrix.setLayout(layout).get()).toEqual(m)

        // float
        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 0.3, rotation: 0, skewX: 0, skewY: 0 })
        expect(matrix.getLayout()).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 0.3, rotation: 0, skewX: 0, skewY: 0 })

        matrix.setLayout({ x: 100, y: 100, scaleX: 0.2, scaleY: 300, rotation: 30, skewX: 0, skewY: 0 })
        expect(matrix.getLayout()).toEqual({ x: 100, y: 100, scaleX: 0.2, scaleY: 300, rotation: 30, skewX: 0, skewY: 0 })
    })


    test('decompose skewX', () => {
        const matrix = new Matrix()

        // int
        layout = { x: 100, y: 100, scaleX: 1, scaleY: 3, rotation: 0, skewX: 60, skewY: 0 }
        matrix.setLayout(layout)

        m = matrix.get()
        expect(matrix.getLayout()).toEqual(layout)
        // expect(matrix.layout(layout).get()).toEqual(m)

        // float
        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 0, skewX: -40.5, skewY: 0 })
        expect(matrix.getLayout()).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 0, skewX: -40.5, skewY: 0 })


        // add rotation
        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 45, skewX: -40.5, skewY: 0 })
        expect(matrix.getLayout()).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 45, skewX: -40.5, skewY: 0 })
    })


    test('decompose skewY', () => {
        const matrix = new Matrix()

        // int
        matrix.setLayout({ x: 100, y: 100, scaleX: 1, scaleY: 3, rotation: 0, skewX: 0, skewY: 60 })
        expect(matrix.getLayout(null, null, true)).toEqual({ x: 100, y: 100, scaleX: 1, scaleY: 3, rotation: 0, skewX: 0, skewY: 60 })

        // float
        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 0, skewX: 0, skewY: -40.5 })
        expect(matrix.getLayout(null, null, true)).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 0, skewX: 0, skewY: -40.5 })

        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 0, skewX: 0, skewY: -140.5 })
        expect(matrix.getLayout(null, null, true)).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 0, skewX: 0, skewY: -140.5 })


        // with rotation
        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 45, skewX: 0, skewY: -40.5 })
        expect(matrix.getLayout(null, null, true)).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 45, skewX: 0, skewY: -40.5 })

        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: -45, skewX: 0, skewY: 140.5 })
        expect(matrix.getLayout(null, null, true)).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: -45, skewX: 0, skewY: 140.5 })


        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 45, skewX: 0, skewY: -140.5 })
        expect(matrix.getLayout(null, null, true)).toEqual({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: 45, skewX: 0, skewY: -140.5 })


        // with skewX
        matrix.setLayout({ x: 100, y: 100, scaleX: 1.2, scaleY: 3, rotation: -45, skewX: 70, skewY: 140.5 })
        expect(matrix.getLayout(null)).toEqual({ x: 100, y: 100, scaleX: 3.177899084326, scaleY: -2.261017160805, rotation: 22.814407127147, skewX: -105.465554529, skewY: 0 })
    })


    test('multiply / divide', () => {
        const child = { a: 2, b: 0, c: 0, d: 2, e: 100, f: 100 }
        const parent = { a: 3, b: 0, c: 0, d: 2, e: 50, f: 50 }
        const matrix = new Matrix(parent)
        matrix.multiply(child)
        matrix.divide(child)
        expect(matrix).toEqual(parent)
    })


    test('multiply / divide rotation', () => {
        const child = { a: 2, b: 0, c: 1, d: 2, e: 100, f: 100 }
        const parent = { a: 3, b: 1, c: 0, d: 2, e: 50, f: 50 }
        const matrix = new Matrix(parent)
        matrix.multiply(child)
        matrix.divide(child)
        expect(matrix).toEqual(parent)
    })


    test('multiplyParent / divideParent', () => {
        const child = { a: 2, b: 0, c: 0, d: 2, e: 100, f: 100 }
        const parent = { a: 3, b: 0, c: 0, d: 2, e: 50, f: 50 }
        const matrix = new Matrix(child)
        matrix.multiplyParent(parent)
        matrix.divideParent(parent)
        expect(matrix).toEqual(child)
    })


    test('multiplyParent / divideParent rotation', () => {
        const child = { a: 2, b: 0, c: 1, d: 2, e: 100, f: 100 }
        const parent = { a: 3, b: 1, c: 0, d: 2, e: 50, f: 50 }
        const matrix = new Matrix(child)
        matrix.multiplyParent(parent)
        matrix.divideParent(parent)
        expect(matrix).toEqual(child)
    })


})