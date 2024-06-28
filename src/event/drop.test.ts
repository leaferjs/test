import { describe, expect, test } from 'vitest'

import { IPointerEvent } from '@leafer/interface'
import { App, DropEvent, DragEvent, Group, Rect } from 'leafer-ui-node'


describe('drop event', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })
    const leaf2 = new Rect({ x: 50, y: 50, width: 20, height: 20, fill: 'gray' })
    const leaf3 = new Rect({ x: 70, y: 70, width: 10, height: 10, draggable: true, fill: 'gray' })

    group.add(leaf)
    group.add(leaf2)
    leafer.add(group)
    leafer.add(leaf3)

    app.start()

    const leafHitPoint = { x: 20, y: 20, buttons: 1 } as IPointerEvent
    const leaf2HitPoint = { x: 60, y: 60, buttons: 1 } as IPointerEvent
    const leaf3HitPoint = { x: 70, y: 70, buttons: 1 } as IPointerEvent


    test('swipe', () => {
        let count = 0
        leaf.on(DragEvent.OVER, () => { count++ })
        leaf.on(DragEvent.OUT, () => { count++ })

        leaf.on(DragEvent.ENTER, () => { count++ })
        leaf.on(DragEvent.LEAVE, () => { count++ })
        leaf.on(DropEvent.DROP, () => { count++ })

        let groupCount = 0
        group.on(DragEvent.OVER, () => { groupCount++ })
        group.on(DragEvent.OUT, () => { groupCount++ })

        app.interaction.pointerDown(leaf3HitPoint)
        app.interaction.pointerMove(leaf2HitPoint)
        app.interaction.pointerMove(leafHitPoint)
        app.interaction.pointerUp(leafHitPoint)

        expect(count).toBe(4)
        expect(groupCount).toBe(3)

        app.destroy()
    })


})