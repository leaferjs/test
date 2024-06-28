import { describe, expect, test } from 'vitest'

import { Leafer, Rect, Group, ChildEvent } from 'leafer-ui-node'


describe('remove Leaf', () => {


    test('remove methods', () => {
        const leafer = new Leafer()
        const group = new Group()
        const leaf = new Rect()

        leafer.__setLeafer(leafer)
        leafer.created = true
        leafer.add(group)
        group.add(leaf)

        const before = new Rect()
        group.addBefore(before, leaf)

        group.remove(before)
        expect(before.parent).toBe(null)
        expect(group.children.length).toBe(1)


        group.remove(before)
        expect(before.parent).toBe(null)
        expect(group.children.length).toBe(1)

        group.remove(null)
        expect(group.parent).toBeTruthy()

        leafer.destroy()
    })


    test('child.remove event', () => {
        const leafer = new Leafer()
        const leaf = new Rect()

        leafer.__setLeafer(leafer)
        leafer.created = true
        leafer.add(leaf)

        let parentRemove: boolean, childRemove: boolean

        leafer.on(ChildEvent.REMOVE, () => { parentRemove = true })
        leaf.on(ChildEvent.REMOVE, () => { childRemove = true })

        leaf.remove()

        expect(parentRemove).toBe(true)
        expect(childRemove).toBe(true)

        leafer.destroy()
    })


})