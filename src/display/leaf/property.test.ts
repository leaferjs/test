import { describe, expect, test } from 'vitest'

import { Leafer, Rect, UI, PropertyEvent } from 'leafer-test'


describe('property change', () => {


    test('set', () => {
        const leaf = new Rect({ scaleX: 2 })
        expect(leaf.__layout.scaleChanged).toBe(true)
    })


    test('get', () => {
        const leaf = new Rect({ scaleX: 2, cornerRadius: '20' })
        expect(leaf.scaleX).toBe(2)
        expect(leaf.cornerRadius).toBe('20')
    })


    test('property.change event', () => {
        const leafer = new Leafer()
        const leaf = new Rect()

        let leaferChanged: boolean, leafChanged: boolean

        leafer.on(PropertyEvent.CHANGE, () => { leaferChanged = true })
        leaf.on(PropertyEvent.CHANGE, () => { leafChanged = true })

        leafer.__setLeafer(leafer)
        leafer.created = true
        leafer.add(leaf)

        expect(leaferChanged).toBe(undefined)
        expect(leafChanged).toBe(undefined)

        leaf.fill = 'white'

        expect(leaferChanged).toBe(true)
        expect(leafChanged).toBe(true)

        leafer.destroy()
    })


    test('default boxBounds changed', () => {
        const leaf = new Rect()
        expect(leaf.__layout.boxChanged).toBe(true)
        expect(leaf.__layout.matrixChanged).toBe(true)
    })

    test('default value', () => {
        const leaf = new Rect()
        expect(leaf.scaleX).toBe(1)
    })


    test('change default value', () => {
        UI.changeAttr('scaleX', 2)
        const leaf = new Rect()
        expect(leaf.scaleX).toBe(2)

        leaf.scaleX = 3
        expect(leaf.scaleX).toBe(3)
    })


    test('forceUpdate', () => {
        const leafer = new Leafer()
        const leaf = new Rect()
        leafer.__setLeafer(leafer)
        leafer.created = true
        leafer.add(leaf)

        leaf.forceUpdate()

        expect(leaf.__layout.matrixChanged).toBe(true)
        expect(leaf.__layout.boxChanged).toBe(true)

        let shadowUpdate: boolean
        leaf.on(PropertyEvent.CHANGE, () => { shadowUpdate = true })
        leaf.forceUpdate('shadow')
        expect(shadowUpdate).toBe(true)

        leafer.destroy()
    })


})