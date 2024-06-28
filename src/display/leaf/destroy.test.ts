import { describe, expect, test } from 'vitest'

import { Leafer, Rect, Group, PointerEvent } from 'leafer-ui-node'


describe('destroy Leaf', () => {


    test('destroy on tap', () => {
        const leafer = new Leafer({ width: 100, height: 100 })

        const rect = new Rect({ fill: '#32cd79', cornerRadius: 1, draggable: true })
        const group = new Group()
        leafer.add(group)
        group.add(rect)

        group.on(PointerEvent.TAP, function () {
            group.remove(rect)
            rect.destroy()
        })

        try {
            leafer.interaction.pointerDown({ x: 20, y: 20, buttons: 1 })
            expect(rect.__hitCanvas).toBeTruthy()

            leafer.interaction.pointerUp({ x: 20, y: 20, buttons: 1 })
            expect(rect.destroyed).toBeTruthy()
            expect(rect.__hitCanvas).toBeFalsy()

            expect(rect.__).toBeTruthy()
            expect(rect.__layout).toBeTruthy()
            rect.width = 200
        } catch (e) {
            expect(e).toBe(undefined)
        }
    })


})