import { describe, expect, test } from 'vitest'

import { Group, Rect, Path, Leafer, Line } from 'leafer-test'


describe('path-canvas', () => {


    const leafer = new Leafer({ type: 'design', width: 100, height: 100 })
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 50, height: 50, fill: '#333' })

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

    })

    test('line cornerRadius', () => {

        // 夹角 = 360
        let line = new Line({ points: [0, 0, 100, 0, 200, 0], cornerRadius: 10 })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L100 0 200 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: 0, width: 200, height: 0 })

        // 夹角 = 0
        line = new Line({ points: [0, 0, 100, 0, 0, 0], cornerRadius: 10 })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L100 0 0 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: 0, width: 100, height: 0 })

        // 直角
        line = new Line({ points: [0, 0, 100, 100, 200, 0], cornerRadius: 10 })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L92.93 92.93C96.83 96.83 103.17 96.83 107.07 92.93L200 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: 0, width: 200, height: 100 })

        // 锐角
        line = new Line({ points: [0, 0, 100, 500, 200, 0], cornerRadius: 10 })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L90.19 450.97C91.13 455.65 95.23 459.01 100 459.01 104.77 459.01 108.87 455.65 109.81 450.97L200 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: 0, width: 200, height: 500 })


        // 钝角
        line = new Line({ points: [0, 0, 100, 20, 200, 0], cornerRadius: 10 })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L98.04 19.61C99.33 19.87 100.67 19.87 101.96 19.61L200 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: 0, width: 200, height: 20 })

        // 负钝角
        line = new Line({ points: [0, 0, 100, -20, 200, 0], cornerRadius: 10 })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L98.04 -19.61C99.33 -19.87 100.67 -19.87 101.96 -19.61L200 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: -20, width: 200, height: 20 })


        // 负锐角
        line = new Line({ points: [0, 0, 100, -500, 200, 0], cornerRadius: 10 })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L90.19 -450.97C91.13 -455.65 95.23 -459.01 100 -459.01 104.77 -459.01 108.87 -455.65 109.81 -450.97L200 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: -500, width: 200, height: 500 })


        // 大圆角
        line = new Line({
            points: [0, 0, 100, 100, 200, 0],
            cornerRadius: 100,
        })
        expect(line.getPathString(true, true, 2)).toEqual('M0 0L50 50C77.61 77.61 122.39 77.61 150 50L200 0')
        expect(line.boxBounds).toMatchObject({ x: 0, y: 0, width: 200, height: 100 })

    })

    test('arcTo', () => {

        let path = new Path({ path: 'M0 0U200 0 100 100 100L200 0', })
        expect(path.getPathString(true, true, 2)).toEqual('M0 0L-41.42 0C-0.98 0 35.49 24.36 50.97 61.73 66.44 99.1 57.89 142.11 29.29 170.71L200 0')
        expect(path.boxBounds).toMatchObject({ x: -41.421356237309446, y: 0, width: 241.42135623730945, height: 170.71067811865476 })


        path = new Path({ path: 'M0 0U100 200 100 100 100L200 0', })
        expect(path.getPathString(true, true, 2)).toEqual('M0 0L-89.44 -178.89C-68.7 -137.4 -22.16 -115.63 22.98 -126.28 68.11 -136.94 100 -177.23 100 -223.61L200 0')
        expect(path.boxBounds).toMatchObject({ x: -89.44271909999165, y: -223.60679774997908, width: 289.4427190999917, height: 223.60679774997908 })

        path = new Path({ path: 'M0 0U100 50 100 100 200L200 0', })
        expect(path.getPathString(true, true, 2)).toEqual('M0 0L-10.56 -5.28C57.2 28.6 100 97.85 100 173.61L200 0')
        expect(path.boxBounds).toMatchObject({ x: -10.557280900008365, y: -5.278640450004218, width: 210.55728090000838, height: 178.88543819998318 })

        leafer.destroy()
    })


})