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
        const categories = [
            'Math', 'Science', 'English', 'Art', 'Music', 'French', 'Other', 'Computer Science', 'History'
        ];
        const courses = {
            'Computer Science': ['Angular', 'React', 'Node', 'Next', 'MongoDB', 'SQL', 'Java', 'C++', 'Python', 'C#'],
            'History': ['World War II', 'World War I'],
            'Math': ['Vectors', 'Functions', 'Geometry'],
            'Science': ['Biology', 'Chemistry', 'Physics'],
            'English': ['English Literature', 'English Grammar', 'Creative Writing'],
            'Art': ['Art History', 'Drawing Techniques', 'Painting and Sculpture'],
            'Music': ['Music Theory', 'Music History', 'Instrumental Practice'],
            'French': ['French Literature', 'French Grammar', 'French Conversation'],
            'Other': ['Philosophy', 'Psychology', 'Sociology'],
        };
        const questions = {
            // Computer Science courses
            'Angular': [
                { question: 'What is Angular?', answer: 'Angular is an open-source front-end web framework.' },
                { question: 'What is the difference between Angular and AngularJS?', answer: 'Angular is a complete rewrite of AngularJS.' },
                { question: 'What is TypeScript?', answer: 'TypeScript is a superset of JavaScript.' }
            ],
            'React': [
                { question: 'What is React?', answer: 'React is an open-source front-end JavaScript library.' },
                { question: 'What is the difference between React and React Native?', answer: 'React is a JavaScript library, while React Native is a framework.' },
                { question: 'What is JSX?', answer: 'JSX is a syntax extension to JavaScript.' }
            ],
            'Node': [
                { question: 'What is Node.js?', answer: 'Node.js is an open-source, cross-platform, JavaScript runtime environment.' },
                { question: 'What is the difference between Node.js and JavaScript?', answer: 'Node.js is a runtime environment for JavaScript, while JavaScript is a programming language.' },
                { question: 'What is npm?', answer: 'npm is a package manager for the JavaScript programming language.' }
            ],
            'Next': [
                { question: 'What is Next.js?', answer: 'Next.js is an open-source React front-end development web framework.' },
                { question: 'What is the difference between Next.js and React?', answer: 'Next.js is a framework, while React is a library.' },
                { question: 'What is SSR?', answer: 'SSR stands for Server-Side Rendering.' }
            ],
            'MongoDB': [
                { question: 'What is MongoDB?', answer: 'MongoDB is a cross-platform document-oriented database program.' },
                { question: 'What is the difference between MongoDB and SQL?', answer: 'MongoDB is a NoSQL database, while SQL is a relational database.' },
                { question: 'What is a document in MongoDB?', answer: 'A document is a set of key-value pairs.' }
            ],
            'SQL': [
                { question: 'What is SQL?', answer: 'SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system.' },
                { question: 'What is the difference between SQL and MySQL?', answer: 'SQL is a language, while MySQL is a database management system.' },
                { question: 'What is a database?', answer: 'A database is an organized collection of data.' }
            ],
            'Java': [
                { question: 'What is Java?', answer: 'Java is a general-purpose programming language.' },
                { question: 'What is the difference between Java and JavaScript?', answer: 'Java is a programming language, while JavaScript is a scripting language.' },
                { question: 'What is the difference between Java and C++?', answer: 'Java is an object-oriented programming language, while C++ is a general-purpose programming language.' }
            ],
            'C++': [
                { question: 'What is C++?', answer: 'C++ is a general-purpose programming language.' },
                { question: 'What is the difference between C and C++?', answer: 'C++ is a superset of C.' },
                { question: 'What is the difference between C++ and Java?', answer: 'C++ is a general-purpose programming language, while Java is an object-oriented programming language.' }
            ],
            'Python': [
                { question: 'What is Python?', answer: 'Python is an interpreted, high-level, general-purpose programming language.' },
                { question: 'What is the difference between Python 2 and Python 3?', answer: 'Python 3 is the successor of Python 2.' },
                { question: 'What is the difference between Python and Java?', answer: 'Python is an interpreted language, while Java is a compiled language.' }
            ],
            'C#': [
                { question: 'How to print to console?', answer: 'Console.WriteLine("Hello World!");' },
                { question: 'How to declare an integer variable?', answer: 'int myVariable = 10;' },
            ],
            'World War II': [
                { question: 'When did the World War II start?', answer: '1st September 1939 with the invasion of Poland' },
                { question: 'When did the World War II end?', answer: '2nd September 1945 with the surrender of Japan' },
                { question: 'What was the name of the Austrian annexation by Germany?', answer: 'Anschluss' },
                { question: 'What was the Japanese planes name?', answer: 'Zero (Mitsubishi A6M "Zero")' }
            ],
            'World War I': [
                { question: 'When did the World War I start?', answer: '28th July 1914 with the assassination of Franz Ferdinand' },
                { question: 'Which country made the first declaration of war?', answer: 'Austria-Hungary' }
            ],
            'Vectors': [
                { question: 'What is a vector?', answer: 'A vector is a mathematical object that has both a magnitude and a direction.' },
                { question: 'How do you add two vectors?', answer: 'Two vectors are added by combining their corresponding components.' },
                { question: 'What is a dot product?', answer: 'The dot product is an operation that takes two vectors and returns a scalar.' }
            ],
            'Functions': [
                { question: 'What is a function in mathematics?', answer: 'A function is a relation between a set of inputs and a set of possible outputs with each input being associated with exactly one output.' },
                { question: 'How do you determine the slope of a linear function?', answer: 'The slope of a linear function is the coefficient of x in the equation of the form y = mx + b.' },
                { question: 'What is an exponential function?', answer: 'An exponential function is a function of the form f(x) = a * b^x, where b is a positive constant other than 1.' }
            ],
            'Geometry': [
                { question: 'What is the Pythagorean theorem?', answer: 'The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.' },
                { question: 'How do you calculate the area of a circle?', answer: 'The area of a circle is calculated using the formula A = π * r^2, where r is the radius of the circle.' },
                { question: 'What is the difference between a regular and an irregular polygon?', answer: 'A regular polygon has all sides and angles equal, while an irregular polygon does not have this characteristic.' }
            ],
            // Science courses
            'Biology': [
                { question: 'What is the basic unit of life?', answer: 'The cell is the basic unit of life.' },
                { question: 'What is photosynthesis?', answer: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.' },
                { question: 'What is the theory of evolution?', answer: 'The theory of evolution postulates that all species of organisms arise and develop through the natural selection of small, inherited variations that increase the individual\'s ability to compete, survive, and reproduce.' }
            ],
            'Chemistry': [
                { question: 'What is a chemical element?', answer: 'A chemical element is a species of atoms having the same number of protons in their atomic nuclei.' },
                { question: 'What is a chemical reaction?', answer: 'A chemical reaction is a process that leads to the chemical transformation of one set of chemical substances to another.' },
                { question: 'What is the law of conservation of mass?', answer: 'The law of conservation of mass states that for any system closed to all transfers of matter and energy, the mass of the system must remain constant over time.' }
            ],
            'Physics': [
                { question: 'What is Newton\'s second law of motion?', answer: 'Newton\'s second law of motion states that the acceleration of an object is directly proportional to the net force acting upon the object and inversely proportional to the object\'s mass.' },
                { question: 'What is the theory of relativity?', answer: 'The theory of relativity, developed by Albert Einstein, comprises two theories: special relativity and general relativity. It deals with the relationship between space and time, and how objects in motion behave in relation to each other.' },
                { question: 'What is quantum mechanics?', answer: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.' }
            ],
            // English courses
            'English Literature': [
                { question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare wrote "Romeo and Juliet".' },
                { question: 'What is a theme in literature?', answer: 'A theme is a central topic, subject, or message within a narrative.' },
                { question: 'What is the significance of the stream-of-consciousness technique?', answer: 'The stream-of-consciousness technique is used to depict the multitudinous thoughts and feelings which pass through the mind.' }
            ],
            'English Grammar': [
                { question: 'What is the difference between "your" and "you’re"?', answer: '"Your" is a possessive adjective, while "you’re" is a contraction for "you are".' },
                { question: 'What is a predicate in a sentence?', answer: 'The predicate is the part of a sentence containing a verb and stating something about the subject.' },
                { question: 'What is a gerund?', answer: 'A gerund is a verb form that functions as a noun, ending in -ing.' }
            ],
            'Creative Writing': [
                { question: 'What is a metaphor?', answer: 'A metaphor is a figure of speech that, for rhetorical effect, directly refers to one thing by mentioning another.' },
                { question: 'What are the elements of a plot?', answer: 'The elements of a plot include the exposition, rising action, climax, falling action, and resolution.' },
                { question: 'What is the point of view in storytelling?', answer: 'The point of view in storytelling refers to the perspective from which a story is told, such as first person, second person, or third person.' }
            ],
            // Art courses
            'Art History': [
                { question: 'What is the Renaissance art movement?', answer: 'The Renaissance was a period in European history marking the transition from the Middle Ages to modernity and characterized by an interest in reviving the culture of classical antiquity.' },
                { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci painted the Mona Lisa.' },
                { question: 'What is Impressionism?', answer: 'Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light, ordinary subject matter, and inclusion of movement.' }
            ],
            'Drawing Techniques': [
                { question: 'What is perspective in drawing?', answer: 'Perspective is a technique used to represent three-dimensional objects on a two-dimensional surface.' },
                { question: 'What is hatching and cross-hatching?', answer: 'Hatching and cross-hatching are drawing techniques used to create tonal or shading effects with closely spaced parallel lines.' },
                { question: 'What is the difference between sketching and drawing?', answer: 'Sketching is a freehand drawing that is not usually intended as a finished work, while drawing can be a complete, detailed, and precise piece of artwork.' }
            ],
            'Painting and Sculpture': [
                { question: 'What is the color wheel?', answer: 'The color wheel is a circular diagram of colors that helps to show the relationships between colors.' },
                { question: 'What are the primary colors for additive color mixing?', answer: 'The primary colors for additive color mixing are red, green, and blue.' },
                { question: 'What is sculpture?', answer: 'Sculpture is the art of making two- or three-dimensional representative or abstract forms, especially by carving stone or wood or by casting metal or plaster.' }
            ],
            // Music courses
            'Music Theory': [
                { question: 'What are the basic elements of music?', answer: 'The basic elements of music include melody, harmony, rhythm, and dynamics.' },
                { question: 'What is harmony in music?', answer: 'Harmony in music is the combination of simultaneously sounded musical notes to produce chords and chord progressions having a pleasing effect.' },
                { question: 'What is a musical scale?', answer: 'A musical scale is a series of notes that are ordered by pitch or frequency, with each note called a scale degree.' }
            ],
            'Music History': [
                { question: 'Who was Ludwig van Beethoven?', answer: 'Ludwig van Beethoven was a German composer and pianist, widely considered to be one of the greatest musical geniuses who ever lived.' },
                { question: 'What is Gregorian Chant?', answer: 'Gregorian Chant is a style of plainchant used in the liturgical music of the Roman Catholic Church.' },
                { question: 'What was the Baroque period in music?', answer: 'The Baroque period was an era in the history of Western music roughly extending from 1600 to1750, characterized by dramatic, highly detailed, and ornamented music.' },
            ],
            'Instrumental Practice': [
                { question: 'How often should you practice a musical instrument for the best results?', answer: 'Regular daily practice, with focused goals, is recommended for the best results.' },
                { question: 'What is the proper way to maintain a piano?', answer: 'Regular tuning, cleaning, and avoiding extreme changes in humidity and temperature are key to maintaining a piano.' },
                { question: 'How can a metronome help a musician?', answer: 'A metronome can help a musician keep a steady tempo and improve their rhythmic accuracy.' }
            ],
            // French courses
            'French Literature': [
                { question: 'Who wrote "Les Misérables"?', answer: 'Victor Hugo wrote "Les Misérables".' },
                { question: 'What is a sonnet?', answer: 'A sonnet is a poem of fourteen lines using any of a number of formal rhyme schemes.' },
                { question: 'What is a haiku?', answer: 'A haiku is a Japanese poem of seventeen syllables, in three lines of five, seven, and five.' }
            ],
            'French Grammar': [
                { question: 'What is the difference between "tu" and "vous"?', answer: '"Tu" is the informal singular form of "you", while "vous" is the formal singular and plural form of "you".' },
                { question: 'What is a reflexive verb?', answer: 'A reflexive verb is a verb whose direct object is the same as its subject.' },
                { question: 'What is the difference between "il" and "elle"?', answer: '"Il" is the masculine form of "he", while "elle" is the feminine form of "she".' }
            ],
            'French Conversation': [
                { question: 'What is the difference between "bonjour" and "bonsoir"?', answer: '"Bonjour" is used as a greeting during the day, while "bonsoir" is used as a greeting in the evening.' },
                { question: 'What is the difference between "au revoir" and "à bientôt"?', answer: '"Au revoir" is used to say goodbye, while "à bientôt" is used to say see you soon.' },
                { question: 'What is the difference between "merci" and "merci beaucoup"?', answer: '"Merci" means "thank you", while "merci beaucoup" means "thank you very much".' }
            ],
            // Other courses
            'Philosophy': [
                { question: 'What is the meaning of life?', answer: 'The meaning of life is a philosophical question concerning the significance of life or existence in general.' },
                { question: 'What is the difference between knowledge and wisdom?', answer: 'Knowledge is the accumulation of facts and information, while wisdom is the ability to discern and judge which aspects of that knowledge are true, right, lasting, and applicable to your life.' },
                { question: 'What is the difference between good and evil?', answer: 'Good is that which is morally right, while evil is that which is morally wrong.' }
            ],
            'Psychology': [
                { question: 'What is the difference between nature and nurture?', answer: 'Nature is the influence of genetics and hereditary factors, while nurture is the influence of environment and surroundings.' },
                { question: 'What is the difference between the conscious and the unconscious mind?', answer: 'The conscious mind consists of everything inside of our awareness, while the unconscious mind consists of everything outside of our awareness.' },
                { question: 'What is the difference between cognition and emotion?', answer: 'Cognition is the mental process of acquiring knowledge, while emotion is the mental state associated with the nervous system.' }
            ],
            'Sociology': [
                { question: 'What is the difference between a stereotype and a prejudice?', answer: 'A stereotype is a belief about a group of people, while a prejudice is an attitude towards a group of people.' },
                { question: 'What is the difference between a culture and a subculture?', answer: 'A culture is a group of people with shared beliefs, while a subculture is a group of people within a culture that differentiates itself from the parent culture to which it belongs.' },
                { question: 'What is the difference between a norm and a value?', answer: 'A norm is a standard of behavior, while a value is a principle or standard of behavior.' }
            ],
        };
        for (const categoryTitle of categories) {
            const category = yield categoryModel_1.default.create({ title: categoryTitle });
            if (courses[categoryTitle]) {
                for (const courseTitle of courses[categoryTitle]) {
                    const course = yield courseModel_1.default.create({
                        title: courseTitle,
                        category: category.id,
                    });
                    if (questions[courseTitle]) {
                        for (const questionData of questions[courseTitle]) {
                            yield questionModel_1.default.create({
                                question: questionData.question,
                                answer: questionData.answer,
                                course: course.id,
                            });
                        }
                    }
                }
            }
        }
        console.log('Data inserted');
        // const categories = ['Math', 'Science', 'English', 'Art', 'Music', 'French', 'Other'];
        //
        // const categoryIT = await CategoryModel.create({
        //     title: 'Computer Science'
        // }) as any;
        //
        // for (const category of categories) {
        //
        //     await CategoryModel.create({title: category});
        // }
        //
        // const categoryHistory = await CategoryModel.create({
        //     title: 'History'
        // }) as any;
        //
        // const ITcourses = ['Angular', 'React', 'Node', 'Next', 'MongoDB', 'SQL', 'Java', 'C++', 'Python'];
        //
        // const courseCSharp = await CourseModel.create({
        //     title: 'C#',
        //     category: categoryIT.id,
        // }) as any;
        //
        // for (const course of ITcourses) {
        //     await CourseModel.create({title: course, category: categoryIT.id});
        // }
        //
        // const courseWWII = await CourseModel.create({
        //     title: 'World War II',
        //     category: categoryHistory.id
        // }) as any;
        //
        // const courseWWI = await CourseModel.create({
        //     title: 'World War I',
        //     category: categoryHistory.id
        // }) as any;
        //
        // await QuestionModel.create({
        //     question: 'When did the World War II start?',
        //     answer: '1st September 1939 with the invasion of Poland',
        //     course: courseWWII.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'When did the World War II end?',
        //     answer: '2nd September 1945 with the surrender of Japan',
        //     course: courseWWII.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'When did the World War I start?',
        //     answer: '28th July 1914 with the assassination of Franz Ferdinand',
        //     course: courseWWI.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'What was the name of the Austrian annexation by Germany?',
        //     answer: 'Anschluss',
        //     course: courseWWII.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'What was the Japanese planes name ? ',
        //     answer: 'Zero (Mitsubishi A6M "Zero")',
        //     course: courseWWII.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'Which country made the first declaration of war?',
        //     answer: 'Austria-Hungary',
        //     course: courseWWI.id
        // });
        //
        // await QuestionModel.create({
        //     question: 'How to print to console?',
        //     answer: 'Console.WriteLine("Hello World!");',
        //     course: courseCSharp.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'How to declare an integer variable?',
        //     answer: 'int myVariable = 10;',
        //     course: courseCSharp.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'How to declare a string variable?',
        //     answer: 'string myVariable = "Hello World!";',
        //     course: courseCSharp.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'What is the difference between int and double?',
        //     answer: 'int is an integer, double is a floating point number',
        //     course: courseCSharp.id,
        // });
        //
        // await QuestionModel.create({
        //     question: 'How to declare a function?',
        //     answer: 'public void myFunction() {}',
        //     course: courseCSharp.id,
        // });
        //
        // console.log('Data inserted');
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