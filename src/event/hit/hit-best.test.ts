import { describe, expect, test } from 'vitest'

import { ILeaf, IPointerEvent } from '@leafer/interface'
import { App, Group, PointerEvent, Rect } from 'leafer-test'


describe('hit', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })
    const leaf2 = new Rect({ x: 30, y: 30, width: 20, height: 20, fill: 'gray' })
    const leaf3 = new Rect({ x: 32, y: 32, width: 10, height: 10, fill: 'gray' })

    group.add(leaf)
    group.add(leaf2)
    group.add(leaf3)
    leafer.add(group)

    app.start()

    const leafHitPoint = { x: 29, y: 29, buttons: 1 } as IPointerEvent
    const leaf2HitPoint = { x: 30, y: 30, buttons: 1 } as IPointerEvent


    test('hittable', () => {
        let target: ILeaf
        group.on(PointerEvent.DOWN, (e: PointerEvent) => {
            target = e.target
        })

        app.interaction.pointerDown(leafHitPoint)
        expect(target).toBe(leaf)

        app.interaction.pointerDown(leaf2HitPoint)
        expect(target).toBe(leaf2)
    })


    test('through hittable', () => {
        leaf2.hittable = false

        let down: boolean
        leaf.on(PointerEvent.DOWN, () => {
            down = true
        })

        app.interaction.pointerDown(leaf2HitPoint)
        expect(down).toBeTruthy()

        down = false
        const leafer2 = app.addLeafer({ hittable: false })
        leafer2.add(new Rect({ x: 30, y: 30, width: 20, height: 20, fill: 'gray' }))

        app.interaction.pointerDown(leaf2HitPoint)
        expect(down).toBeTruthy()

        leaf2.hittable = true
    })


    test('hitChildren', () => {
        const g = new Group({ hitChildren: false })
        g.add(new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' }))
        g.add(new Rect({ x: 30, y: 30, width: 20, height: 20, fill: 'gray' }))
        leafer.add(g)

        let target: ILeaf
        g.on(PointerEvent.DOWN, (e: PointerEvent) => {
            target = e.target
        })

        app.interaction.pointerDown(leafHitPoint)
        expect(target).toBe(g)

        app.interaction.pointerDown(leaf2HitPoint)
        expect(target).toBe(g)
    })


    test('hitSelf', () => {
        const g = new Group({ hitSelf: false })
        g.add(new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' }))
        const rect = new Rect({ x: 30, y: 30, width: 20, height: 20, fill: 'gray' })
        g.add(rect)
        leafer.add(g)

        let target: ILeaf
        g.on(PointerEvent.DOWN, (e: PointerEvent) => {
            target = e.target
        })

        rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
            target = e.target
        })

        app.interaction.pointerDown(leafHitPoint)
        expect(target).toBe(undefined)

        app.interaction.pointerDown(leaf2HitPoint)
        expect(target).toBe(rect)
    })


    test('destroyed, continue to bubble', () => {
        const g = new Group()
        const rect = new Rect({ x: 30, y: 30, width: 20, height: 20, fill: 'gray' })
        g.add(rect)
        leafer.add(g)

        let up: boolean
        g.on(PointerEvent.DOWN, () => {
            rect.destroy()
        })

        g.on(PointerEvent.UP, () => {
            up = true
        })

        app.interaction.pointerDown(leaf2HitPoint)
        app.interaction.pointerUp({ ...leaf2HitPoint })
        expect(up).toBe(true)
    })


})