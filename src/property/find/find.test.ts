import { describe, expect, test } from 'vitest'

import { App, Rect, Ellipse } from 'leafer-ui-node'


describe('find', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()


    test('id', () => {
        const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
        const rect2 = new Rect({ id: 2 as any, fill: '#32cd79' })

        leafer.add(rect1)
        leafer.add(rect2)

        expect(leafer.find('#block')).toEqual([rect1])

        expect(leafer.find({ id: 2 })).toEqual([rect2])
    })


    test('innerId', () => {
        const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
        const rect2 = new Rect({ fill: '#32cd79' })

        leafer.add(rect1)
        leafer.add(rect2)

        expect(leafer.find(rect2.innerId)).toEqual([rect2])
    })


    test('className', () => {
        const rect1 = new Rect({ className: 'menu', fill: '#32cd79' })
        const rect2 = new Rect({ className: 'menu', fill: '#32cd79', x: 150 })
        const rect3 = new Rect({ fill: '#32cd79', x: 300 })

        leafer.add(rect1)
        leafer.add(rect2)
        leafer.add(rect3)

        expect(leafer.find('.menu')).toEqual([rect1, rect2])
    })


    test('tag', () => {
        const app = new App({ type: 'design', width: 100, height: 100 })
        const leafer = app.addLeafer()

        const ellipse = new Ellipse({ fill: '#32cd79', x: 300 })

        leafer.add(ellipse)

        expect(leafer.find('Ellipse')).toEqual([ellipse])

        const rect1 = new Rect({ fill: '#32cd79', stroke: 'black' })

        leafer.add(rect1)

        expect(leafer.find({ tag: ['Ellipse', 'Rect'] })).toEqual([ellipse, rect1])
    })


    test('method', () => {
        const rect1 = new Rect({ fill: '#32cd79', stroke: 'black' })
        const rect2 = new Rect({ fill: '#32cd79', x: 150 })
        const ellipse = new Ellipse({ fill: '#32cd79', stroke: 'black', x: 300 })

        leafer.add(rect1)
        leafer.add(rect2)
        leafer.add(ellipse)

        const data = leafer.find(function (item) {
            return item.stroke === 'black' ? 1 : 0
        })

        expect(data).toEqual([rect1, ellipse])
    })


})