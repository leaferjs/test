import { describe, expect, test } from 'vitest'

import { IPointerEvent } from '@leafer/interface'
import { Leafer, Path, PointerEvent } from 'leafer-test'


describe('path', () => {


    const leafer = new Leafer({ type: 'design', width: 100, height: 100 })
    leafer.start()


    test('empty', () => {
        let path = new Path()

        expect(path.worldBoxBounds).toEqual({ x: 0, y: 0, width: 0, height: 0 })

        path = new Path({ path: '' })

        expect(path.worldBoxBounds).toEqual({ x: 0, y: 0, width: 0, height: 0 })

        path = new Path({ path: null })

        expect(path.worldBoxBounds).toEqual({ x: 0, y: 0, width: 0, height: 0 })

        path = new Path({ path: [] })

        expect(path.worldBoxBounds).toEqual({ x: 0, y: 0, width: 0, height: 0 })

        path = new Path({ path: 'M 0 0 L 100 100' })

        expect(path.worldBoxBounds).toEqual({ x: 0, y: 0, width: 100, height: 100 })

        path.path = ''

        expect(path.worldBoxBounds).toEqual({ x: 0, y: 0, width: 0, height: 0 })
    })


    test('windingRule', () => {
        const path = new Path({ path: 'N 0 0 100 100 M 80 50 P 50 50 30', windingRule: 'nonzero', fill: 'gray' })
        leafer.add(path)

        expect(path.path).toEqual('N 0 0 100 100 M 80 50 P 50 50 30')
        expect(path.__.path).toEqual([21, 0, 0, 100, 100, 1, 80, 50, 27, 50, 50, 30])

        let hit = false
        path.on(PointerEvent.DOWN, () => {
            hit = true
        })

        leafer.interaction.pointerDown({ x: 50, y: 50, buttons: 1 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        path.windingRule = 'evenodd'
        leafer.interaction.pointerDown({ x: 50, y: 50, buttons: 1 } as IPointerEvent)
        expect(hit).toBeFalsy()
    })


})