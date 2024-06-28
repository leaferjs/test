import { describe, expect, test } from 'vitest'

import { App, Rect, UI, defineKey } from 'leafer-ui-node'
import { IValue, IObject } from '@leafer/interface'


let countCreate = 0

UI.prototype.createProxyData = function () {
    countCreate++
    return this.__.__getData()
}

UI.prototype.setProxyAttr = function (name: string, newValue: IValue): void {
    const data = this.__proxyData as IObject
    if (data[name] !== newValue) data[name] = newValue
}

UI.prototype.getProxyAttr = function (name: string): IValue {
    const value = (this.__proxyData as IObject)[name]
    return value === undefined ? this.__.__get(name) : value
}

defineKey(UI.prototype, 'proxyData', {
    get() {
        return this.__proxyData ? this.__proxyData : this.__proxyData = this.createProxyData()
    }
})


describe('proxyData', () => {


    const app = new App({ type: 'design', width: 100, height: 100 })
    const leafer = app.addLeafer()
    const rect = new Rect({ width: 200, fill: 'black' })
    leafer.add(leafer)


    test('create', () => {
        expect(rect.proxyData.width).toEqual(200)
        expect(rect.proxyData.fill).toEqual('black')
        expect(countCreate).toEqual(1)
    })


    test('rect set', () => {
        rect.width = 500
        expect(rect.proxyData.width).toEqual(500)
    })


    test('rect set object', () => {
        const fill = { type: 'image', url: 'url' } as any
        rect.fill = fill
        expect(rect.proxyData.fill).toEqual(fill)
    })


    test('rect naturalHeight', () => {
        rect.__.__naturalWidth = 500
        rect.__.__naturalHeight = 500
        rect.setProxyAttr('height', rect.__.height)
        expect(rect.proxyData.height).toEqual(500)
    })


})