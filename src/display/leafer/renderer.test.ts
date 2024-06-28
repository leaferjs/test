import { describe, expect, test } from 'vitest'

import { IBounds } from '@leafer/interface'
import { Leafer, RenderEvent, Rect } from 'leafer-test'


describe('Renderer', () => {


    test('start', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())

        let renderStart: boolean
        leafer.on(RenderEvent.START, () => { renderStart = true })

        leafer.start()

        expect(renderStart).toBe(true)
        leafer.destroy()
    })


    test('events', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())

        let count = 0
        leafer.on(RenderEvent.START, () => { count++ })
        leafer.on(RenderEvent.BEFORE, () => { count++ })
        leafer.on(RenderEvent.RENDER, () => { count++ })
        leafer.on(RenderEvent.AFTER, () => { count++ })
        leafer.on(RenderEvent.END, () => { count++ })

        leafer.start()

        expect(count).toBe(5)
        leafer.destroy()
    })


    test('again', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())

        let count = 0
        leafer.on(RenderEvent.BEFORE, () => { count++ })
        leafer.on(RenderEvent.RENDER, () => { count++ })
        leafer.on(RenderEvent.AFTER, () => {
            count++
            leafer.scaleX = 2
            if (count === 3) leafer.emit(RenderEvent.AGAIN)
        })

        leafer.start()

        expect(count).toBe(6)
        leafer.destroy()
    })


    test('again more', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())

        let count = 0
        leafer.on(RenderEvent.BEFORE, () => { count++ })
        leafer.on(RenderEvent.RENDER, () => {
            count++
            leafer.scaleX = 2
            if (count < 3) leafer.emit(RenderEvent.AGAIN)
        })
        leafer.on(RenderEvent.AFTER, () => { count++ })
        leafer.on(RenderEvent.END, () => { leafer.scaleX = 3; if (count === 6) leafer.emit(RenderEvent.AGAIN) })

        leafer.start()

        expect(count).toBe(9)
        leafer.destroy()
    })


    test('close partRender', () => {
        const leafer = new Leafer({ width: 100, height: 100, usePartRender: false })
        const leaf = new Rect({ width: 20, height: 20 })
        leafer.add(leaf)
        leafer.start()

        leaf.fill = 'black'

        let bounds: IBounds
        leafer.on(RenderEvent.END, (e: RenderEvent) => { bounds = e.renderBounds })

        leaf.forceUpdate()
        leafer.renderer.render()
        expect(bounds).toEqual({ x: 0, y: 0, width: 100, height: 100 })

        leafer.config.usePartRender = true
        leaf.forceUpdate()
        leafer.renderer.render()
        expect(bounds).toEqual({ x: 0, y: 0, width: 20, height: 20 })

        leafer.config.usePartRender = false
        leaf.forceUpdate()
        leafer.renderer.render()
        expect(bounds).toEqual({ x: 0, y: 0, width: 100, height: 100 })

        leafer.destroy()
    })


})