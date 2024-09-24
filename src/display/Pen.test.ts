import { describe, expect, test } from 'vitest'

import { App, Group, Pen, Rect } from 'leafer-test'


describe('Pen', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })

    group.add(leaf)
    leafer.add(group)

    app.start()


    test('curve', () => {
        const pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.moveTo(30, 30).lineTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30).closePath()

        expect(pen.__path).toEqual([1, 30, 30, 2, 40, 30, 5, 70, 30, 90, 60, 63, 80, 7, 50, 88, 40, 80, 5, 10, 60, 50, 40, 40, 30, 11])
        expect(pen.pathElement.getPathString()).toBe('M30 30L40 30C70 30 90 60 63 80Q50 88 40 80C10 60 50 40 40 30z')
        expect(pen.pathElement.getPathString(true)).toBe('M30 30L40 30C70 30 90 60 63 80 54.333333333333 85.333333333333 46.666666666667 85.333333333333 40 80 10 60 50 40 40 30z')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: 28.62886575263447, y: 30, width: 47.075905111998296, height: 54 })
    })


    test('rect', () => {
        const pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.rect(0, 0, 100, 100).roundRect(0, 120, 100, 100, 20).roundRect(0, 240, 100, 100, [20, 30]).roundRect(0, 360, 100, 100, [20, 30, 20]).roundRect(0, 480, 100, 100, [20, 30, 10, 10])

        expect(pen.pathElement.getPathString()).toBe('N0 0 100 100X0 120 100 100 20D0 240 100 100 20 30 20 30 0 360 100 100 20 30 20 30 0 480 100 100 20 30 10 10')
        expect(pen.pathElement.getPathString(true)).toBe('M0 0L100 0 100 100 0 100 0 0M20 120L80 120C91.045694996616 120 100 128.954305003384 100 140L100 200C100 211.045694996616 91.045694996616 220 80 220L20 220C8.954305003384 220 0 211.045694996616 0 200L0 140C0 128.954305003384 8.954305003384 120 20 120M20 240L70 240C86.568542494924 240 100 253.431457505076 100 270L100 320C100 331.045694996616 91.045694996616 340 80 340L30 340C13.431457505076 340 0 326.568542494924 0 310L0 260C0 248.954305003384 8.954305003384 240 20 240M20 360L70 360C86.568542494924 360 100 373.431457505076 100 390L100 440C100 451.045694996616 91.045694996616 460 80 460L30 460C13.431457505076 460 0 446.568542494924 0 430L0 380C0 368.954305003384 8.954305003384 360 20 360M20 480L70 480C86.568542494924 480 100 493.431457505076 100 510L100 570C100 575.522847498308 95.522847498308 580 90 580L10 580C4.477152501692 580 0 575.522847498308 0 570L0 500C0 488.954305003384 8.954305003384 480 20 480')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: 0, y: 0, width: 100, height: 580 })
    })


    test('arc', () => {
        const pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.arc(0, 0, 50).arc(0, 100, 50, 90).arc(0, 200, 50, 90, 360).arc(0, 300, 50, 90, -90, true)
        expect(pen.path).toEqual([27, 0, 0, 50, 26, 0, 100, 50, 90, 360, 0, 26, 0, 200, 50, 90, 360, 0, 26, 0, 300, 50, 90, -90, 1])
        expect(pen.pathElement.getPathString()).toBe('P0 0 50O0 100 50 90 360 0 0 200 50 90 360 0 0 300 50 90 -90 1')
        expect(pen.pathElement.getPathString(true)).toBe('M50 0C50 27.61423749154 27.61423749154 50 0 50 -27.61423749154 50 -50 27.61423749154 -50 0 -50 -27.61423749154 -27.61423749154 -50 0 -50 27.61423749154 -50 50 -27.61423749154 50 0L0 150C-27.61423749154 150 -50 127.61423749154 -50 100 -50 72.38576250846 -27.61423749154 50 0 50 27.61423749154 50 50 72.38576250846 50 100L0 250C-27.61423749154 250 -50 227.61423749154 -50 200 -50 172.38576250846 -27.61423749154 150 0 150 27.61423749154 150 50 172.38576250846 50 200L0 350C27.61423749154 350 50 327.61423749154 50 300 50 272.38576250846 27.61423749154 250 0 250')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: -50, y: -50, width: 100, height: 400 })

        // moveto
        pen.beginPath().drawArc(0, 0, 50).drawArc(0, 100, 50, 90).drawArc(0, 200, 50, 90, 360).closePath().drawArc(0, 300, 50, 90, -90, true)
        expect(pen.pathElement.getPathString()).toBe('M50 0P0 0 50M0 150O0 100 50 90 360 0M0 250O0 200 50 90 360 0zM0 350O0 300 50 90 -90 1')
    })


    test('ellipse', () => {
        const pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.ellipse(0, 0, 50, 20).ellipse(0, 100, 50, 20, 30).ellipse(0, 200, 50, 20, 0, 90).ellipse(0, 300, 50, 20, 0, 90, 360).ellipse(0, 400, 50, 20, 0, 90, -90, true)
        expect(pen.path).toEqual([25, 0, 0, 50, 20, 24, 0, 100, 50, 20, 30, 0, 360, 0, 24, 0, 200, 50, 20, 0, 90, 360, 0, 24, 0, 300, 50, 20, 0, 90, 360, 0, 24, 0, 400, 50, 20, 0, 90, -90, 1])
        expect(pen.pathElement.getPathString()).toBe('F0 0 50 20G0 100 50 20 30 0 360 0 0 200 50 20 0 90 360 0 0 300 50 20 0 90 360 0 0 400 50 20 0 90 -90 1')
        expect(pen.pathElement.getPathString(true)).toBe('M50 0C50 11.045694996616 27.61423749154 20 0 20 -27.61423749154 20 -50 11.045694996616 -50 0 -50 -11.045694996616 -27.61423749154 -20 0 -20 27.61423749154 -20 50 -11.045694996616 50 0L43.301270189222 125C37.778422690914 134.565852469524 13.91463117381 131.127626821459 -10 117.320508075689 -33.91463117381 103.513389329919 -48.82411768753 84.565852469524 -43.301270189222 75 -37.778422690914 65.434147530476 -13.91463117381 68.872373178541 10 82.679491924311 33.91463117381 96.486610670081 48.82411768753 115.434147530476 43.301270189222 125L0 220C-27.61423749154 220 -50 211.045694996616 -50 200 -50 188.954305003384 -27.61423749154 180 0 180 27.61423749154 180 50 188.954305003384 50 200L0 320C-27.61423749154 320 -50 311.045694996616 -50 300 -50 288.954305003384 -27.61423749154 280 0 280 27.61423749154 280 50 288.954305003384 50 300L0 420C27.61423749154 420 50 411.045694996616 50 400 50 388.954305003384 27.61423749154 380 0 380')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: -50, y: -20, width: 100, height: 440 })

        // moveto
        pen.beginPath().drawEllipse(0, 0, 50, 20).drawEllipse(0, 100, 50, 20, 30).drawEllipse(0, 200, 50, 20, 0, 90).closePath().drawEllipse(0, 300, 50, 20, 0, 90, 360).drawEllipse(0, 400, 50, 20, 0, 90, -90, true)
        expect(pen.pathElement.getPathString()).toBe('M50 0F0 0 50 20M43.301270189222 125G0 100 50 20 30 0 360 0M0 220G0 200 50 20 0 90 360 0zM0 320G0 300 50 20 0 90 360 0M0 420G0 400 50 20 0 90 -90 1')
    })


    test('arcTo', () => {
        // error 3 arcTo
        let pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.moveTo(0, 0).arcTo(0, 100, 100, 100, 100).arcTo(100, 100, 0, 100, 30).arcTo(0, 0, 0, 0, 10).arcTo(0, 0, 0, 100, 200)
        expect(pen.pathElement.getPathString()).toBe('M0 0U0 100 100 100 100 100 100 0 100 30 0 0 0 0 10 0 0 0 100 200')
        expect(pen.pathElement.getPathString(true)).toBe('M0 0L0 0C0 55.228474983079 44.771525016921 100 100 100L100 100 0 0 0 0')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: 0, y: -1.9643867237284715e-15, width: 100, height: 100 })

        // error 2 arcTo
        pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.moveTo(0, 0).arcTo(0, 100, 100, 100, 100).arcTo(100, 100, 0, 100, 30).arcTo(0, 100, 0, 0, 10).arcTo(0, 0, 0, 100, 200)
        expect(pen.pathElement.getPathString()).toBe('M0 0U0 100 100 100 100 100 100 0 100 30 0 100 0 0 10 0 0 0 100 200')
        expect(pen.pathElement.getPathString(true)).toBe('M0 0L0 0C0 55.228474983079 44.771525016921 100 100 100L100 100 10 100C4.477152501692 100 0 95.522847498308 0 90L0 0')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: -3.552713678800501e-15, y: -1.9643867237284715e-15, width: 100, height: 100 })

        pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.moveTo(10, 0).arcTo(100, 0, 100, 100, 10).arcTo(100, 100, 0, 100, 30).arcTo(0, 100, 0, 0, 10).arcTo(0, 0, 100, 0, 10)
        expect(pen.pathElement.getPathString()).toBe('M10 0U100 0 100 100 10 100 100 0 100 30 0 100 0 0 10 0 0 100 0 10')
        expect(pen.pathElement.getPathString(true)).toBe('M10 0L90 0C95.522847498308 0 100 4.477152501692 100 10L100 70C100 86.568542494924 86.568542494924 100 70 100L10 100C4.477152501692 100 0 95.522847498308 0 90L0 10C0 4.477152501692 4.477152501692 0 10 0')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: -3.552713678800501e-15, y: -1.7763568394002505e-15, width: 100, height: 100 })
    })


    test('beginPath', () => {
        const pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        pen.moveTo(30, 30).lineTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30).closePath()

        expect(pen.path).toEqual([1, 30, 30, 2, 40, 30, 5, 70, 30, 90, 60, 63, 80, 7, 50, 88, 40, 80, 5, 10, 60, 50, 40, 40, 30, 11])
        expect(pen.pathElement.getPathString()).toBe('M30 30L40 30C70 30 90 60 63 80Q50 88 40 80C10 60 50 40 40 30z')
        expect(pen.pathElement.getPathString(true)).toBe('M30 30L40 30C70 30 90 60 63 80 54.333333333333 85.333333333333 46.666666666667 85.333333333333 40 80 10 60 50 40 40 30z')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: 28.62886575263447, y: 30, width: 47.075905111998296, height: 54 })

        pen.beginPath().rect(0, 0, 100, 100).roundRect(0, 120, 100, 100, 20).roundRect(0, 240, 100, 100, [20, 30]).roundRect(0, 360, 100, 100, [20, 30, 20]).roundRect(0, 480, 100, 100, [20, 30, 10, 10])

        expect(pen.pathElement.getPathString()).toBe('N0 0 100 100X0 120 100 100 20D0 240 100 100 20 30 20 30 0 360 100 100 20 30 20 30 0 480 100 100 20 30 10 10')
        expect(pen.pathElement.getPathString(true)).toBe('M0 0L100 0 100 100 0 100 0 0M20 120L80 120C91.045694996616 120 100 128.954305003384 100 140L100 200C100 211.045694996616 91.045694996616 220 80 220L20 220C8.954305003384 220 0 211.045694996616 0 200L0 140C0 128.954305003384 8.954305003384 120 20 120M20 240L70 240C86.568542494924 240 100 253.431457505076 100 270L100 320C100 331.045694996616 91.045694996616 340 80 340L30 340C13.431457505076 340 0 326.568542494924 0 310L0 260C0 248.954305003384 8.954305003384 240 20 240M20 360L70 360C86.568542494924 360 100 373.431457505076 100 390L100 440C100 451.045694996616 91.045694996616 460 80 460L30 460C13.431457505076 460 0 446.568542494924 0 430L0 380C0 368.954305003384 8.954305003384 360 20 360M20 480L70 480C86.568542494924 480 100 493.431457505076 100 510L100 570C100 575.522847498308 95.522847498308 580 90 580L10 580C4.477152501692 580 0 575.522847498308 0 570L0 500C0 488.954305003384 8.954305003384 480 20 480')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: 0, y: 0, width: 100, height: 580 })
    })


    test('paint', () => {
        const pen = new Pen()
        pen.setStyle({ fill: 'blue' })
        leafer.add(pen)
        leafer.renderer.render()

        pen.moveTo(30, 30).lineTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30).closePath()
        pen.paint()
        expect(pen.pathElement.getPathString()).toBe('M30 30L40 30C70 30 90 60 63 80Q50 88 40 80C10 60 50 40 40 30z')
        expect(pen.pathElement.worldBoxBounds).toEqual({ x: 28.62886575263447, y: 30, width: 47.075905111998296, height: 54 })
    })


})