import { describe, expect, test } from 'vitest'

import { Group, Rect, Path, Leafer } from 'leafer-test'


describe('path-canvas', () => {


    const leafer = new Leafer({ type: 'design', width: 100, height: 100 })
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 50, height: 50, fill: 'gray' })

    group.add(leaf)
    leafer.add(group)

    leafer.start()


    test('command', () => {
        let path = new Path({ path: 'N0 0 100 100D110 0 100 100 20 0 0 30X220 0 100 100 30' })
        expect(path.__.path).toEqual([21, 0, 0, 100, 100, 22, 110, 0, 100, 100, 20, 0, 0, 30, 23, 220, 0, 100, 100, 30])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: 0, width: 320, height: 100 })

        path = new Path({ path: 'G 50 100 50 100 30 50 180 1F 50 300 50 30' })
        expect(path.__.path).toEqual([24, 50, 100, 50, 100, 30, 50, 180, 1, 25, 50, 300, 50, 30])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: 9.860216361555045, width: 116.14935122760473, height: 320.13978363844495 })

        path = new Path({ path: 'O 50 100 50 30 180 0P 50 300 50' })
        expect(path.__.path).toEqual([26, 50, 100, 50, 30, 180, 0, 27, 50, 300, 50])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: 100, width: 100, height: 250 })

        path = new Path({ path: 'M 0 0 U 50 0 50 50 30' })
        expect(path.__.path).toEqual([1, 0, 0, 28, 50, 0, 50, 50, 30])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: -3.552713678800501e-15, width: 50.00000000000001, height: 30 })
        leafer.destroy()
    })


})