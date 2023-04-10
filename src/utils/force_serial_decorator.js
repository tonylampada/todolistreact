
function force_serial(asyncf) {
    //states
    // - idle
    // running 1
    // running 1 with another in queue

    let currentCall = null;
    let nextCall = null;

    function makePromise(){
        let _resolve = null, _reject = null;
        const promise = new Promise((resolve, reject) => {
            _resolve = resolve
            _reject = reject
        })
        promise.resolve = _resolve
        promise.reject = _reject
        return promise
    }

    async function run(promise, args){
        try {
            const result = await asyncf(...args)
            promise.resolve(result)
            return result
        } catch (err) {
            promise.reject(err)
        } finally {
            removeCall(promise, args)
        }
    }

    function addCall(promise, args){
        // console.log(`addCall ${args}`)
        if (currentCall == null) { // 0 to 1
            if(nextCall != null) {
                console.error("fail sanity check: add(0,1)")
            }
            run(promise, args)
            currentCall = promise
        } else if (nextCall == null) { // 1 to 2
            nextCall = {promise, args}
        } else { // 2 to 10
            nextCall.promise.reject(`no need to call this anymore ${nextCall.args}`)
            nextCall = {promise, args}
        }
    }

    function removeCall(promise, args) {
        // console.log(`removeCall ${args}`)
        if (currentCall == null) {
            console.error("fail sanity check: remove(0,x)")
        } else if (nextCall == null) { // 1 to 0
            currentCall = null
        } else { // 2 to 1
            let runpromise = nextCall.promise, runargs = nextCall.args
            setTimeout(() => {run(runpromise, runargs)}, 0)
            currentCall = nextCall.promise
            nextCall = null
        }
    }

    async function wrapped(...args){
        let promise = makePromise()
        addCall(promise, args)
        try {
            const result = await promise
            return result
        } catch (err) {
            throw err
        }
        return promise
    }
    return wrapped
}

export default force_serial;