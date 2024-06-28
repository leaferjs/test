import { describe, expect, test } from 'vitest'

import { IPointerEvent } from '@leafer/interface'
import { App, Group, Rect, SwipeEvent } from 'leafer-test'


describe('swiper event', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const leafer2 = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, draggable: true, fill: 'gray' })
    const leaf2 = new Rect({ x: 50, y: 50, width: 20, height: 20, fill: 'gray' })
    const leaf3 = new Rect({ x: 70, y: 70, width: 10, height: 10, fill: 'gray' })

    group.add(leaf)
    group.add(leaf2)
    leafer.add(group)
    leafer2.add(leaf3)

    app.start()

    const leafHitPoint = { x: 20, y: 20, buttons: 1 } as IPointerEvent


    test('swipe', () => {
        let upTo: boolean, downTo: boolean, leftTo: boolean, rightTo: boolean
        leaf.on(SwipeEvent.UP, () => { upTo = true })
        leaf.on(SwipeEvent.DOWN, () => { downTo = true })
        leaf.on(SwipeEvent.LEFT, () => { leftTo = true })
        leaf.on(SwipeEvent.RIGHT, () => { rightTo = true })

        const up = {} as IPointerEvent, down = {} as IPointerEvent, left = {} as IPointerEvent, right = {} as IPointerEvent
        Object.assign(up, leafHitPoint)

        let { swipeDistance } = app.config.pointer
        swipeDistance++

        up.y -= swipeDistance
        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerMove(up)
        app.interaction.pointerUp(up)

        expect(upTo).toBe(true)

        Object.assign(down, up)
        down.y += swipeDistance
        app.interaction.pointerDown(up)
        app.interaction.pointerMove(down)
        app.interaction.pointerUp(down)

        expect(downTo).toBe(true)

        Object.assign(left, down)
        left.x -= swipeDistance
        app.interaction.pointerDown(down)
        app.interaction.pointerMove(left)
        app.interaction.pointerUp(left)

        expect(leftTo).toBe(true)

        Object.assign(right, left)
        right.x += swipeDistance
        app.interaction.pointerDown(left)
        app.interaction.pointerMove(right)
        app.interaction.pointerUp(right)

        expect(rightTo).toBe(true)

        app.destroy()
    })


})