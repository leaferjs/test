import { describe, expect, test } from 'vitest'

import { Group, Rect, Path, Leafer, Platform } from 'leafer-ui-node'


describe('path-svg', () => {


    const leafer = new Leafer({ type: 'design', width: 100, height: 100 })
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 50, height: 50, fill: 'gray' })

    group.add(leaf)
    leafer.add(group)

    leafer.start()

    Platform.ellipseToCurve = false // unfix node


    test('svg', () => {
        let path = new Path({ path: 'M0 0L20 20 20 -10H50V60C70 50 100 120 70 150S80 120 100 120Q120 50 130 60T160 100A10 20 60 0 1 70 200Q50 300 0 0Z' })
        expect(path.__.path).toEqual([1, 0, 0, 2, 20, 20, 2, 20, -10, 2, 50, -10, 2, 50, 60, 5, 70, 50, 100, 120, 70, 150, 5, 40, 180, 80, 120, 100, 120, 7, 120, 50, 130, 60, 7, 140, 70, 160, 100, 24, 115, 150, 38.15454928463655, 76.3090985692731, 60, -123.03727497183657, 56.96272502816343, 0, 7, 50, 300, 0, 0, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: -10, width: 183.78519891571807, height: 235 })

        path = new Path({ path: 'm100 0l2 2 0 1h5v6c7 5 10 12 7 15s8 12 10 12q12 5 15 6t18 10a50 20 60 0 1 100 30Q -5 200 100 0z' })
        expect(path.__.path).toEqual([1, 100, 0, 2, 102, 2, 2, 102, 3, 2, 107, 3, 2, 107, 9, 5, 114, 14, 117, 21, 114, 24, 5, 111, 27, 122, 36, 124, 36, 7, 136, 41, 139, 42, 7, 142, 43, 157, 52, 24, 207, 67, 97.2321318937252, 38.892852757490076, 60, 112.9992064866459, -67.00079351335411, 0, 7, -5, 200, 100, 0, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: 69.9591280653951, y: -19.436250599696898, width: 187.0408719346049, height: 145.22241412170945 })

        path = new Path({ path: 'm200 0a50 20 60 0 0 10 30a50 20 120 0 0 10 30a50 20 300 0 1 10 30a50 20 240 1 0 10 30z' })
        expect(path.__.path).toEqual([1, 200, 0, 24, 230.13050578400816, 25.142594918495764, 50, 20, 60, 137.45848055738628, 96.72893786024277, 1, 24, 237.85115703384375, 15.830888648633799, 50, 20, 120, 58.40391019891835, -19.34466356636638, 1, 24, 202.14884296615622, 104.16911135136618, 50, 20, 300, -19.344663566366393, 58.40391019891835, 0, 24, 209.86949421599184, 94.85740508150421, 50, 20, 240, 96.72893786024278, 137.4584805573863, 1, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: 179.45366575713132, y: 0, width: 60.83176464190444, height: 139.30284039696292 })
    })


    test('ellipticalArc', () => {
        let path = new Path({ path: 'M0 0A90 20 10 0 0 100 0Z' })
        expect(path.__.path).toEqual([1, 0, 0, 24, 12.51889232579252, -17.99463730729116, 90, 20, 10, 95.86968863056076, 7.2683211333196, 1, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: -3.552713678800501e-15, width: 100, height: 7.148620436570369 })

        path = new Path({ path: 'M0 0A90 20 10 0 1 100 0Z' })
        expect(path.__.path).toEqual([1, 0, 0, 24, 87.48110767420748, 17.99463730729116, 90, 20, 10, -172.7316788666804, -84.13031136943926, 0, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: -7.148620436570366, width: 100.00000000000003, height: 7.1486204365703765 })

        path = new Path({ path: 'M0 0A90 20 10 1 0 100 0Z' })
        expect(path.__.path).toEqual([1, 0, 0, 24, 87.48110767420748, 17.99463730729116, 90, 20, 10, -172.7316788666804, -84.13031136943926, 1, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: -1.2231487533140903, y: 0, width: 177.40939001826595, height: 43.13789505115268 })

        path = new Path({ path: 'M0 0A90 20 10 1 1 100 0Z' })
        expect(path.__.path).toEqual([1, 0, 0, 24, 12.51889232579252, -17.99463730729116, 90, 20, 10, 95.86968863056076, 7.2683211333196, 0, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: -76.18624126495183, y: -43.13789505115268, width: 177.40939001826592, height: 43.13789505115268 })

        // arc
        path = new Path({ path: 'M0 0A20 20 0 0 0 100 0Z' })
        expect(path.__.path).toEqual([1, 0, 0, 26, 50, 0, 50, 180, -0, 1, 11])
        expect(path.worldBoxBounds).toMatchObject({ x: 0, y: 0, width: 100, height: 50 })
    })


    test('error', () => {
        //  error Q - 5 200 100 0z
        let path = new Path({ path: 'm100 0l2 2 0 1h5v6c7 5 10 12 7 15s8 12 10 12q12 5 15 6t18 10a50 20 60 0 1 100 30Q - 5 200 100 0z' })
        expect(path.__.path).toEqual([1, 100, 0, 2, 102, 2, 2, 102, 3, 2, 107, 3, 2, 107, 9, 5, 114, 14, 117, 21, 114, 24, 5, 111, 27, 122, 36, 124, 36, 7, 136, 41, 139, 42, 7, 142, 43, 157, 52, 24, 207, 67, 97.2321318937252, 38.892852757490076, 60, 112.9992064866459, -67.00079351335411, 0, 7, NaN, 5, 200, 100, 7, 0, 11, undefined, undefined])
        expect(path.worldBoxBounds).toMatchObject({ x: 100, y: -19.436250599696898, width: 157, height: 119.4362505996969 })
        leafer.destroy()
    })
    

})