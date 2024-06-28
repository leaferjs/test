import { describe, expect, test } from 'vitest'

import { App, Group, Rect } from 'leafer-test'


describe('stroke', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, stroke: 'gray' })

    group.add(leaf)
    leafer.add(group)

    app.start()


    test('stroke', () => {
        expect(leaf.__.__isStrokes).toBe(undefined)
        expect(leaf.__.stroke).toBe('gray')

        // change
        leaf.stroke = {
            type: 'linear',
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        }

        expect(leaf.__.__isStrokes).toBe(true)
        expect(leaf.__.__input.stroke).toBeTruthy()
        expect(leaf.__.stroke === leaf.stroke as any).toBeFalsy() // computed

        // change size
        leaf.width = 200
        leaf.stroke = {
            type: 'linear',
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        }

        expect(leaf.__.stroke === leaf.stroke as any).toBeFalsy() // wait UI.__onUpdateSize
        expect(leaf.__.stroke).toBeTruthy()

        leaf.stroke = 'balck'
        expect(leaf.__.__input.stroke).toBe(undefined)
    })


})