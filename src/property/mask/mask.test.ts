import { describe, expect, test } from 'vitest'

import { IPointerEvent } from '@leafer/interface'
import { App, Ellipse, Group, Rect, PointerEvent } from 'leafer-test'


describe('mask', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const mask = new Ellipse({ width: 50, height: 50, mask: true, fill: '#333' })
    const leaf = new Rect({ x: 10, y: 10, width: 50, height: 50, fill: '#333' })

    group.add(mask)
    group.add(leaf)
    leafer.add(group)

    app.start()


    test('bounds', () => {

        expect(mask.__.mask).toBeTruthy()
        expect(group.__hasMask).toBeTruthy()
        expect(group.__onlyHitMask).toBeFalsy()
        expect(group.__ignoreHitWorld).toBeTruthy()

        expect(group.worldBoxBounds).toMatchObject({ x: 0, y: 0, width: 50, height: 50 })
    })


    test('hit', () => {

        let hit = false
        group.on(PointerEvent.DOWN, () => {
            hit = true
        })

        leafer.interaction.pointerDown({ x: 5, y: 5 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        leafer.interaction.pointerDown({ x: 55, y: 55 } as IPointerEvent)
        expect(hit).toBeFalsy()
        hit = false

        group.hitChildren = false
        expect(group.__onlyHitMask).toBeTruthy()
        expect(group.__ignoreHitWorld).toBeFalsy()
        leafer.interaction.pointerDown({ x: 55, y: 55 } as IPointerEvent)
        expect(hit).toBeFalsy()
        group.hitChildren = true

    })


    test('multiple', () => {

        const rect = new Rect({ x: -10, y: -10, width: 50, height: 50 })
        group.add(rect)

        expect(group.worldBoxBounds).toMatchObject({ x: 0, y: 0, width: 50, height: 50 })

        rect.mask = true
        expect(group.worldBoxBounds).toMatchObject({ x: -10, y: -10, width: 60, height: 60 })

    })


})