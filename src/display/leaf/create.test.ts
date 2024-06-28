import { describe, expect, test } from 'vitest'

import { Rect } from 'leafer-test'


describe('create Leaf', () => {


    test('box bounds', () => {
        const leaf = new Rect({ width: 100, height: 100 })
        expect(leaf.worldBoxBounds).toEqual({ x: 0, y: 0, width: 100, height: 100 })
    })


    test('stroke bounds', () => {
        const leaf = new Rect({ width: 100, height: 100, stroke: 'black', strokeAlign: 'outside', strokeWidth: 2 })
        expect(leaf.worldStrokeBounds).toEqual({ x: -2, y: -2, width: 104, height: 104 })
    })


    test('render bounds', () => {
        const leaf = new Rect({ width: 100, height: 100, shadow: { x: 5, y: 5, blur: 10, color: 'black' } })
        expect(leaf.worldRenderBounds).toMatchObject({ x: -20, y: -20, width: 140, height: 140 })
    })


    test('matrix', () => {
        const leaf = new Rect({ x: 100, y: 100, width: 100, height: 100, scaleX: 2, scaleY: 3 })
        expect(leaf.worldTransform).toMatchObject({ a: 2, b: 0, c: 0, d: 3, e: 100, f: 100 })
    })


    test('world opacity', () => {
        const leaf = new Rect({ width: 100, height: 100 })
        expect(leaf.worldBoxBounds).toEqual({ x: 0, y: 0, width: 100, height: 100 })
        leaf.opacity = 0.5
        expect(leaf.worldOpacity).toEqual(0.5)
    })


})