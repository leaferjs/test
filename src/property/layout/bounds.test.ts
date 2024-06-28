import { describe, expect, test } from 'vitest'

import { IBounds } from '@leafer/interface'
import { Leafer, Rect, Group, RenderEvent, Ellipse, Line } from 'leafer-test'


describe('bounds', () => {


    const leafer = new Leafer({ width: 100, height: 100 })
    leafer.x = leafer.y = 100
    const group = new Group({ x: 100, y: 100, rotation: 90, scaleX: 2, scaleY: 2 })
    const leaf = new Rect({ x: 200, y: 200, width: 100, height: 100 })
    leafer.add(group)
    group.add(leaf)


    test('create', () => {
        expect(leaf.worldBoxBounds).toEqual({ x: -400, y: 600, width: 200, height: 200 })
        expect(group.worldBoxBounds).toEqual({ x: -400, y: 600, width: 200.00000000000006, height: 200 })
        expect(leafer.worldBoxBounds).toEqual({ x: -400, y: 600, width: 200.00000000000006, height: 200 })
    })


    test('change', () => {
        leaf.width = leaf.height = 200
        expect(group.worldBoxBounds).toEqual({ x: -600, y: 600, width: 400.00000000000006, height: 400 })
        expect(leaf.worldBoxBounds).toEqual({ x: -600, y: 600, width: 400, height: 400 })
        expect(leafer.worldBoxBounds).toEqual({ x: -600, y: 600, width: 400.00000000000006, height: 400 })
    })

    // inner

    test('getBounds(box, inner)', () => {
        leaf.stroke = '#000000'
        leaf.strokeAlign = 'center'
        leaf.strokeWidth = 10
        leaf.shadow = { x: 10, y: 10, blur: 10, color: '#00000020' }

        expect(leaf.getBounds('box', 'inner')).toEqual({ x: 0, y: 0, width: 200, height: 200 })
        expect(group.getBounds('box', 'inner')).toEqual({ x: 200, y: 200, width: 200, height: 200 })
        expect(leafer.getBounds('box', 'inner')).toEqual({ x: -700, y: 500, width: 400.00000000000006, height: 400 })
    })


    test('getBounds(stroke, inner)', () => {
        expect(leaf.getBounds('stroke', 'inner')).toEqual({ x: -5, y: -5, width: 210, height: 210 })
        expect(group.getBounds('stroke', 'inner')).toEqual({ x: 195, y: 195, width: 210, height: 210 })
        expect(leafer.getBounds('stroke', 'inner')).toEqual({ x: -710, y: 490, width: 420.00000000000006, height: 420 })
    })


    test('getBounds(render, inner)', () => {
        expect(leaf.getBounds('render', 'inner')).toEqual({ x: -30, y: -30, width: 260, height: 260 })
        expect(group.getBounds('render', 'inner')).toEqual({ x: 170, y: 170, width: 260, height: 260 })
        expect(leafer.getBounds('render', 'inner')).toEqual({ x: -760, y: 440, width: 520, height: 520 })
    })


    // local

    test('getBounds(box, local)', () => {
        expect(leaf.getBounds('box', 'local')).toMatchObject({ x: 200, y: 200, width: 200, height: 200 })
        expect(group.getBounds('box', 'local')).toMatchObject({ x: -700, y: 500, width: 400.00000000000006, height: 400 })
        expect(leafer.getBounds('box', 'local')).toMatchObject({ x: -600, y: 600, width: 400.00000000000006, height: 400 })
    })


    test('getBounds(stroke, local)', () => {
        expect(leaf.getBounds('stroke', 'local')).toEqual({ x: 195, y: 195, width: 210, height: 210 })
        expect(group.getBounds('stroke', 'local')).toEqual({ x: -710, y: 490, width: 420.00000000000006, height: 420 })
        expect(leafer.getBounds('stroke', 'local')).toEqual({ x: -610, y: 590, width: 420.00000000000006, height: 420 })
    })


    test('getBounds(render, local)', () => {
        expect(leaf.getBounds('render', 'local')).toEqual({ x: 170, y: 170, width: 260, height: 260 })
        expect(group.getBounds('render', 'local')).toEqual({ x: -760, y: 440, width: 520, height: 520 })
        expect(leafer.getBounds('render', 'local')).toEqual({ x: -660, y: 540, width: 520, height: 520 })
    })


    // world

    test('getBounds(box, world)', () => {
        expect(leaf.getBounds('box', 'world')).toMatchObject({ x: -600, y: 600, width: 400, height: 400 })
        expect(group.getBounds('box', 'world')).toMatchObject({ x: -600, y: 600, width: 400.00000000000006, height: 400 })
        expect(leafer.getBounds('box', 'world')).toMatchObject({ x: -600, y: 600, width: 400.00000000000006, height: 400 })
    })


    test('getBounds(stroke, world)', () => {
        expect(leaf.getBounds('stroke', 'world')).toEqual({ x: -610, y: 590, width: 420, height: 420 })
        expect(group.getBounds('stroke', 'world')).toEqual({ x: -610, y: 590, width: 420.00000000000006, height: 420 })
        expect(leafer.getBounds('stroke', 'world')).toEqual({ x: -610, y: 590, width: 420.00000000000006, height: 420 })
    })


    test('boxStroke', () => {
        const ellipse = new Ellipse({ x: 200, y: 200, width: 100, height: 100, strokeAlign: 'outside', stroke: 'black' })
        const line = new Line({ x: 200, y: 200, width: 100, stroke: 'black' })

        expect(ellipse.getBounds('stroke', 'world')).toEqual({ x: 199, y: 199, width: 102, height: 102 })
        expect(line.getBounds('stroke', 'world')).toEqual({ x: 199.5, y: 199.5, width: 101, height: 1 })
    })


    test('getBounds(render, world)', () => {
        expect(leaf.getBounds('render', 'world')).toMatchObject({ x: -660, y: 540, width: 520, height: 520 })
        expect(group.getBounds('render', 'world')).toMatchObject({ x: -660, y: 540, width: 520, height: 520 })
        expect(leafer.getBounds('render', 'world')).toMatchObject({ x: -660, y: 540, width: 520, height: 520 })
    })


    test('remove child', () => {
        leaf.remove()
        expect(leaf.getBounds('render', 'world')).toMatchObject({ x: 170, y: 170, width: 260, height: 260 })
        expect(group.getBounds('render', 'world')).toMatchObject({ x: 200, y: 200, width: 0, height: 0 })
        expect(leafer.getBounds('render', 'world')).toMatchObject({ x: 100, y: 100, width: 0, height: 0 })

    })


    test('none bounds', () => {
        // group none bounds
        let bounds: IBounds
        leafer.on(RenderEvent.END, (e: RenderEvent) => { bounds = e.renderBounds })
        leafer.renderer.render()
        expect(bounds).toEqual({ x: 0, y: 0, width: 0, height: 0 })

        // leaf none bounds
        group.add(new Rect({ width: 0, height: 0 }))
        expect(leaf.getBounds('render', 'world')).toMatchObject({ x: 170, y: 170, width: 260, height: 260 })
        expect(group.getBounds('render', 'world')).toMatchObject({ x: 200, y: 200, width: 0, height: 0 })
        expect(leafer.getBounds('render', 'world')).toMatchObject({ x: 100, y: 100, width: 0, height: 0 })
        leafer.renderer.render()
        expect(bounds).toEqual({ x: 0, y: 0, width: 100, height: 100 })
    })


    test('add child', () => {
        group.add(leaf)
        expect(leaf.getBounds('render', 'world')).toMatchObject({ x: -660, y: 540, width: 520, height: 520 })
        expect(group.getBounds('render', 'world')).toMatchObject({ x: -660, y: 540, width: 520, height: 520 })
        expect(leafer.getBounds('render', 'world')).toMatchObject({ x: -660, y: 540, width: 520, height: 520 })


    })


    test('change strokeBounds/renderBounds', () => {
        leafer.x = leafer.y = 0

        const leaf2 = new Rect({ x: 10, y: 10, width: 100, height: 100, strokeAlign: 'outside', shadow: { x: 10, y: 10, blur: 10, color: '#00000020' } })
        leafer.add(leaf2)

        leaf2.stroke = 'black'
        expect(leaf2.worldStrokeBounds).toEqual({ x: 9, y: 9, width: 102, height: 102 })
        expect(leaf2.worldRenderBounds).toMatchObject({ x: -16, y: -16, width: 152, height: 152 })


        leaf2.stroke = ''
        expect(leaf2.worldStrokeBounds).toEqual({ x: 10, y: 10, width: 100, height: 100 })
        expect(leaf2.worldRenderBounds).toMatchObject({ x: -15, y: -15, width: 150, height: 150 })

        leaf2.shadow = null
        expect(leaf2.getBounds('stroke', 'inner')).toBe(leaf2.getBounds('box', 'inner'))
        expect(leaf2.getBounds('render', 'inner')).toBe(leaf2.getBounds('box', 'inner'))

        leafer.destroy()
    })


})