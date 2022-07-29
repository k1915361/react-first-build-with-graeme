// Imports
import { tableOfModules } from "../data/tableOfModules";

// Methods

const list = (req, res) => {
    // Validate request
    // Access data model
    // Response to request
    res.json(tableOfModules)
}

const controller = {}
controller.list = list

export default controller