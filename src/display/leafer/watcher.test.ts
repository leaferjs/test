import { describe, expect, test } from 'vitest'

import { Leafer, RenderEvent, WatchEvent, Rect, Group } from 'leafer-test'


describe('Watcher', () => {


    test('start', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())

        let request: boolean
        leafer.on(RenderEvent.REQUEST, () => { request = true })

        leafer.start()
        leafer.add(new Rect())

        expect(request).toBe(true)
        leafer.destroy()
    })


    test('stop, then start', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.add(new Rect())
        leafer.start()
        leafer.stop()

        let request: boolean
        leafer.on(RenderEvent.REQUEST, () => { request = true })

        leafer.add(new Rect())

        expect(request).toBe(undefined)

        leafer.start()
        request = false

        leafer.scaleX = 2

        expect(request).toBe(true)
        leafer.destroy()
    })


    const leafer = new Leafer({ width: 100, height: 100 })
    leafer.start()
    const leaf = new Rect()

    test('listen child.add', () => {
        let request: boolean
        leafer.on(RenderEvent.REQUEST, () => { request = true })

        leafer.add(leaf)

        expect(request).toBe(true)
    })


    test('add group', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.start()

        const leaf = new Rect()
        const group = new Group()
        group.add(leaf)
        leafer.add(group)

        expect(leafer.watcher.updatedList.has(leaf)).toBe(true)
    })


    test('add, then remove', () => {
        const leafer = new Leafer({ width: 100, height: 100 })
        leafer.start()

        const leaf = new Rect()
        leafer.add(leaf)
        leafer.remove(leaf)

        expect(leafer.watcher.updatedList.has(leaf)).toBe(false)
    })


    test('listen property.change', () => {
        let request: boolean
        leafer.on(RenderEvent.REQUEST, () => { request = true })

        leaf.scaleX = 2

        expect(request).toBe(true)
    })


    test('listen child.remove', () => {
        let request: boolean
        leafer.on(RenderEvent.REQUEST, () => { request = true })

        leaf.remove()

        expect(request).toBe(true)
    })


    test('listen watch.data', () => {
        expect(leafer.watcher.changed).toBe(true)

        leafer.on(WatchEvent.DATA, (e: WatchEvent) => {
            expect(e.data.updatedList.length).toBe(1)
        })

        leafer.emit(WatchEvent.REQUEST)

        expect(leafer.watcher.changed).toBe(false)
        leafer.destroy()
    })


})