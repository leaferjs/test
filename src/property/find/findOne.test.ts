import { describe, expect, test } from 'vitest'

import { App, Rect, Group, Ellipse } from 'leafer-test'


describe('find', () => {

    test('id without leafer', () => {
        const rect = new Rect({ id: 'rect', fill: 'black' })
        const group = new Group({
            id: 'group',
            children: [rect]
        })

        expect(group.findId('group')).toEqual(group)
        expect(group.findId('rect')).toEqual(rect)
        expect(group.pick({ x: 50, y: 50 }).target).toEqual(rect)
    })


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()


    test('id', () => {
        const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
        const rect2 = new Rect({ fill: '#32cd79' })

        leafer.add(rect1)
        leafer.add(rect2)

        expect(leafer.findOne('#block')).toEqual(rect1)
    })


    test('innerId', () => {
        const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
        const rect2 = new Rect({ fill: '#32cd79' })

        leafer.add(rect1)
        leafer.add(rect2)

        expect(leafer.findOne(rect2.innerId)).toEqual(rect2)
    })


    test('className', () => {
        const rect1 = new Rect({ className: 'menu', fill: '#32cd79' })
        const rect2 = new Rect({ className: 'menu', fill: '#32cd79', x: 150 })
        const rect3 = new Rect({ fill: '#32cd79', x: 300 })

        leafer.add(rect1)
        leafer.add(rect2)
        leafer.add(rect3)

        expect(leafer.findOne('.menu')).toEqual(rect1)
    })


    test('tag', () => {
        const ellipse = new Ellipse({ fill: '#32cd79', x: 300 })

        leafer.add(ellipse)

        expect(leafer.findOne('Ellipse')).toEqual(ellipse)
    })


    test('method', () => {
        const rect1 = new Rect({ fill: '#32cd79', stroke: 'black' })
        const rect2 = new Rect({ fill: '#32cd79', x: 150 })
        const ellipse = new Ellipse({ fill: '#32cd79', stroke: 'black', x: 300 })

        leafer.add(rect1)
        leafer.add(rect2)
        leafer.add(ellipse)

        const data = leafer.findOne(function (item) {
            return item.stroke === 'black' ? 1 : 0
        })

        expect(data).toEqual(rect1)
    })


})