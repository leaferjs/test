import { describe, expect, test } from 'vitest'

import { IPointerEvent } from '@leafer/interface'
import { App, Group, PointerEvent, Rect } from 'leafer-test'


describe('pointer event', () => {


    const app = new App({ width: 100, height: 100 })
    const leafer = app.addLeafer()
    const leafer2 = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })
    const leaf2 = new Rect({ x: 50, y: 50, width: 20, height: 20, fill: 'gray' })
    const leaf3 = new Rect({ x: 70, y: 70, width: 10, height: 10, fill: 'gray' })

    group.add(leaf)
    group.add(leaf2)
    leafer.add(group)
    leafer2.add(leaf3)

    app.start()

    const leafHitPoint = { x: 20, y: 20 } as IPointerEvent
    const leaf2HitPoint = { x: 60, y: 60 } as IPointerEvent
    const leaf3HitPoint = { x: 70, y: 70 } as IPointerEvent


    test('pointer.move', () => {
        let move: boolean, enter: boolean, leave: boolean, over: boolean, out: boolean

        leaf.on(PointerEvent.MOVE, () => { move = true })
        leaf.on(PointerEvent.OVER, () => { over = true })
        leaf.on(PointerEvent.OUT, () => { out = true })
        leaf.on(PointerEvent.ENTER, () => { enter = true })
        leaf.on(PointerEvent.LEAVE, () => { leave = true })

        let leaf2Move: boolean
        group.on(PointerEvent.MOVE, () => { leaf2Move = true })

        let leaf3Move: boolean
        group.on(PointerEvent.MOVE, () => { leaf3Move = true })

        let groupEnter = 0, groupLeave = 0, groupOver = 0, groupOut = 0
        group.on(PointerEvent.OVER, () => { groupOver++ })
        group.on(PointerEvent.OUT, () => { groupOut++ })
        group.on(PointerEvent.ENTER, () => { groupEnter++ })
        group.on(PointerEvent.LEAVE, () => { groupLeave++ })

        let leaferEnter = 0, leaferLeave = 0, leaferOver = 0, leaferOut = 0
        leafer.on(PointerEvent.OVER, () => { leaferOver++ })
        leafer.on(PointerEvent.OUT, () => { leaferOut++ })
        leafer.on(PointerEvent.ENTER, () => { leaferEnter++ })
        leafer.on(PointerEvent.LEAVE, () => { leaferLeave++ })

        let leafer2Enter = 0, leafer2Leave = 0, leafer2Over = 0, leafer2Out = 0
        leafer2.on(PointerEvent.OVER, () => { leafer2Over++ })
        leafer2.on(PointerEvent.OUT, () => { leafer2Out++ })
        leafer2.on(PointerEvent.ENTER, () => { leafer2Enter++ })
        leafer2.on(PointerEvent.LEAVE, () => { leafer2Leave++ })


        app.interaction.pointerMove(leafHitPoint)
        expect(move).toBeTruthy()
        expect(enter).toBeTruthy()
        expect(over).toBeTruthy()
        expect(groupEnter).toBe(1)
        expect(groupOver).toBe(1)

        app.interaction.pointerMove(leaf2HitPoint)
        expect(leave).toBeTruthy()
        expect(out).toBeTruthy()
        expect(leaf2Move).toBeTruthy()

        expect(groupOut).toBe(1)
        expect(groupOver).toBe(2)
        expect(groupEnter).toBe(1)
        expect(groupLeave).toBe(0)

        expect(leaferOut).toBe(1)
        expect(leaferOver).toBe(2)
        expect(leaferEnter).toBe(1)
        expect(leaferLeave).toBe(0)

        expect(leafer2Out).toBe(0)
        expect(leafer2Over).toBe(0)
        expect(leafer2Enter).toBe(0)
        expect(leafer2Leave).toBe(0)

        app.interaction.pointerMove(leaf3HitPoint)
        expect(leaf3Move).toBeTruthy()
        expect(groupLeave).toBe(1)
    })


    test('pointer.down', () => {
        let count = 0
        leaf.on(PointerEvent.DOWN, () => { count++ })
        group.on(PointerEvent.DOWN, () => { count++ })
        leafer.on(PointerEvent.DOWN, () => { count++ })
        leafer2.on(PointerEvent.DOWN, () => { count++ })
        app.on(PointerEvent.DOWN, () => { count++ })

        app.interaction.pointerDown(leafHitPoint)

        expect(count).toEqual(4)
    })


    test('pointer.up', () => {
        let up: boolean, click: boolean, dobuleClick: boolean, tap: boolean, dobuleTap: boolean
        leaf.on(PointerEvent.UP, () => { up = true })
        leaf.on(PointerEvent.CLICK, () => { click = true })
        leaf.on(PointerEvent.TAP, () => { tap = true })

        app.interaction.pointerUp(leafHitPoint)
        expect(up).toBeTruthy()
        expect(tap).toBeTruthy()
        expect(click).toBeTruthy()

        leaf.on(PointerEvent.DOUBLE_CLICK, () => { dobuleClick = true })
        leaf.on(PointerEvent.DOUBLE_TAP, () => { dobuleTap = true })

        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerUp(leafHitPoint)
        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerUp(leafHitPoint)

        expect(dobuleClick).toBeTruthy()
        expect(dobuleTap).toBeTruthy()
    })


    test('pointer.tapMode', () => {
        let tap: boolean, dobuleTap: boolean
        leaf.on(PointerEvent.TAP, () => { tap = true })
        leaf.on(PointerEvent.DOUBLE_TAP, () => { dobuleTap = true })

        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerUp(leafHitPoint)
        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerUp(leafHitPoint)

        expect(tap).toBeFalsy()
        expect(dobuleTap).toBeTruthy()
        dobuleTap = false

        app.config.pointer.tapMore = true

        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerUp(leafHitPoint)
        app.interaction.pointerDown(leafHitPoint)
        app.interaction.pointerUp(leafHitPoint)

        expect(tap).toBeTruthy()
        expect(dobuleTap).toBeTruthy()

        app.config.pointer.tapMore = false
    })


    test('pointer.long_press', async () => {
        let longTap: boolean, longPress: boolean
        leaf.on(PointerEvent.LONG_PRESS, () => { longPress = true })
        leaf.on(PointerEvent.LONG_TAP, () => { longTap = true })

        let tap: boolean, dobuleTap: boolean
        leaf.on(PointerEvent.TAP, () => { tap = true })
        leaf.on(PointerEvent.DOUBLE_TAP, () => { dobuleTap = true })

        app.config.pointer.longPressTime = 0
        app.interaction.pointerDown(leafHitPoint)

        return new Promise(function (resolve) {
            setTimeout(() => {
                app.interaction.pointerUp(leafHitPoint)
                expect(longTap).toBeTruthy()
                expect(longPress).toBeTruthy()

                expect(tap).toBeFalsy()
                expect(dobuleTap).toBeFalsy()
                app.config.pointer.longPressTime = 800

                app.destroy()
                resolve(true)
            }, 1)
        })
    })


})