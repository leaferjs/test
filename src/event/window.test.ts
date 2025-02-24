import { describe, expect, test } from 'vitest'

import { IMoveEvent, IRotateEvent, IZoomEvent } from '@leafer/interface'
import { App, Group, MoveEvent, Rect, RotateEvent, ZoomEvent } from 'leafer-test'


describe('window event', () => {


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

    app.start()


    test('zoom', () => {
        let count = 0
        leaf.on(ZoomEvent.ZOOM, () => { count++ })
        group.on(ZoomEvent.ZOOM, () => { count++ })
        leafer.on(ZoomEvent.ZOOM, () => { count++ })
        leafer2.on(ZoomEvent.ZOOM, () => { count++ })
        app.on(ZoomEvent.ZOOM, () => { count++ })

        app.interaction.zoom({ x: 20, y: 20, buttons: 1, scale: 2 } as IZoomEvent)

        expect(count).toEqual(5)
    })


    test('move', () => {
        let count = 0
        leaf.on(MoveEvent.MOVE, () => { count++ })
        group.on(MoveEvent.MOVE, () => { count++ })
        leafer.on(MoveEvent.MOVE, () => { count++ })
        leafer2.on(MoveEvent.MOVE, () => { count++ })
        app.on(MoveEvent.MOVE, () => { count++ })

        app.interaction.move({ x: 20, y: 20, buttons: 1, moveX: 2, moveY: 2 } as IMoveEvent)

        expect(count).toEqual(5)
    })


    test('rotate', () => {
        let count = 0
        leaf.on(RotateEvent.ROTATE, () => { count++ })
        group.on(RotateEvent.ROTATE, () => { count++ })
        leafer.on(RotateEvent.ROTATE, () => { count++ })
        leafer2.on(RotateEvent.ROTATE, () => { count++ })
        app.on(RotateEvent.ROTATE, () => { count++ })

        app.interaction.rotate({ x: 20, y: 20, buttons: 1, rotation: 30 } as IRotateEvent)

        expect(count).toEqual(5)
    })


})