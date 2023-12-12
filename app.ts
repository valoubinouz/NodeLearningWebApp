import * as express from 'express';
import { Request, Response} from 'express';
import LearningPackage from './learningPackage.interface'; // Import the interface


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

let learningPackages: LearningPackage[] = [
    { id: newId(), title: "Learn TypeScript" },
    { id: newId(), title: "learn NodeJs" },
    { id: newId(), title: "Learn Html" },
    { id: newId(), title: "Learn Angular" }

    // ...
];

app.get('/api/liveness', (req: Request, res: Response) => {
    res.send('OK !!!');
});



//Step 8: Declare a route GET “/api/package” GET PACKAGE
app.get('/api/learning-package', (req: Request, res: Response) => {
    res.send(learningPackages);
});


//Step 9: Declare a route GET “/api/package/:id” GET ID
app.get('/api/learning-package/:id', (req: Request, res: Response) => {
    const idToFind = + req.params.id;

    const foundPackage = learningPackages.find((pkg) => pkg.id === idToFind);

    if (foundPackage) {
        res.status(200).send(foundPackage);
    } else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
});

//Step 10: Declare a route POST “/api/package” CREATE NEW
app.post('/api/learning-package', (req: Request, res: Response) => {

    let item = <LearningPackage> req.body;
    console.log('handle http POST /api/learning-package', item);
    item.id = newId();
    learningPackages.push(item);
    res.send(item);
});


//Step 11: Declare a route PUT “/api/package” UPDATE
app.put('/api/learning-package', (req: Request, res: Response) => {
    let NewPackage = <LearningPackage> req.body;
    const idOldPack = + req.params.id;

    let foundPackage = learningPackages.find((pkg) => pkg.id === idOldPack);

    learningPackages[idOldPack] = NewPackage;

    if (foundPackage) {
        res.status(200).send(NewPackage);
    } else {
        res.status(404).send({ error: `Entity not found for id: ${idOldPack}` });
    }
});

//Step 12: Declare a route GET “/api/package-summaries”

app.get('/api/package-summaries', (req: Request, res: Response) => {
    // Extract only the 'id' and 'title' fields from each LearningPackage
    let packageSummaries = learningPackages.map(({ id, title }) => ({ id, title }));

    // Respond with the package summaries
    res.status(200).send(packageSummaries);
});

//Sequelize STEP 17


import sequelize from './sequelize'; // Import your Sequelize configuration
import LearningPackageModel from './learningPackage.model'; // Import the LearningPackage model

// Add the models to Sequelize
sequelize.models.LearningPackageModel = LearningPackageModel;

(async () => {
    await sequelize.sync(); // This creates the "LearningPackage" table if it doesn't exist
    console.log('Database synchronized');
})();

