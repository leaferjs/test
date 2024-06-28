import { describe, expect, test } from 'vitest'

import { Leafer, LayoutEvent, Rect } from 'leafer-test'


describe('Layouter', () => {


    test('start', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())

        let renderStart: boolean
        leafer.on(LayoutEvent.START, () => { renderStart = true })

        leafer.start()

        expect(renderStart).toBe(true)
        leafer.destroy()
    })


    test('events', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())

        let count = 0
        leafer.on(LayoutEvent.START, () => { count++ })
        leafer.on(LayoutEvent.BEFORE, () => { count++ })
        leafer.on(LayoutEvent.LAYOUT, () => { count++ })
        leafer.on(LayoutEvent.AFTER, () => { count++ })
        leafer.on(LayoutEvent.END, () => { count++ })

        leafer.start()

        expect(count).toBe(5)
        leafer.destroy()
    })


    test('again', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())
        leafer.start()

        let count = 0
        leafer.on(LayoutEvent.BEFORE, () => { count++ })
        leafer.on(LayoutEvent.LAYOUT, () => {
            count++
            leafer.add(new Rect())
            if (count < 3) leafer.emit(LayoutEvent.AGAIN)
        })
        leafer.on(LayoutEvent.AFTER, () => { count++ })

        leafer.add(new Rect())
        leafer.renderer.render()

        expect(count).toBe(6)
        leafer.destroy()
    })


    test('again more', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())
        leafer.start()

        let count = 0
        leafer.on(LayoutEvent.BEFORE, () => { count++ })
        leafer.on(LayoutEvent.LAYOUT, () => { count++ })
        leafer.on(LayoutEvent.AFTER, () => {
            count++
            leafer.add(new Rect())
            if (count === 3) leafer.emit(LayoutEvent.AGAIN)
        })
        leafer.on(LayoutEvent.END, () => {
            leafer.add(new Rect())
            if (count === 6) leafer.emit(LayoutEvent.AGAIN)
        })

        leafer.add(new Rect())
        leafer.renderer.render()

        expect(count).toBe(9)
        leafer.destroy()
    })


})