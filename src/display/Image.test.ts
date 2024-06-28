import { describe, expect, test } from 'vitest'

import { ILeaferImage, IObject } from '@leafer/interface'
import { App, Group, Image, Rect, ImageEvent, RenderEvent } from 'leafer-test'


describe('Image', () => {


    const app = new App({ width: 100, height: 100 })
    const leafer = app.addLeafer()
    const group = new Group()
    const leaf = new Rect({ x: 10, y: 10, width: 20, height: 20, fill: 'gray' })

    group.add(leaf)
    leafer.add(group)

    app.start()


    test('empty', () => {
        const image = new Image()
        expect(image.width > 0).toBe(true)
    })


    test('loading, then unload', async () => {
        const image = new Image({ url: 'https://leaferjs.com/image/leafer.jpg' })
        group.add(image)

        let error: IObject, realImage: ILeaferImage
        await new Promise(function (resolve) {
            image.once(ImageEvent.ERROR, (e) => {
                realImage = e.image
                error = e.error
            })

            leafer.once(RenderEvent.END, () => {

                image.url = 'https://leaferjs.com/image/qrcode/wechat_thumb.jpg'
                app.forceRender()

            })

            app.forceRender()

            setTimeout(() => {
                expect(error.type).toBe('stop')
                expect(image.__.width).toBe(120)
                expect(realImage.use).toBe(0)
                resolve(true)
            }, 2000)
        })
    })


    test('count use', async () => {
        const image = new Image({ url: 'https://leaferjs.com/image/leafer.jpg' })
        group.add(image)

        let realImage: ILeaferImage
        const rect = new Rect({ fill: { type: 'image', url: 'https://leaferjs.com/image/leafer.jpg' }, stroke: { type: 'image', url: 'https://leaferjs.com/image/leafer.jpg' } })

        await new Promise(function (resolve) {
            image.once(ImageEvent.LOADED, (e: ImageEvent) => {

                realImage = e.image
                expect(realImage.use).toBe(1)

                group.add(rect)
                app.forceRender()

            })
            app.forceRender()

            setTimeout(() => {
                expect(realImage.use).toBe(3)
                rect.fill = undefined
                rect.stroke = undefined
                expect(realImage.use).toBe(1)
                resolve(true)
            }, 2000)
        })
    })


    test('naturalWidth', async () => {
        const image = new Image({ url: 'https://leaferjs.com/image/leafer.jpg' })
        group.add(image)

        await new Promise(function (resolve) {
            image.once(ImageEvent.LOADED, () => {
                expect(image.__.__naturalWidth).toBe(220)

                image.fill = ''
                expect(image.__.__naturalWidth).toBe(undefined)
                expect(image.__.__naturalHeight).toBe(undefined)

                image.url = 'https://leaferjs.com/image/qrcode/wechat_thumb.jpg'
                app.forceRender()

            })
            app.forceRender()

            setTimeout(() => {
                expect(image.__.__naturalWidth).toBe(120)
                expect(image.__.width).toBe(120)
                resolve(true)
            }, 2000)
        })
    })


    test('height use natural ratio', async () => {
        const image = new Image({ width: 100, url: 'https://leaferjs.com/image/leafer.jpg' })
        group.add(image)

        await new Promise(function (resolve) {
            image.once(ImageEvent.LOADED, () => {
                expect(image.height).toBe(75.45454545454545)
                resolve(true)
            })
        })
    })


    test('width use natural ratio', async () => {
        const image = new Image({ height: 1000, url: 'https://leaferjs.com/image/leafer.jpg' })
        group.add(image)

        await new Promise(function (resolve) {
            image.once(ImageEvent.LOADED, () => {
                expect(image.width).toBe(1325.301204819277)
                resolve(true)
            })
        })
    })


    test('error, then must render', async () => {
        const image = new Image({ url: 'https://leaferjs.com/image/leafer4.jpg' })
        group.add(image)

        await new Promise(function (resolve) {
            image.once(ImageEvent.ERROR, () => {
                expect(image.leafer.watcher.changed).toBe(true)
                resolve(true)

            })
            app.forceRender()
        })
    })


    test('second load', async () => {
        const image = new Image({ url: 'https://leaferjs.com/image/leafer.jpg' })
        group.add(image)

        let load = 0
        let loaded = 0
        let error = 0

        await new Promise(function (resolve) {
            image.on(ImageEvent.LOAD, () => {
                load++
            })

            image.on(ImageEvent.LOADED, () => {

                loaded++


                // change same url
                image.url = 'https://leaferjs.com/image/leafer.jpg'
                app.forceRender()


                // change error url
                image.url = 'https://leaferjs.com/image/leafer2.jpg'
                app.forceRender()


                const image2 = new Image({ url: 'https://leaferjs.com/image/leafer.jpg' })
                group.add(image2)


                image2.on(ImageEvent.LOADED, () => { loaded++ })
                app.forceRender()

                // change width
                image2.width = 282
                app.forceRender()

            })

            image.on(ImageEvent.ERROR, () => {
                error++
            })

            app.forceRender()

            setTimeout(() => {
                expect(load).toBe(2)
                expect(loaded).toBe(2)
                expect(error).toBe(1)
                resolve(true)
            }, 2000)

        })
    })


})