import { describe, expect, test } from 'vitest'

import { TaskProcessor } from 'leafer-test'


describe('Task', () => {


    test('empty', () => {
        const task = new TaskProcessor()
        expect(task.config.parallel).toBe(6)
    })


    test('config', async () => {
        let complete: boolean, error: boolean, tasked: boolean
        const task = new TaskProcessor({
            parallel: 3,
            onComplete() {
                complete = true
            },
            onError() {
                error = true
            },
            onTask() {
                tasked = true
            }
        })

        task.add(() => { })
        task.start()

        return new Promise(function (resolve) {
            setTimeout(() => {
                expect(task.config.parallel).toBe(3)
                expect(complete).toBeTruthy()
                expect(error).toBeFalsy()
                expect(tasked).toBeTruthy()
                resolve(true)
            }, 1)
        })
    })


    test('config', async () => {
        const task = new TaskProcessor()

        expect(task.isComplete).toBe(true)

        task.add(() => { }, { parallel: false })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { }, { parallel: false })
        task.add(() => { }, { parallel: false })
        task.add(() => { }, { parallel: false })
        task.add(() => { }, { parallel: false })
        task.add(() => { }, { parallel: false })
        task.add(() => { }, { parallel: false })

        task.start()

        expect(task.isComplete).toBe(false)
        expect(task.finishedIndex).toBe(0)
        expect(task.total).toBe(12)
        expect(task.remain).toBe(12)
        expect(task.percent).toBe(1 / 12)
        expect(task.running).toBe(true)

        return new Promise(function (resolve) {
            setTimeout(() => {
                expect(task.finishedIndex).toBe(0)
                expect(task.total).toBe(0)
                expect(task.remain).toBe(0)
                expect(task.percent).toBe(1)
                expect(task.isComplete).toBe(true)
                expect(task.running).toBe(false)
                resolve(true)
            }, 100)
        })
    })


    test('parallel', async () => {
        const task = new TaskProcessor()

        expect(task.isComplete).toBe(true)

        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })
        task.add(() => { })

        task.start()

        expect(task.isComplete).toBe(false)
        expect(task.finishedIndex).toBe(0)
        expect(task.total).toBe(12)
        expect(task.remain).toBe(12)
        expect(task.percent).toBe(1 / 12)
        expect(task.running).toBe(true)

        return new Promise(function (resolve) {
            setTimeout(() => {
                expect(task.finishedIndex).toBe(0)
                expect(task.total).toBe(0)
                expect(task.remain).toBe(0)
                expect(task.percent).toBe(1)
                expect(task.isComplete).toBe(true)
                expect(task.running).toBe(false)
                resolve(true)
            }, 20)
        })
    })


    test('add, then stop, then add', async () => {
        const task = new TaskProcessor()
        task.add(() => { })
        task.stop()

        task.add(() => { })

        expect(task.total).toBe(1)
        expect(task.remain).toBe(1)

        task.start()

        expect(task.total).toBe(1)
        expect(task.remain).toBe(1)
    })


})