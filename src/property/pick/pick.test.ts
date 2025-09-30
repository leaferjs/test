import { describe, expect, test } from 'vitest'

import { App, Rect } from 'leafer-test'


describe('pick', () => {

    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()

    test('findList', () => {
        const rect = new Rect({ id: 'block', fill: '#32cd79', x: 0, y: 0, width: 100, height: 100, stroke: 'red' })
        leafer.add(rect)

        expect(leafer.pick({ x: 1000, y: 1000 }, { findList: [rect] }).target).toEqual(null)
    })



})