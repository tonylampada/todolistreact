import {force_serial} from "../utils/force_serial_decorator";

async function timeout(ms) {
    return new Promise((resolve) => setTimeout(() => {
        resolve();
    }, ms));
}


const api = {
    async listAllTodos() {
        await timeout(500)
        return [{id: "abc", text: "foo"}, {id: "def", text: "bar"}, {id: "xyz", text: "foobar"}]
    },
    async save1(id, x) {
        console.log(`SAVING ${id} ${x}`)
        await timeout(5000)
        if (Math.random() < .5) {
            throw "backend error"
        }
        return {id, x}
    },
    save2(id, x){},
}

api.save2 = force_serial(api.save1)

export default api