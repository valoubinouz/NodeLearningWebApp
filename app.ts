import * as express from 'express';
import {Request, Response} from 'express';

import sequelize from './sequelize';
import {Op} from 'sequelize';
import CategoryModel from './categoryModel';
import cors = require('cors');
import CourseModel from "./courseModel";
import QuestionModel from "./questionModel";

const app = express();

app.use(cors());

app.use(express.json());
app.listen(3000, () => {
    console.log('Ok, started on port 3000!');
});

sequelize.models.CategoryModel = CategoryModel;
sequelize.models.CourseModel = CourseModel;
sequelize.models.QuestionModel = QuestionModel;

(async () => {
    await CategoryModel.sync();
    await CourseModel.sync();
    await QuestionModel.sync();
    console.log('Database synchronized');

    const categoryCount = await CategoryModel.count();
    const courseCount = await CourseModel.count();
    const questionCount = await QuestionModel.count();

    if (categoryCount === 0 || courseCount === 0 || questionCount === 0) {

        const categories = ['Math', 'Science', 'English', 'Art', 'Music', 'French', 'Other'];

        const categoryIT = await CategoryModel.create({
            title: 'Computer Science'
        }) as any;

        for (const category of categories) {

            await CategoryModel.create({title: category});
        }

        const categoryHistory = await CategoryModel.create({
            title: 'History'
        }) as any;

        const ITcourses = ['Angular', 'React', 'Node', 'Next', 'MongoDB', 'SQL', 'Java', 'C++', 'Python'];

        const courseCSharp = await CourseModel.create({
            title: 'C#',
            category: categoryIT.id,
        }) as any;

        for (const course of ITcourses) {
            await CourseModel.create({title: course, category: categoryIT.id});
        }

        const courseWWII = await CourseModel.create({
            title: 'World War II',
            category: categoryHistory.id
        }) as any;

        const courseWWI = await CourseModel.create({
            title: 'World War I',
            category: categoryHistory.id
        }) as any;

        await QuestionModel.create({
            question: 'When did the World War II start?',
            answer: '1st September 1939 with the invasion of Poland',
            course: courseWWII.id,
        });

        await QuestionModel.create({
            question: 'When did the World War II end?',
            answer: '2nd September 1945 with the surrender of Japan',
            course: courseWWII.id,
        });

        await QuestionModel.create({
            question: 'When did the World War I start?',
            answer: '28th July 1914 with the assassination of Franz Ferdinand',
            course: courseWWI.id,
        });

        await QuestionModel.create({
            question: 'What was the name of the Austrian annexation by Germany?',
            answer: 'Anschluss',
            course: courseWWII.id,
        });

        await QuestionModel.create({
            question: 'What was the Japanese planes name ? ',
            answer: 'Zero (Mitsubishi A6M "Zero")',
            course: courseWWII.id,
        });

        await QuestionModel.create({
            question: 'Which country made the first declaration of war?',
            answer: 'Austria-Hungary',
            course: courseWWI.id
        });

        await QuestionModel.create({
            question: 'How to print to console?',
            answer: 'Console.WriteLine("Hello World!");',
            course: courseCSharp.id,
        });

        await QuestionModel.create({
            question: 'How to declare an integer variable?',
            answer: 'int myVariable = 10;',
            course: courseCSharp.id,
        });

        await QuestionModel.create({
            question: 'How to declare a string variable?',
            answer: 'string myVariable = "Hello World!";',
            course: courseCSharp.id,
        });

        await QuestionModel.create({
            question: 'What is the difference between int and double?',
            answer: 'int is an integer, double is a floating point number',
            course: courseCSharp.id,
        });

        await QuestionModel.create({
            question: 'How to declare a function?',
            answer: 'public void myFunction() {}',
            course: courseCSharp.id,
        });

        console.log('Data inserted');
    }
})();

/**
 * Get all the categories (Computer Science, Math, etc.)
 */
app.get('/api/categories', async (req: Request, res: Response) => {
    const packages = await CategoryModel.findAll();
    res.send(packages);
});
/**
 * Get a category entity by id
 */
app.get('/api/category/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    const foundPackage = await CategoryModel.findByPk(idToFind);

    if (foundPackage) {
        res.status(200).send(foundPackage);
    } else {
        res.status(404).send({error: `Entity not found for id: ${idToFind}`});
    }

});
/**
 * Get all courses from a category
 */
app.get('/api/courses-category/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    const foundPackage = await CourseModel.findAll(
        {
            where: {
                category: idToFind
            }
        }
    )

    if (foundPackage) {
        res.status(200).send(foundPackage);
    } else {
        res.status(404).send({error: `Entity not found for id: ${idToFind}`});
    }
});
/**
 * Get all courses from all categories
 */
app.get('/api/courses', async (req: Request, res: Response) => {
    const packages = await CourseModel.findAll();
    res.send(packages);
});
/**
 * Get only the id and title of all courses
 */
app.get('/api/courses-summary', async (req: Request, res: Response) => {
    const packages = await CourseModel.findAll() as any;
    let packageSummaries = packages.map(({id, title}) => ({id, title}));
    res.status(200).send(packageSummaries);
});
/**
 * Get a course entity by id
 */
app.get('/api/course/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    const foundPackage = await CourseModel.findByPk(idToFind);

    if (foundPackage) {
        res.status(200).send(foundPackage);
    } else {
        res.status(404).send({error: `Entity not found for id: ${idToFind}`});
    }
});
/**
 * Get all questions from a course
 */
app.get('/api/questions-course/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    const foundPackage = await QuestionModel.findAll(
        {
            where: {
                course: idToFind
            }
        }
    )

    if (foundPackage) {
        res.status(200).send(foundPackage);
    } else {
        res.status(404).send({error: `Entity not found for id: ${idToFind}`});
    }
});
/**
 * Create a new question
 */
app.post('/api/question', async (req: Request, res: Response) => {
    try {
        const newPackage = await QuestionModel.create(req.body);
        // @ts-ignore
        if(newPackage === null || newPackage === undefined || newPackage === {}){
            res.status(500).send('Internal Server Error');
        } else {
            res.send(newPackage);
        }
    } catch (error) {
        console.error('Error creating learning package:', error);
        res.status(500).send('Internal Server Error');
    }
});







app.get('/api/learning-package/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    const foundPackage = await CategoryModel.findByPk(idToFind);

    if (foundPackage) {
        res.status(200).send(foundPackage);
    } else {
        res.status(404).send({error: `Entity not found for id: ${idToFind}`});
    }
});

app.post('/api/learning-package', async (req: Request, res: Response) => {
    try {
        const newPackage = await CategoryModel.create(req.body);
        res.send(newPackage);
    } catch (error) {
        console.error('Error creating learning package:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/api/learning-package/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    console.log(req.body);

    const updatedPackage = await CategoryModel.update(req.body, {
        where: {id: idToFind},
    });
    res.send(updatedPackage);
});

app.delete('/api/learning-package/:id', async (req: Request, res: Response) => {
    const idToFind = +req.params.id;
    try {
        const deletedPackage = await CategoryModel.destroy({
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
    const packages = await CategoryModel.findAll();
    // @ts-ignore
    let packageSummaries = packages.map(({id, title}) => ({id, title}));
    res.status(200).send(packageSummaries);
});

app.get('/api/search', async (req: Request, res: Response) => {
    const query = req.query.q;

    try {
        const packages = await CategoryModel.findAll({
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