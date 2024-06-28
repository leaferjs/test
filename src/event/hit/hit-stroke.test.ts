import { describe, expect, test } from 'vitest'

import { IPointerEvent } from '@leafer/interface'
import { App, Group, PointerEvent, Rect } from 'leafer-ui-node'


describe('hit stroke', () => {


    const app = new App({ type: 'design', width: 100, height: 100, pointer: { hitRadius: 5 } })
    const leafer = app.addLeafer()
    const leafer2 = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 0, y: 0, width: 100, height: 100 })
    const leaf2 = new Rect({ x: 110, y: 110, width: 10, height: 10 })

    group.add(leaf)
    leafer.add(group)
    leafer2.add(leaf2)

    app.start()


    test('no fill', () => {
        let hit = false
        leaf.on(PointerEvent.DOWN, () => {
            hit = true
        })

        leaf.stroke = 'black'
        leaf.strokeWidth = 10
        leaf.strokeAlign = 'inside'

        app.interaction.pointerDown({ x: 12, y: 12 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 9, y: 9 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -2, y: -2 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        leaf.strokeAlign = 'outside'

        app.interaction.pointerDown({ x: 3, y: 3 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -5, y: -5 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -12, y: -12 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        leaf.strokeAlign = 'center'

        app.interaction.pointerDown({ x: 8, y: 8 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 2, y: 2 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -8, y: -8 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false
    })


    test('fill', () => {
        let hit = false
        leaf.on(PointerEvent.DOWN, () => {
            hit = true
        })

        leaf.fill = 'gray'
        leaf.strokeAlign = 'inside'

        app.interaction.pointerDown({ x: 12, y: 12 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 9, y: 9 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -2, y: -2 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        leaf.strokeAlign = 'outside'

        app.interaction.pointerDown({ x: 3, y: 3 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -5, y: -5 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -12, y: -12 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        leaf.strokeAlign = 'center'

        app.interaction.pointerDown({ x: 8, y: 8 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 2, y: 2 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -8, y: -8 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false
    })


    test('fill', () => {
        let hit = false
        leaf.on(PointerEvent.DOWN, () => {
            hit = true
        })

        leaf.fill = 'gray'
        leaf.strokeAlign = 'inside'

        app.interaction.pointerDown({ x: 12, y: 12 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 9, y: 9 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -2, y: -2 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        leaf.strokeAlign = 'outside'

        app.interaction.pointerDown({ x: 3, y: 3 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -5, y: -5 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -12, y: -12 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        leaf.strokeAlign = 'center'

        app.interaction.pointerDown({ x: 8, y: 8 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 2, y: 2 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: -8, y: -8 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false
    })


    test('strokeCap / dashPattern', () => {
        let hit = false
        leaf.on(PointerEvent.DOWN, () => {
            hit = true
        })

        leaf.fill = ''
        leaf.strokeAlign = 'center'
        leaf.strokeCap = 'square'
        leaf.dashPattern = [50, 50]

        app.interaction.pointerDown({ x: -10, y: -10 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 30, y: -5 } as IPointerEvent)
        expect(hit).toBeTruthy()
        hit = false

        app.interaction.pointerDown({ x: 80, y: -5 } as IPointerEvent)
        expect(hit).toBeFalsy()

        app.destroy()
    })

})