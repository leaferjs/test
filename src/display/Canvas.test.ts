import { describe, expect, test } from 'vitest'

import { App, Group, Canvas, Rect } from 'leafer-test'


describe('Canvas', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: '#333' })

    group.add(leaf)
    leafer.add(group)

    app.start()


    test('empty', () => {
        const canvas = new Canvas()
        expect(canvas.canvas.width > 0).toBe(true)
    })


    test('pixelRatio is 0', () => {
        const canvas = new Canvas({ pixelRatio: 0 })
        expect(canvas.pixelRatio).toBe(1)
        canvas.canvas.resize({ width: 10, height: 10, pixelRatio: 0 })
        expect(canvas.canvas.pixelRatio).toBe(1)
    })


    test('resize', () => {
        const canvas = new Canvas()
        canvas.width = 600
        canvas.height = 600
        canvas.pixelRatio = 3
        canvas.smooth = false
        expect(canvas.canvas.width).toBe(600)
        expect(canvas.canvas.height).toBe(600)
        expect(canvas.canvas.pixelRatio).toBe(3)
        expect(canvas.canvas.smooth).toBe(false)
    })


})