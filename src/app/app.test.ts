import { describe, expect, test } from 'vitest'

import { IBounds } from '@leafer/interface'
import { App, ChildEvent, Debug, LeaferEvent, MoveEvent, PropertyEvent, Rect, RenderEvent } from 'leafer-test'


describe('App', () => {


    test('ready', async () => {
        const app = new App({ type: 'design', width: 100, height: 100 })
        const leafer = app.addLeafer()
        const leafer2 = app.addLeafer()
        leafer.add(new Rect())
        leafer2.add(new Rect())

        app.start()

        expect(leafer.ready).toBe(true)
        expect(leafer.viewReady).toBe(true)

        expect(leafer2.ready).toBe(true)
        expect(leafer2.viewReady).toBe(true)

        expect(app.ready).toBe(true)
        expect(app.viewReady).toBe(true)

        return new Promise(function (resolve) {
            setTimeout(() => {
                expect(leafer.viewCompleted).toBe(true)
                expect(leafer2.viewCompleted).toBe(true)
                expect(app.viewCompleted).toBe(true)

                app.destroy()
                resolve(true)
            }, 40)
        })
    })


    test('propety', () => {
        const app = new App({ width: 100, height: 100 })
        expect(app.isApp).toBe(true)
        expect(app.view).toBeTruthy()
        expect(app.canvas).toBeTruthy()
        expect(app.renderer).toBeTruthy()
        expect(app.watcher).toBeTruthy()
        expect(app.layouter).toBeTruthy()
        expect(app.selector).toBeTruthy()
        expect(app.canvasManager).toBeTruthy()
        expect(app.hitCanvasManager).toBeTruthy()
        app.destroy()
    })


    test('life cycle', async () => {
        const app = new App({ width: 100, height: 100 })
        const leafer = app.addLeafer()

        const events: string[] = []

        app.on(LeaferEvent.START, (e: LeaferEvent) => { events.push(e.type) })
        app.on(LeaferEvent.BEFORE_READY, (e: LeaferEvent) => { events.push(e.type) })
        app.on(LeaferEvent.READY, (e: LeaferEvent) => { events.push(e.type) })
        app.on(LeaferEvent.AFTER_READY, (e: LeaferEvent) => { events.push(e.type) })
        app.on(LeaferEvent.VIEW_READY, (e: LeaferEvent) => { events.push(e.type) })

        let change: boolean
        app.on([ChildEvent.ADD, ChildEvent.REMOVE, PropertyEvent.CHANGE], () => { change = true })

        const leaf = new Rect()
        leafer.add(leaf)
        leaf.x = 100

        expect(change).toBe(undefined)

        app.start()
        leaf.x = 200

        expect(events.length).toBe(5)
        expect(change).toBe(undefined)
        expect(app.running).toBe(true)
        expect(leafer.running).toBe(true)

        app.on(LeaferEvent.STOP, (e: LeaferEvent) => { events.push(e.type) })
        app.on(LeaferEvent.RESTART, (e: LeaferEvent) => { events.push(e.type) })
        app.on(LeaferEvent.END, (e: LeaferEvent) => { events.push(e.type) })

        app.stop()

        leaf.y = 200
        leafer.renderer.render()
        expect(leafer.watcher.changed).toBe(true)
        expect(app.running).toBe(false)
        expect(leafer.running).toBe(false)
        expect(events.length).toBe(6)

        app.start()

        expect(events.length).toBe(7)
        expect(app.running).toBe(true)
        expect(leafer.running).toBe(true)

        app.destroy()

        return new Promise(function (resolve) {
            setTimeout(() => {
                expect(events.length).toBe(9)
                resolve(true)
            }, 10)
        })
    })


    test('child life cycle', () => {
        const app = new App({ width: 100, height: 100 })
        const leafer = app.addLeafer()

        const events: string[] = []

        leafer.on(LeaferEvent.START, (e: LeaferEvent) => { events.push(e.type) })
        leafer.on(LeaferEvent.BEFORE_READY, (e: LeaferEvent) => { events.push(e.type) })
        leafer.on(LeaferEvent.READY, (e: LeaferEvent) => { events.push(e.type) })
        leafer.on(LeaferEvent.AFTER_READY, (e: LeaferEvent) => { events.push(e.type) })
        leafer.on(LeaferEvent.VIEW_READY, (e: LeaferEvent) => { events.push(e.type) })

        let change: boolean
        leafer.on([ChildEvent.ADD, ChildEvent.REMOVE, PropertyEvent.CHANGE], () => { change = true })

        const leaf = new Rect()
        leafer.add(leaf)
        leaf.x = 100

        expect(change).toBe(undefined)

        app.start()
        leaf.x = 200

        expect(events.length).toBe(5)
        expect(change).toBe(true)
        expect(app.running).toBe(true)
        expect(leafer.running).toBe(true)

        leafer.on(LeaferEvent.STOP, (e: LeaferEvent) => { events.push(e.type) })
        leafer.on(LeaferEvent.RESTART, (e: LeaferEvent) => { events.push(e.type) })
        leafer.on(LeaferEvent.END, (e: LeaferEvent) => { events.push(e.type) })

        app.stop()

        leaf.y = 200
        leafer.renderer.render()
        expect(leafer.watcher.changed).toBe(true)
        expect(app.running).toBe(false)
        expect(leafer.running).toBe(false)
        expect(events.length).toBe(6)

        app.start()

        expect(events.length).toBe(7)
        expect(app.running).toBe(true)
        expect(leafer.running).toBe(true)

        app.destroy()

        return new Promise(function (resolve) {
            setTimeout(() => {
                expect(events.length).toBe(9)
                resolve(true)
            }, 100)
        })
    })


    test('resize', () => {
        const app = new App({ width: 100, height: 100, pixelRatio: 2 })
        const leafer = app.addLeafer()

        expect(app.width).toBe(100)
        expect(app.height).toBe(100)
        expect(app.pixelRatio).toBe(2)

        app.resize({ width: 200, height: 200, pixelRatio: 2 })
        expect(leafer.width).toBe(200)
        expect(leafer.height).toBe(200)
        expect(leafer.pixelRatio).toBe(2)
        expect(leafer.canvas.bounds).toEqual({ x: 0, y: 0, width: 200, height: 200 })

        app.width = 500
        app.height = 500
        app.pixelRatio = 3

        expect(app.width).toBe(500)
        expect(app.pixelRatio).toBe(3)
        expect(app.canvas.width).toBe(500)
        expect(app.canvas.pixelRatio).toBe(3)
        expect(app.canvas.bounds).toEqual({ x: 0, y: 0, width: 500, height: 500 })

        expect(leafer.width).toBe(500)
        expect(leafer.pixelRatio).toBe(3)
        expect(leafer.canvas.width).toBe(500)
        expect(leafer.canvas.pixelRatio).toBe(3)
        expect(leafer.canvas.bounds).toEqual({ x: 0, y: 0, width: 500, height: 500 })

        app.destroy()
    })

    test('width = 0 or height = 0', () => {
        const app = new App({ type: 'draw', width: 50, height: 500 })
        const leafer = app.addLeafer()
        leafer.width = 0
        leafer.height = 0
        expect(leafer.width).toBe(1)
        expect(leafer.height).toBe(1)
        expect(leafer.pixelRatio).toBe(1)
        app.destroy()
    })

    test('draw type', () => {
        const app = new App({ type: 'draw', width: 100, height: 100 })
        const leafer = app.addLeafer()
        expect(leafer.hasEvent(MoveEvent.BEFORE_MOVE)).toBe(false)
        expect(leafer.config.move.dragOut).toBeFalsy()
        app.destroy()
    })


    test('design type', () => {
        const app = new App({ type: 'design', width: 100, height: 100 })
        const leafer = app.addLeafer()
        expect(leafer.hasEvent(MoveEvent.BEFORE_MOVE)).toBe(true)
        app.destroy()
    })


    test('hit', () => {
        const app = new App({ type: 'design', width: 100, height: 100 })
        const leafer = app.addLeafer()
        leafer.add(new Rect())

        app.start()
        app.hittable = false

        expect(leafer.watcher.changed).toBe(false)

        Debug.showBounds = 'hit'
        app.hittable = true

        expect(leafer.watcher.changed).toBe(true)

        app.destroy()
    })


    test('fill', () => {
        const app = new App({ type: 'design', width: 100, height: 100 })
        const leafer = app.addLeafer()
        leafer.add(new Rect())

        app.start()

        let bounds: IBounds
        app.on(RenderEvent.END, (e: RenderEvent) => { bounds = e.renderBounds })

        leafer.fill = 'black'
        leafer.renderer.render()
        app.renderer.render()

        expect(bounds).toEqual({ x: 0, y: 0, width: 100, height: 100 })

        app.destroy()
    })

    test('destroy', async () => {
        const app = new App({ width: 100, height: 100, tree: {} })

        const leaf = new Rect()
        app.tree.add(leaf)
        app.start()

        return new Promise(function (resolve) {
            setTimeout(() => {
                app.destroy(true)
                app.renderer.update()
                expect(app.destroyed).toBe(true)
                resolve(true)
            }, 1000)
        })
    })


})