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
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize");
const learningPackage_model_1 = require("./learningPackage.model");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log('Ok, started!');
});
// app.put('/api/learning-package', (req: Request, res: Response) => {
//     let NewPackage = <LearningPackage> req.body;
//     const idOldPack = + req.params.id;
//
//     let foundPackage = learningPackages.find((pkg) => pkg.id === idOldPack);
//
//     learningPackages[idOldPack] = NewPackage;
//
//     if (foundPackage) {
//         res.status(200).send(NewPackage);
//     } else {
//         res.status(404).send({ error: `Entity not found for id: ${idOldPack}` });
//     }
// });
sequelize_1.default.models.LearningPackageModel = learningPackage_model_1.default;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.default.sync();
    console.log('Database synchronized');
}))();
app.get('/api/learning-package', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packages = yield learningPackage_model_1.default.findAll();
    res.send(packages);
}));
app.get('/api/learning-package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    const foundPackage = yield learningPackage_model_1.default.findByPk(idToFind);
    if (foundPackage) {
        res.status(200).send(foundPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
}));
app.post('/api/learning-package', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPackage = yield learningPackage_model_1.default.create(req.body);
        res.send(newPackage);
    }
    catch (error) {
        console.error('Error creating learning package:', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.put('/api/learning-package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    const updatedPackage = yield learningPackage_model_1.default.update(req.body, {
        where: { id: idToFind },
    });
    res.send(updatedPackage);
}));
app.delete('/api/learning-package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    try {
        const deletedPackage = yield learningPackage_model_1.default.destroy({
            where: { id: idToFind },
        });
        if (deletedPackage === 0) {
            res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
        }
        else {
            res.status(200).send("Deleted");
        }
    }
    catch (error) {
        console.error('Error deleting learning package:', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.get('/api/package-summaries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packages = yield learningPackage_model_1.default.findAll();
    // @ts-ignore
    let packageSummaries = packages.map(({ id, title }) => ({ id, title }));
    res.status(200).send(packageSummaries);
}));
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    try {
        const packages = yield learningPackage_model_1.default.findAll({
            where: {
                title: {
                    [sequelize_2.Op.like]: `%${query}%`
                }
            }
        });
        if (packages.length === 0) {
            res.status(404).send({ error: `No packages found for query: ${query}` });
        }
        else {
            res.status(200).send(packages);
        }
    }
    catch (error) {
        console.error('Error searching learning packages:', error);
        res.status(500).send('Internal Server Error');
    }
}));
//# sourceMappingURL=app.js.map