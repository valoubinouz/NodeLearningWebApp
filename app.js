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
const categoryModel_1 = require("./categoryModel");
const cors = require("cors");
const courseModel_1 = require("./courseModel");
const questionModel_1 = require("./questionModel");
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log('Ok, started on port 3000!');
});
sequelize_1.default.models.CategoryModel = categoryModel_1.default;
sequelize_1.default.models.CourseModel = courseModel_1.default;
sequelize_1.default.models.QuestionModel = questionModel_1.default;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield categoryModel_1.default.sync();
    yield courseModel_1.default.sync();
    yield questionModel_1.default.sync();
    console.log('Database synchronized');
    const categoryCount = yield categoryModel_1.default.count();
    const courseCount = yield courseModel_1.default.count();
    const questionCount = yield questionModel_1.default.count();
    if (categoryCount === 0 || courseCount === 0 || questionCount === 0) {
        const categories = ['Math', 'Science', 'English', 'Art', 'Music', 'French', 'Other'];
        const categoryIT = yield categoryModel_1.default.create({
            title: 'Computer Science'
        });
        for (const category of categories) {
            yield categoryModel_1.default.create({ title: category });
        }
        const categoryHistory = yield categoryModel_1.default.create({
            title: 'History'
        });
        const ITcourses = ['Angular', 'React', 'Node', 'Next', 'MongoDB', 'SQL', 'Java', 'C++', 'Python'];
        const courseCSharp = yield courseModel_1.default.create({
            title: 'C#',
            category: categoryIT.id,
        });
        for (const course of ITcourses) {
            yield courseModel_1.default.create({ title: course, category: categoryIT.id });
        }
        const courseWWII = yield courseModel_1.default.create({
            title: 'World War II',
            category: categoryHistory.id
        });
        const courseWWI = yield courseModel_1.default.create({
            title: 'World War I',
            category: categoryHistory.id
        });
        yield questionModel_1.default.create({
            question: 'When did the World War II start?',
            answer: '1st September 1939 with the invasion of Poland',
            course: courseWWII.id,
        });
        yield questionModel_1.default.create({
            question: 'When did the World War II end?',
            answer: '2nd September 1945 with the surrender of Japan',
            course: courseWWII.id,
        });
        yield questionModel_1.default.create({
            question: 'When did the World War I start?',
            answer: '28th July 1914 with the assassination of Franz Ferdinand',
            course: courseWWI.id,
        });
        yield questionModel_1.default.create({
            question: 'What was the name of the Austrian annexation by Germany?',
            answer: 'Anschluss',
            course: courseWWII.id,
        });
        yield questionModel_1.default.create({
            question: 'What was the Japanese planes name ? ',
            answer: 'Zero (Mitsubishi A6M "Zero")',
            course: courseWWII.id,
        });
        yield questionModel_1.default.create({
            question: 'Which country made the first declaration of war?',
            answer: 'Austria-Hungary',
            course: courseWWI.id
        });
        yield questionModel_1.default.create({
            question: 'How to print to console?',
            answer: 'Console.WriteLine("Hello World!");',
            course: courseCSharp.id,
        });
        yield questionModel_1.default.create({
            question: 'How to declare an integer variable?',
            answer: 'int myVariable = 10;',
            course: courseCSharp.id,
        });
        yield questionModel_1.default.create({
            question: 'How to declare a string variable?',
            answer: 'string myVariable = "Hello World!";',
            course: courseCSharp.id,
        });
        yield questionModel_1.default.create({
            question: 'What is the difference between int and double?',
            answer: 'int is an integer, double is a floating point number',
            course: courseCSharp.id,
        });
        yield questionModel_1.default.create({
            question: 'How to declare a function?',
            answer: 'public void myFunction() {}',
            course: courseCSharp.id,
        });
        console.log('Data inserted');
    }
}))();
/**
 * Get all the categories (Computer Science, Math, etc.)
 */
app.get('/api/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packages = yield categoryModel_1.default.findAll();
    res.send(packages);
}));
/**
 * Get a category entity by id
 */
app.get('/api/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    const foundPackage = yield categoryModel_1.default.findByPk(idToFind);
    if (foundPackage) {
        res.status(200).send(foundPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
}));
/**
 * Get all courses from a category
 */
app.get('/api/courses-category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    const foundPackage = yield courseModel_1.default.findAll({
        where: {
            category: idToFind
        }
    });
    if (foundPackage) {
        res.status(200).send(foundPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
}));
/**
 * Get all courses from all categories
 */
app.get('/api/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packages = yield courseModel_1.default.findAll();
    res.send(packages);
}));
/**
 * Get only the id and title of all courses
 */
app.get('/api/courses-summary', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packages = yield courseModel_1.default.findAll();
    let packageSummaries = packages.map(({ id, title }) => ({ id, title }));
    res.status(200).send(packageSummaries);
}));
/**
 * Get a course entity by id
 */
app.get('/api/course/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    const foundPackage = yield courseModel_1.default.findByPk(idToFind);
    if (foundPackage) {
        res.status(200).send(foundPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
}));
/**
 * Get all questions from a course
 */
app.get('/api/questions-course/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    const foundPackage = yield questionModel_1.default.findAll({
        where: {
            course: idToFind
        }
    });
    if (foundPackage) {
        res.status(200).send(foundPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
}));
/**
 * Create a new question
 */
app.post('/api/question', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPackage = yield questionModel_1.default.create(req.body);
        // @ts-ignore
        if (newPackage === null || newPackage === undefined || newPackage === {}) {
            res.status(500).send('Internal Server Error');
        }
        else {
            res.send(newPackage);
        }
    }
    catch (error) {
        console.error('Error creating learning package:', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.get('/api/learning-package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    const foundPackage = yield categoryModel_1.default.findByPk(idToFind);
    if (foundPackage) {
        res.status(200).send(foundPackage);
    }
    else {
        res.status(404).send({ error: `Entity not found for id: ${idToFind}` });
    }
}));
app.post('/api/learning-package', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPackage = yield categoryModel_1.default.create(req.body);
        res.send(newPackage);
    }
    catch (error) {
        console.error('Error creating learning package:', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.put('/api/learning-package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    console.log(req.body);
    const updatedPackage = yield categoryModel_1.default.update(req.body, {
        where: { id: idToFind },
    });
    res.send(updatedPackage);
}));
app.delete('/api/learning-package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToFind = +req.params.id;
    try {
        const deletedPackage = yield categoryModel_1.default.destroy({
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
    const packages = yield categoryModel_1.default.findAll();
    // @ts-ignore
    let packageSummaries = packages.map(({ id, title }) => ({ id, title }));
    res.status(200).send(packageSummaries);
}));
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    try {
        const packages = yield categoryModel_1.default.findAll({
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