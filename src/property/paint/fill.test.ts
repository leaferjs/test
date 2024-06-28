import { describe, expect, test } from 'vitest'

import { App, Group, Rect } from 'leafer-ui-node'


describe('fill', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })

    group.add(leaf)
    leafer.add(group)

    app.start()


    test('fill', () => {
        expect(leaf.__.__isFills).toBe(undefined)
        expect(leaf.__.fill).toBe('gray')

        // change
        leaf.fill = {
            type: 'linear',
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        }

        expect(leaf.__.__isFills).toBe(true)
        expect(leaf.__.__input.fill).toBeTruthy()
        expect(leaf.__.fill === leaf.fill as any).toBeFalsy() // computed

        // change size
        leaf.width = 200
        leaf.fill = {
            type: 'linear',
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        }

        expect(leaf.__.fill === leaf.fill as any).toBeFalsy() //wait UI.__onUpdateSize
        expect(leaf.__.fill).toBeTruthy()

        leaf.fill = 'balck'
        expect(leaf.__.__input.fill).toBe(undefined)
    })
    

})