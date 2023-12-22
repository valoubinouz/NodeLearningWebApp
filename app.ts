import * as express from 'express';
import {Request, Response} from 'express';

import sequelize from './sequelize';
import {Op} from 'sequelize';
import LearningPackageModel from './learningPackage.model';
import cors = require('cors');

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


sequelize.models.LearningPackageModel = LearningPackageModel;

(async () => {
    await sequelize.sync();
    console.log('Database synchronized');
})();


app.get('/api/learning-package', async (req: Request, res: Response) => {
    const packages = await LearningPackageModel.findAll();
    res.send(packages);
});

app.get('/api/learning-package/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    const foundPackage = await LearningPackageModel.findByPk(idToFind);

    if (foundPackage) {
        res.status(200).send(foundPackage);
    } else {
        res.status(404).send({error: `Entity not found for id: ${idToFind}`});
    }
});

app.post('/api/learning-package', async (req: Request, res: Response) => {
    try {
        const newPackage = await LearningPackageModel.create(req.body);
        res.send(newPackage);
    } catch (error) {
        console.error('Error creating learning package:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/api/learning-package/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;

    const updatedPackage = await LearningPackageModel.update(req.body, {
        where: {id: idToFind},
    });
    res.send(updatedPackage);
});

app.delete('/api/learning-package/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    try {
        const deletedPackage = await LearningPackageModel.destroy({
            where: {id: idToFind},
        });
        if (deletedPackage === 0) {
            res.status(404).send({error: `Entity not found for id: ${idToFind}`});
        } else {
            res.status(200).send("Deleted");
        }
    } catch (error) {
        console.error('Error deleting learning package:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/package-summaries', async (req: Request, res: Response) => {
    const packages = await LearningPackageModel.findAll();
    // @ts-ignore
    let packageSummaries = packages.map(({id, title}) => ({id, title}));
    res.status(200).send(packageSummaries);
});

app.get('/api/search', async (req: Request, res: Response) => {
    const query = req.query.q;

    try {
        const packages = await LearningPackageModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${query}%`
                }
            }
        });
        if (packages.length === 0) {
            res.status(404).send({error: `No packages found for query: ${query}`});
        } else {
            res.status(200).send(packages);
        }
    } catch (error) {
        console.error('Error searching learning packages:', error);
        res.status(500).send('Internal Server Error');
    }
});