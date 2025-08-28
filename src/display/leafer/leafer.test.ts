import { describe, expect, test } from 'vitest'

import { ChildEvent, Leafer, LeaferEvent, MoveEvent, PropertyEvent, Rect } from 'leafer-test'


describe('Leafer', () => {


    test('propety', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        expect(leafer.isApp).toBe(false)
        expect(leafer.view).toBeTruthy()
        expect(leafer.canvas).toBeTruthy()
        expect(leafer.renderer).toBeTruthy()
        expect(leafer.watcher).toBeTruthy()
        expect(leafer.layouter).toBeTruthy()
        expect(leafer.selector).toBeTruthy()
        expect(leafer.canvasManager).toBeTruthy()
        expect(leafer.hitCanvasManager).toBeTruthy()
        leafer.destroy()
    })


    test('life cycle', () => {
        const leafer = new Leafer({ width: 100, height: 100 })

        let count = 0

        leafer.on(LeaferEvent.START, () => { count++ })
        leafer.on(LeaferEvent.BEFORE_READY, () => { count++ })
        leafer.on(LeaferEvent.READY, () => { count++ })
        leafer.on(LeaferEvent.AFTER_READY, () => { count++ })
        leafer.on(LeaferEvent.VIEW_READY, () => { count++ })

        let change: boolean
        leafer.on([ChildEvent.ADD, ChildEvent.REMOVE, PropertyEvent.CHANGE], () => { change = true })

        const leaf = new Rect()
        leafer.add(leaf)
        leaf.x = 100

        expect(change).toBe(undefined)

        leafer.start()
        leaf.x = 200

        expect(count).toBe(5)
        expect(change).toBe(true)
        expect(leafer.running).toBe(true)


        leafer.renderer.render()
        expect(leafer.watcher.changed).toBe(false)

        leafer.on(LeaferEvent.STOP, () => { count++ })
        leafer.on(LeaferEvent.RESTART, () => { count++ })
        leafer.on(LeaferEvent.END, () => { count++ })

        leafer.stop()

        leaf.y = 200
        leafer.renderer.render()
        expect(leafer.watcher.changed).toBe(true)
        expect(leafer.running).toBe(false)

        expect(count).toBe(6)

        leafer.start()

        expect(count).toBe(7)
        expect(leafer.running).toBe(true)

        leafer.destroy()

        return new Promise(function (resolve) {
            setTimeout(() => {
                expect(count).toBe(9)
                resolve(true)
            }, 10)
        })
    })


    test('resize', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.resize({ width: 200, height: 200, pixelRatio: 2 })
        expect(leafer.width).toBe(200)
        expect(leafer.height).toBe(200)
        expect(leafer.pixelRatio).toBe(2)
        expect(leafer.canvas.bounds).toEqual({ x: 0, y: 0, width: 200, height: 200 })

        leafer.width = 500
        leafer.height = 500
        expect(leafer.canvas.width).toBe(500)
        expect(leafer.canvas.bounds).toEqual({ x: 0, y: 0, width: 500, height: 500 })

        leafer.destroy()
    })


    test('draw type', () => {
        const leafer = new Leafer({ type: 'draw', width: 100, height: 100 })
        expect(leafer.hasEvent(MoveEvent.BEFORE_MOVE)).toBe(false)
        expect(leafer.config.move.dragOut).toBeFalsy()
        leafer.destroy()
    })


    test('design type', () => {
        const leafer = new Leafer({ type: 'design', width: 100, height: 100 })
        expect(leafer.hasEvent(MoveEvent.BEFORE_MOVE)).toBe(true)
        leafer.destroy()
    })


    test('zoom', () => {
        const leafer = new Leafer({ type: 'design', width: 100, height: 100 })
        const rect = new Rect({ x: 100, y: 100 })
        leafer.add(rect)
        leafer.scaleOfWorld({ x: 50, y: 10 }, 2)
        expect(leafer.x).toBe(-50)
        expect(leafer.y).toBe(-10)
        leafer.scaleOfWorld({ x: 50, y: 10 }, 2)
        expect(leafer.x).toBe(-150)
        expect(leafer.y).toBe(-30)
        leafer.destroy()
    })


})