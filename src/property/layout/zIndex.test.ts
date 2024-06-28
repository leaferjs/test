import { describe, expect, test } from 'vitest'

import { Leafer, Rect, Group } from 'leafer-test'


describe('zIndex', () => {


    const leafer = new Leafer({ width: 100, height: 100 })
    const group = new Group()
    const leaf = new Rect({ x: 200, y: 200, width: 100, height: 100 })
    leafer.add(group)
    group.add(leaf)
    leafer.start()

    const leaf2 = new Rect({ zIndex: 2 })


    test('set: wait parent', () => {
        group.add(leaf2)
        expect(group.__layout.childrenSortChanged).toBe(true)
        expect(leafer.watcher.updatedList.length).toBe(2)

        leafer.renderer.render()
        expect(group.__layout.childrenSortChanged).toBe(false)
    })


    test('set: wait leafer', () => {
        const leaf2 = new Rect()
        const group2 = new Group()
        group2.add(leaf2)
        leaf2.zIndex = 3
        group.add(group2)

        expect(group2.__layout.childrenSortChanged).toBe(true)
        expect(leafer.watcher.updatedList.length).toBe(3)

        leafer.renderer.render()
        expect(group2.__layout.childrenSortChanged).toBe(false)
    })


    test('add', () => {
        const leaf3 = new Rect()
        group.add(leaf3)

        expect(group.__layout.affectChildrenSort).toBe(true)
        expect(group.__layout.childrenSortChanged).toBe(true)
        expect(leafer.watcher.updatedList.length).toBe(2)

        leafer.renderer.render()
        expect(group.__layout.childrenSortChanged).toBe(false)
    })


    test('remove', () => {
        group.remove(leaf2)
        expect(group.__layout.childrenSortChanged).toBe(true)
        expect(leafer.watcher.updatedList.length).toBe(1)

        leafer.renderer.render()
        expect(group.__layout.affectChildrenSort).toBeFalsy()
        expect(group.__layout.childrenSortChanged).toBe(false)
    })


})