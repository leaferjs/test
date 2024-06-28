import { describe, expect, test } from 'vitest'

import { ILeaf, IPointerEvent } from '@leafer/interface'
import { App, Canvas, Group, PointerEvent, Rect } from 'leafer-test'


describe('hit', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const leafer2 = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })
    const leaf2 = new Rect({ x: 50, y: 50, width: 10, height: 10, fill: 'gray' })

    group.add(leaf)
    leafer.add(group)
    leafer2.add(leaf2)

    app.start()

    const leafHitPoint = { x: 20, y: 20 } as IPointerEvent
    const leaf2HitPoint = { x: 50, y: 50 } as IPointerEvent


    test('hittable', () => {
        let path: ILeaf[]
        leaf.on(PointerEvent.DOWN, (e: PointerEvent) => {
            path = e.path.list
        })

        app.interaction.pointerDown(leafHitPoint)

        expect(path.map(item => item.innerId)).toEqual([leaf, group, leafer, app].map(item => item.innerId))
        path = null

        let path2: ILeaf[]
        leaf2.on(PointerEvent.DOWN, (e: PointerEvent) => {
            path2 = e.path.list
        })

        app.interaction.pointerDown(leaf2HitPoint)

        expect(path).toBeNull()
        expect(path2.map(item => item.innerId)).toEqual([leaf2, leafer2, app].map(item => item.innerId))
        path2 = null

        // set false

        leaf.hittable = false

        let groupPath: ILeaf[]
        group.on(PointerEvent.DOWN, (e: PointerEvent) => {
            groupPath = e.path.list
        })

        app.interaction.pointerDown(leafHitPoint)
        expect(path).toBeNull()
        expect(groupPath).toBe(undefined)

        leaf.hittable = true
        group.hittable = false

        app.interaction.pointerDown(leafHitPoint)
        expect(path).toBeNull()

        group.hittable = true
        leafer.hittable = false

        app.interaction.pointerDown(leafHitPoint)
        expect(path).toBeNull()

        leafer.hittable = true
        app.hittable = false

        app.interaction.pointerDown(leafHitPoint)
        expect(path).toBeNull()

        app.hittable = true

        app.interaction.pointerDown(leafHitPoint)
        expect(path).toBeTruthy()
    })


    test('hitChildren', () => {
        let path: ILeaf[] = null
        leaf.on(PointerEvent.DOWN, (e: PointerEvent) => {
            path = e.path.list
        })

        let groupPath: ILeaf[]
        group.on(PointerEvent.DOWN, (e: PointerEvent) => {
            groupPath = e.path.list
        })

        group.hitChildren = false

        app.interaction.pointerDown(leafHitPoint)
        expect(path).toBeNull()
        expect(groupPath.map(item => item.innerId)).toEqual([group, leafer, app].map(item => item.innerId))
        groupPath = null

        group.hitChildren = true
        leafer.hitChildren = false

        let leaferPath: ILeaf[]
        leafer.on(PointerEvent.DOWN, (e: PointerEvent) => {
            leaferPath = e.path.list
        })

        app.interaction.pointerDown(leafHitPoint)
        expect(groupPath).toBeNull()
        expect(leaferPath.map(item => item.innerId)).toEqual([leafer, app].map(item => item.innerId))
        leaferPath = null

        leafer.hitChildren = true
        app.hitChildren = false

        let appPath: ILeaf[]
        app.on(PointerEvent.DOWN, (e: PointerEvent) => {
            appPath = e.path.list
        })

        app.interaction.pointerDown(leafHitPoint)
        expect(leaferPath).toBeNull()
        expect(appPath.map(item => item.innerId)).toEqual([app].map(item => item.innerId))
        appPath = null

        app.hitChildren = true

        app.interaction.pointerDown(leafHitPoint)
        expect(path.map(item => item.innerId)).toEqual([leaf, group, leafer, app].map(item => item.innerId))
        expect(appPath.map(item => item.innerId)).toEqual([leaf, group, leafer, app].map(item => item.innerId))
    })


    const leafStrokeHitPoint = { x: 8, y: 8 } as IPointerEvent

    test('hitFill', () => {
        let hit = false
        leaf.on(PointerEvent.DOWN, () => {
            hit = true
        })

        app.config.pointer.hitRadius = 0

        leaf.hitFill = 'pixel'

        app.interaction.pointerDown(leafHitPoint)
        expect(hit).toBeTruthy()
        hit = false

        leaf.hitFill = 'path'

        app.interaction.pointerDown(leafHitPoint)
        expect(hit).toBeTruthy()
        hit = false

        leaf.fill = ''
        app.interaction.pointerDown(leafHitPoint)
        expect(hit).toBeFalsy()
        hit = false


        leaf.hitFill = 'all'

        app.interaction.pointerDown(leafHitPoint)
        expect(hit).toBeTruthy()
        hit = false


        leaf.hitFill = 'none'
        leaf.fill = 'gray'

        app.interaction.pointerDown(leafHitPoint)
        expect(hit).toBeFalsy()
        hit = false
    })


    test('hitPixel', () => {
        const canvas = new Canvas({ x: 60, y: 60, width: 50, height: 50, hitFill: 'pixel' })
        canvas.context.fillRect(10, 10, 10, 10)
        leafer2.add(canvas)

        let hit = false
        canvas.on(PointerEvent.DOWN, () => {
            hit = true
        })

        app.config.pointer.hitRadius = 0

        app.interaction.pointerDown({ x: 65, y: 65 } as IPointerEvent)

        expect(hit).toBeFalsy()
        hit = false

        canvas.hitFill = 'path'
        app.interaction.pointerDown({ x: 65, y: 65 } as IPointerEvent)
        expect(hit).toBeTruthy()
    })


    test('hitStroke', () => {
        let hit = false
        leaf.on(PointerEvent.DOWN, () => {
            hit = true
        })

        leaf.stroke = 'black'
        leaf.strokeWidth = 6
        leaf.strokeAlign = 'center'


        leaf.hitStroke = 'pixel'

        app.interaction.pointerDown(leafStrokeHitPoint)
        expect(hit).toBeTruthy()
        hit = false


        leaf.hitStroke = 'path'

        app.interaction.pointerDown(leafStrokeHitPoint)
        expect(hit).toBeTruthy()
        hit = false


        leaf.stroke = ''
        app.interaction.pointerDown(leafStrokeHitPoint)
        expect(hit).toBeFalsy()
        hit = false

        leaf.hitStroke = 'all'

        app.interaction.pointerDown(leafStrokeHitPoint)
        expect(hit).toBeTruthy()
        hit = false

        leaf.hitStroke = 'none'
        leaf.stroke = 'gray'

        app.interaction.pointerDown(leafStrokeHitPoint)
        expect(hit).toBeFalsy()
        hit = false

        app.destroy()
    })


})