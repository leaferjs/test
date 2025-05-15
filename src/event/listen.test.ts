import { describe, expect, test } from 'vitest'

import { IEventListenerId, IPointerEvent } from '@leafer/interface'
import { App, Group, PointerEvent, Rect } from 'leafer-test'


describe('listen event array', () => {


    const app = new App({ width: 100, height: 100 })
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

    const leafHitPoint = { x: 20, y: 20 } as IPointerEvent
    const leaf2HitPoint = { x: 60, y: 60 } as IPointerEvent
    const leaf3HitPoint = { x: 70, y: 70 } as IPointerEvent


    test('on()/on_()/once()', () => {
        let move: boolean, enter: boolean, leave: boolean, over: boolean, out: boolean

        leaf.once([
            [PointerEvent.MOVE, () => { move = true }],
            [PointerEvent.OVER, () => { over = true }],
            [PointerEvent.OUT, () => { out = true }],
            [PointerEvent.ENTER, () => { enter = true }],
            [PointerEvent.LEAVE, () => { leave = true }],
        ])

        let leaf2Move: boolean
        group.on(PointerEvent.MOVE, () => { leaf2Move = true })

        let leaf3Move: boolean
        group.on(PointerEvent.MOVE, () => { leaf3Move = true })

        let groupEnter = 0, groupLeave = 0, groupOver = 0, groupOut = 0
        group.on_([
            [PointerEvent.OVER, () => { groupOver++ }],
            [PointerEvent.OUT, () => { groupOut++ }],
            [PointerEvent.ENTER, () => { groupEnter++ }],
            [PointerEvent.LEAVE, () => { groupLeave++ }]
        ])

        let leaferEnter = 0, leaferLeave = 0, leaferOver = 0, leaferOut = 0
        leafer.on([
            [PointerEvent.OVER, () => { leaferOver++ }],
            [PointerEvent.OUT, () => { leaferOut++ }],
            [PointerEvent.ENTER, () => { leaferEnter++ }],
            [PointerEvent.LEAVE, () => { leaferLeave++ }]
        ])

        let leafer2Enter = 0, leafer2Leave = 0, leafer2Over = 0, leafer2Out = 0

        leafer2.on([
            [PointerEvent.OVER, () => { leafer2Over++ }],
            [PointerEvent.OUT, () => { leafer2Out++ }],
            [PointerEvent.ENTER, () => { leafer2Enter++ }],
            [PointerEvent.LEAVE, () => { leafer2Leave++ }]
        ])

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


    test('once()', () => {
        const leaf5 = new Rect()
        class TestOff {
            count = 0
            listen() {
                leaf5.once([
                    [PointerEvent.MOVE, this.onEvent, this],
                    [PointerEvent.OVER, this.onEvent, this],
                    [PointerEvent.OUT, this.onEvent, this],
                ])
            }
            onEvent() {
                this.count++
            }
        }

        const test = new TestOff()
        test.listen()

        leaf5.emit(PointerEvent.MOVE)
        leaf5.emit(PointerEvent.OVER)
        leaf5.emit(PointerEvent.OUT)

        expect(test.count).toBe(3)

        leaf5.emit(PointerEvent.MOVE)
        leaf5.emit(PointerEvent.OVER)
        leaf5.emit(PointerEvent.OUT)

        expect(test.count).toBe(3)

    })


    test('off_()', () => {
        const leaf5 = new Rect()
        class TestOff {
            id: IEventListenerId
            count = 0
            listen() {
                this.id = leaf5.on_([
                    [PointerEvent.MOVE, this.onEvent, this],
                    [PointerEvent.OVER, this.onEvent, this],
                    [PointerEvent.OUT, this.onEvent, this],
                ])
            }
            onEvent() {
                this.count++
            }
            off() {
                leaf5.off_(this.id)
            }
        }

        const test = new TestOff()
        test.listen()

        leaf5.emit(PointerEvent.MOVE)
        leaf5.emit(PointerEvent.OVER)
        leaf5.emit(PointerEvent.OUT)

        expect(test.count).toBe(3)

        test.off()

        leaf5.emit(PointerEvent.MOVE)
        leaf5.emit(PointerEvent.OVER)
        leaf5.emit(PointerEvent.OUT)

        expect(test.count).toBe(3)

        app.destroy()
    })


})