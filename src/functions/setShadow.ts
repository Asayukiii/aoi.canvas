import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$setShadow",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", blur = "0", color = "#000000", offset ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        d.data.canvases?.get(canvas)?.setShadow(
            parseFloat(blur),
            color,
            (offset?.trim()?.startsWith("[") && offset?.trim().endsWith("]") ? JSON.parse(offset) : parseFloat(offset))
        )

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};