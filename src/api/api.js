import axios from "axios";
import force_serial from "../utils/force_serial_decorator";

const api = {
    async save1(x) {
        return await axios.post("/api/longSave", {x})
    },
    save2(x){},
}

api.save2 = force_serial(api.save1)

export default api