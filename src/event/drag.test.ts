import { describe, expect, test } from 'vitest'

import { IPointerEvent } from '@leafer/interface'
import { App, DragEvent, Group, Rect } from 'leafer-test'


describe('drag event', () => {


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

    const leafHitPoint = { x: 20, y: 20, buttons: 1 } as IPointerEvent
    const leaf2HitPoint = { x: 60, y: 60, buttons: 1 } as IPointerEvent
    const leaf3HitPoint = { x: 70, y: 70, buttons: 1 } as IPointerEvent


    test('drag', () => {
        let count = 0
        leaf.on(DragEvent.START, () => { count++ })
        leaf.on(DragEvent.DRAG, () => { count++ })
        leaf.on(DragEvent.END, () => { count++ })

        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerMove(leaf2HitPoint)
        app.interaction.pointerMove(leaf3HitPoint)
        app.interaction.pointerUp(leafHitPoint)

        expect(count).toBe(4)

        app.destroy()
    })


})