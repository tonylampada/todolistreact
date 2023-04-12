import axios from "axios";
import {force_serial} from "../utils/force_serial_decorator";
import { db } from "../firebase";

const api = {
    async listAllTodos() {
        const data = await db.collection("todos").get();
        const todos = data.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
        }));
        return todos
    },
    async save1(id, x) {
        return await axios.post("/api/longSave", {id, x})
    },
    save2(id, x){},
}

api.save2 = force_serial(api.save1)

export default api