"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"
console.log('starting...');
app.listen(3002, () => {
    console.log('Ok, started!');
});
let idGenerator = 1;
function newId() {
    return idGenerator++;
}
let learningPackages = [
    { id: newId(), title: "Learn TypeScript" },
    { id: newId(), title: "learn NodeJs" },
    { id: newId(), title: "Learn Html" },
    { id: newId(), title: "Learn Angular" }
    // ...
];
app.get('/api/liveness', (req, res) => {
    res.send('OK !!!');
});
//Step 8: Declare a route GET “/api/package” GET PACKAGE
app.get('/api/learning-package', (req, res) => {
    res.send(learningPackages);
});
//Step 9: Declare a route GET “/api/package/:id” GET ID
app.get('/api/learning-package/:id', (req, res) => {
    const idToFind = +req.params.id;
    const foundPackage = learningPackages.find((pkg) => pkg.id === idToFind);
    if (foundPackage) {
        res.status(200).send(foundPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
});
//Step 10: Declare a route POST “/api/package” CREATE NEW
app.post('/api/learning-package', (req, res) => {
    let item = req.body;
    console.log('handle http POST /api/learning-package', item);
    item.id = newId();
    learningPackages.push(item);
    res.send(item);
});
//Step 11: Declare a route PUT “/api/package” UPDATE
app.put('/api/learning-package', (req, res) => {
    let NewPackage = req.body;
    const idOldPack = +req.params.id;
    let foundPackage = learningPackages.find((pkg) => pkg.id === idOldPack);
    learningPackages[idOldPack] = NewPackage;
    if (foundPackage) {
        res.status(200).send(NewPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idOldPack}` });
    }
});
//Step 12: Declare a route GET “/api/package-summaries”
app.get('/api/package-summaries', (req, res) => {
    // Extract only the 'id' and 'title' fields from each LearningPackage
    let packageSummaries = learningPackages.map(({ id, title }) => ({ id, title }));
    // Respond with the package summaries
    res.status(200).send(packageSummaries);
});
//Sequelize STEP 17
const sequelize_1 = require("./sequelize"); // Import your Sequelize configuration
const learningPackage_model_1 = require("./learningPackage.model"); // Import the LearningPackage model
// Add the models to Sequelize
sequelize_1.default.models.LearningPackageModel = learningPackage_model_1.default;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.default.sync(); // This creates the "LearningPackage" table if it doesn't exist
    console.log('Database synchronized');
}))();
//# sourceMappingURL=app.js.map