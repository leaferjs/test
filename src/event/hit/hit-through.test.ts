import { describe, expect, test } from 'vitest'

import { ILeafList, IPointerEvent } from '@leafer/interface'
import { App, Group, PointerEvent, Rect } from 'leafer-test'


describe('hit-through', () => {


    const app = new App({ type: 'design', width: 100, height: 100, pointer: { through: true } })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf3 = new Rect({ x: 32, y: 32, width: 10, height: 10, fill: '#333' })
    const leaf2 = new Rect({ x: 30, y: 30, width: 20, height: 20, fill: '#333' })
    const g = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: '#333' })

    group.add(leaf)
    g.add(leaf2)
    group.add(g)
    group.add(leaf3)
    leafer.add(group)

    app.start()

    const leaf2HitPoint = { x: 30, y: 30, buttons: 1 } as IPointerEvent


    test('through path', () => {
        let throughPath: ILeafList
        group.on(PointerEvent.DOWN, (e: PointerEvent) => {
            throughPath = e.throughPath
        })

        app.interaction.pointerDown(leaf2HitPoint)
        expect(throughPath.list.map(item => item.innerId)).toEqual([leaf, leaf2, g, leaf3, group, leafer, app].map(item => item.innerId))
    })


})