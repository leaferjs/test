import { describe, expect, test } from 'vitest'

import { Leafer, Rect, Group, UI, ChildEvent } from 'leafer-test'


describe('add Leaf', () => {


    test('add / addAt / addBefore / addAfter', () => {
        const leafer = new Leafer()
        const group = new Group()
        const leaf = new Rect()

        group.add(leaf)

        expect(leaf.parent).toBe(group)
        expect(leaf.leafer).toBe(undefined)

        leafer.__setLeafer(leafer)
        leafer.created = true
        leafer.add(group)

        expect(leaf.leafer).toBe(leafer)

        const before = new Rect()
        group.addBefore(before, leaf)

        expect(group.children[0]).toBe(before)

        const after = new Rect()
        group.addAfter(after, before)

        expect(group.children[1]).toBe(after)

        const at = new Rect()
        group.addAt(at, 2)

        expect(group.children[2]).toBe(at)

        const at2 = new Rect()
        group.addAt(at2, 6)

        expect(group.children[group.children.length - 1]).toBe(at2)

        leafer.destroy()
    })


    test('add event', () => {
        const leafer = new Leafer()
        const leaf = new Rect()

        let parentAdd: boolean, childAdd: boolean

        leafer.on(ChildEvent.ADD, () => { parentAdd = true })
        leaf.on(ChildEvent.ADD, () => { childAdd = true })

        leafer.__setLeafer(leafer)
        leafer.created = true
        leafer.add(leaf)

        expect(parentAdd).toBe(true)
        expect(childAdd).toBe(true)

        leafer.destroy()
    })


    test('wait parent', () => {
        const group = new Group()
        const leaf = new Rect()

        let waitParent = true
        leaf.waitParent(() => { waitParent = false })

        expect(leaf.__parentWait.length).toBe(1)

        group.add(leaf)

        expect(leaf.__parentWait.length).toBe(0)
        expect(waitParent).toBe(false)
    })


    test('wait leafer', () => {
        const leafer = new Leafer()
        const leaf = new Rect()

        let waitLeafer = true
        leaf.waitLeafer(() => { waitLeafer = false })

        expect(leaf.__leaferWait.length).toBe(1)

        leafer.__setLeafer(leafer)
        leafer.add(leaf)

        expect(leaf.__leaferWait.length).toBe(0)
        expect(waitLeafer).toBe(false)

        leafer.destroy()
    })


    test('simple one', () => {
        const leafer = new Leafer()
        const rect = Rect.one({ fill: 'blue' }, 20, 30, 200, 300)
        leafer.add(rect)

        expect(rect.fill).toBe('blue')
        expect(rect.x).toBe(20)
        expect(rect.y).toBe(30)
        expect(rect.width).toBe(200)
        expect(rect.height).toBe(300)
    })


    test('tag one', () => {
        const leafer = new Leafer()
        const rect = UI.one({ tag: 'Rect', fill: 'blue' }, 20, 30, 200, 300)
        leafer.add(rect)

        expect(rect.fill).toBe('blue')
        expect(rect.x).toBe(20)
        expect(rect.y).toBe(30)
        expect(rect.width).toBe(200)
        expect(rect.height).toBe(300)
    })


})