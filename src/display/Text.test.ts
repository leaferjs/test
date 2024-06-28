import { describe, expect, test } from 'vitest'

import { App, Group, Text, Rect } from 'leafer-test'


describe('Text', () => {


    const app = new App({ width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })

    group.add(leaf)
    leafer.add(group)

    app.start()


    test('empty', () => {
        const text = new Text()
        expect(text.textDrawData).toBeTruthy()

        const text2 = new Text({ text: ' ' })
        expect(text2.textDrawData).toBeTruthy()
    })


    test('space width', async () => {
        const text = new Text({ text: ' ' })
        expect(text.textDrawData.bounds.width > 3).toBeTruthy()

        const text2 = new Text({ text: ' ', letterSpacing: 20 })
        expect(text2.textDrawData.bounds.width > 23).toBeTruthy()

        const text3 = new Text({ text: 'asdfasdfasd                                                           sdfasdfsdf', width: 100 })
        expect(text3.textDrawData.rows.length === 2).toBeTruthy()
    })


    test('align', () => {
        // no width / height
        const text = new Text({ text: 'hello, are you ok\nhi\nhahah', textAlign: 'center', verticalAlign: 'middle' })
        expect(text.worldBoxBounds).contains({
            x: -44.025001525878906,
            y: -27,
            width: 88.05000305175781,
            height: 54
        })
    })


})