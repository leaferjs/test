import { describe, expect, test } from 'vitest'

import { Leafer, Rect, Group } from 'leafer-ui-node'


describe('matrix', () => {


    const leafer = new Leafer()
    leafer.x = leafer.y = 100
    const group = new Group({ x: 100, y: 100, rotation: 90, scaleX: 2, scaleY: 2 })
    const leaf = new Rect({ x: 200, y: 200, width: 100, height: 100 })
    leafer.add(group)
    group.add(leaf)


    test('create', () => {
        expect(leaf.worldTransform).toMatchObject({ a: 1.2246467991473532e-16, b: 2, c: -2, d: 1.2246467991473532e-16, e: -200, f: 600 })
        expect(group.worldTransform).toMatchObject({ a: 1.2246467991473532e-16, b: 2, c: -2, d: 1.2246467991473532e-16, e: 200, f: 200 })
        expect(leafer.worldTransform).toMatchObject({ a: 1, b: 0, c: 0, d: 1, e: 100, f: 100 })
    })


    test('change', () => {
        leafer.scaleX = leafer.scaleY = 2
        expect(group.worldTransform).toMatchObject({ a: 2.4492935982947064e-16, b: 4, c: -4, d: 2.4492935982947064e-16, e: 300, f: 300 })
        expect(leaf.worldTransform).toMatchObject({ a: 2.4492935982947064e-16, b: 4, c: -4, d: 2.4492935982947064e-16, e: -500, f: 1100 })
        expect(leafer.worldTransform).toMatchObject({ a: 2, b: 0, c: 0, d: 2, e: 100, f: 100 })
    })


    test('remove child', () => {
        leaf.remove()
        expect(leaf.worldTransform).toMatchObject({ a: 1, b: 0, c: 0, d: 1, e: 200, f: 200 })
        expect(group.worldTransform).toMatchObject({ a: 2.4492935982947064e-16, b: 4, c: -4, d: 2.4492935982947064e-16, e: 300, f: 300 })
        expect(leafer.worldTransform).toMatchObject({ a: 2, b: 0, c: 0, d: 2, e: 100, f: 100 })
    })


    test('add child', () => {
        group.add(leaf)
        expect(leaf.worldTransform).toMatchObject({ a: 2.4492935982947064e-16, b: 4, c: -4, d: 2.4492935982947064e-16, e: -500, f: 1100 })
        expect(group.worldTransform).toMatchObject({ a: 2.4492935982947064e-16, b: 4, c: -4, d: 2.4492935982947064e-16, e: 300, f: 300 })
        expect(leafer.worldTransform).toMatchObject({ a: 2, b: 0, c: 0, d: 2, e: 100, f: 100 })
    })


    test('worldToLocal', () => {
        let point = { x: 100, y: 100 }
        let to = { x: 0, y: 0 }

        leaf.worldToLocal(point, to)
        expect(to).toEqual({ x: -50, y: 50 })
        expect(point).toEqual({ x: 100, y: 100 })
        //expect(value).toEqual(to)

        let move = { x: 100, y: 100 }
        leaf.worldToLocal(move, to, true)
        expect(to).toEqual({ x: 25, y: -25 })
        expect(move).toEqual({ x: 100, y: 100 })

        leaf.worldToLocal(point)
        expect(point).toEqual({ x: -50, y: 50 })
    })


    test('localToWorld', () => {
        let point = { x: -50, y: 50 }
        let to = { x: 0, y: 0 }

        leaf.localToWorld(point, to)
        expect(to).toEqual({ x: 100, y: 100 })
        expect(point).toEqual({ x: -50, y: 50 })

        let move = { x: 25, y: -25 }
        leaf.localToWorld(move, to, true)
        expect(to).toEqual({ x: 100, y: 100 })
        expect(move).toEqual({ x: 25, y: -25 })

        leaf.localToWorld(point)
        expect(point).toEqual({ x: 100, y: 100 })
    })


    test('worldToInner', () => {
        let point = { x: 100, y: 100 }
        let to = { x: 0, y: 0 }

        leaf.worldToInner(point, to)
        expect(to).toEqual({ x: -250, y: -150 })
        expect(point).toEqual({ x: 100, y: 100 })

        let move = { x: 100, y: 100 }
        leaf.worldToInner(move, to, true)
        expect(to).toEqual({ x: 25, y: -25 })
        expect(move).toEqual({ x: 100, y: 100 })

        leaf.worldToInner(point)
        expect(point).toEqual({ x: -250, y: -150 })
    })


    test('innerToWorld', () => {
        let point = { x: -250, y: -150 }
        let to = { x: 0, y: 0 }

        leaf.innerToWorld(point, to)
        expect(to).toEqual({ x: 99.99999999999989, y: 100 })
        expect(point).toEqual({ x: -250, y: -150 })

        let move = { x: 25, y: -25 }
        leaf.innerToWorld(move, to, true)
        expect(to).toEqual({ x: 100, y: 100 })
        expect(move).toEqual({ x: 25, y: -25 })

        leaf.innerToWorld(point)
        expect(point).toEqual({ x: 99.99999999999989, y: 100 })
    })


    test('scaleOf / rotateOf', () => {
        const leaf = new Rect()
        leaf.scaleOf({ x: 50, y: 50 }, 1, 2)
        expect(leaf.x).toEqual(0)
        expect(leaf.y).toEqual(-50)
        expect(leaf.scaleX).toEqual(1)
        expect(leaf.scaleY).toEqual(2)

        expect(leaf.worldTransform).toMatchObject({ a: 1, b: 0, c: 0, d: 2, e: 0, f: -50, x: 0, y: -50, width: 100, height: 200 })

        leaf.rotateOf({ x: 50, y: 50 }, 45)
        expect(leaf.worldTransform).toMatchObject({
            a: 0.7071067811865476,
            b: 0.7071067811865475,
            c: -1.414213562373095,
            d: 1.4142135623730951,
            e: 85.35533905932736,
            f: -56.06601717798213,
            x: -56.06601717798212,
            y: -56.06601717798213,
            width: 212.13203435596427,
            height: 212.13203435596427
        })

        leafer.destroy()
    })


})