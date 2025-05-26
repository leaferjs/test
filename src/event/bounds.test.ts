import { describe, expect, test } from 'vitest'

import { App, Group, Rect, BoundsEvent, PointerEvent } from 'leafer-test'


describe('bounds event', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const leafer2 = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: '#333' })
    const leaf2 = new Rect({ x: 50, y: 50, width: 20, height: 20, fill: '#333' })
    const leaf3 = new Rect({ x: 70, y: 70, width: 10, height: 10, fill: '#333' })

    group.add(leaf)
    group.add(leaf2)
    leafer.add(group)
    leafer2.add(leaf3)


    test('none', () => {

        leaf.on(PointerEvent.DOWN, () => { })
        group.on(PointerEvent.DOWN, () => { })
        leafer.on(PointerEvent.DOWN, () => { })
        app.on(PointerEvent.DOWN, () => { })

        expect(leaf.__hasLocalEvent).toEqual(undefined)
        expect(leaf.__hasWorldEvent).toEqual(undefined)
        expect(leafer.__hasLocalEvent).toEqual(undefined)
        expect(leafer.__hasWorldEvent).toEqual(undefined)


        let count = 0
        function onResize() {
            count++
        }
        leaf.on(BoundsEvent.RESIZE, onResize)
        group.on(BoundsEvent.RESIZE, onResize)
        leafer.on(BoundsEvent.RESIZE, onResize)
        app.on(BoundsEvent.RESIZE, onResize)

        leaf.width = 200
        app.start()
        expect(count).toEqual(0) // 首次布局前不运行bounds事件

    })


    test('resize', () => {

        let count = 0
        function onResize() {
            count++
        }
        leaf.on(BoundsEvent.RESIZE, onResize)
        group.on(BoundsEvent.RESIZE, onResize)
        leafer.on(BoundsEvent.RESIZE, onResize)
        app.on(BoundsEvent.RESIZE, onResize)

        leaf.width = 200
        leafer.updateLayout()

        expect(count).toEqual(4)


        leaf.scale = 2
        leafer.updateLayout()

        expect(count).toEqual(8)


        leaf.x = 200
        leafer.updateLayout()

        expect(count).toEqual(11)


        leaf.off(BoundsEvent.RESIZE, onResize)
        group.off(BoundsEvent.RESIZE, onResize)
        leafer.off(BoundsEvent.RESIZE, onResize)
        app.off(BoundsEvent.RESIZE, onResize)

        leaf.width = 210
        leafer.updateLayout()

        expect(count).toEqual(11)
    })


    test('inner', () => {

        let count = 0
        function onResize() {
            count++
        }
        leaf.on(BoundsEvent.INNER, onResize)
        group.on(BoundsEvent.INNER, onResize)
        leafer.on(BoundsEvent.INNER, onResize)
        app.on(BoundsEvent.INNER, onResize)

        leaf.width = 190
        leafer.updateLayout()

        expect(count).toEqual(4)


        leaf.scale = 1.5
        leafer.updateLayout()

        expect(count).toEqual(7)


        leaf.x = 150
        leafer.updateLayout()

        expect(count).toEqual(10)

        leaf.off(BoundsEvent.INNER, onResize)
        group.off(BoundsEvent.INNER, onResize)
        leafer.off(BoundsEvent.INNER, onResize)
        app.off(BoundsEvent.INNER, onResize)

        leaf.width = 200
        leafer.updateLayout()

        expect(count).toEqual(10)
    })


    test('world', () => {

        let count = 0
        function onResize() {
            count++
        }
        leaf.on(BoundsEvent.WORLD, onResize)
        group.on(BoundsEvent.WORLD, onResize)
        leafer.on(BoundsEvent.WORLD, onResize)
        app.on(BoundsEvent.WORLD, onResize)


        leaf.width = 170
        leafer.updateLayout()

        expect(count).toEqual(4)


        leaf.scale = 1.7
        leafer.updateLayout()

        expect(count).toEqual(8)


        leaf.x = 110
        leafer.updateLayout()

        expect(count).toEqual(12)

        leafer.x = 110
        leafer.updateLayout()

        expect(count).toEqual(16)


        leafer.scale = 1.1
        leafer.updateLayout()

        expect(count).toEqual(20)

        leaf.off(BoundsEvent.WORLD, onResize)
        group.off(BoundsEvent.WORLD, onResize)
        leafer.off(BoundsEvent.WORLD, onResize)
        app.off(BoundsEvent.WORLD, onResize)

        leaf.width = 200
        leafer.updateLayout()

        expect(count).toEqual(20)
    })


    test('local', () => {

        let count = 0
        function onResize() {
            count++
        }
        leaf.on(BoundsEvent.LOCAL, onResize)
        group.on(BoundsEvent.LOCAL, onResize)
        leafer.on(BoundsEvent.LOCAL, onResize)
        app.on(BoundsEvent.LOCAL, onResize)

        leaf.width = 180
        leafer.updateLayout()

        expect(count).toEqual(4)


        leaf.scale = 1.8
        leafer.updateLayout()

        expect(count).toEqual(8)


        leaf.x = 120
        leafer.updateLayout()

        expect(count).toEqual(12)


        leafer.x = 120
        leafer.updateLayout()

        expect(count).toEqual(14)


        leafer.scale = 1.2
        leafer.updateLayout()

        expect(count).toEqual(16)

        leaf.off(BoundsEvent.LOCAL, onResize)
        group.off(BoundsEvent.LOCAL, onResize)
        leafer.off(BoundsEvent.LOCAL, onResize)
        app.off(BoundsEvent.LOCAL, onResize)

        leaf.width = 200
        leafer.updateLayout()

        expect(count).toEqual(16)
    })





})