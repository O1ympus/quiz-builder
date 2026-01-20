import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db, { Quiz, Question } from './models';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser. json());

app.get('/quizzes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const quiz = await Quiz.findByPk(id, {
            include: [Question],
        });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const formattedQuiz:  any = quiz.toJSON();

        if (formattedQuiz.Questions) {
            formattedQuiz.Questions = formattedQuiz.Questions. map((q: any) => ({
                ... q,
                options: q. options ?  JSON.parse(q.options) : null,
            }));
        }

        console.log('Fetching quiz:', id);
        res.status(200).json(formattedQuiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
});

app.get('/quizzes', async (req, res) => {
    try {
        console.log('Fetching all quizzes');

        const quizzes = await Quiz.findAll({
            include: [
                {
                    model: Question,
                    attributes: ['id'],
                },
            ],
        });

        const formattedQuizzes = quizzes.map((quiz: any) => {
            const quizData = quiz.toJSON();
            return {
                id: quizData.id,
                title: quizData.title,
                questionCount: quizData.Questions ?  quizData.Questions.length :  0,
                Questions: quizData.Questions,
            };
        });

        console.log('Total quizzes:', formattedQuizzes.length);
        res.status(200).json(formattedQuizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
});

app.post('/quizzes', async (req, res) => {
    try {
        console.log('=== Creating New Quiz ===');
        console.log('Request Body:', JSON.stringify(req.body, null, 2));

        const { title, questions } = req.body;

        if (!title || ! title.trim()) {
            return res.status(400).json({ message: 'Quiz title is required' });
        }

        const quiz = await Quiz. create({ title });
        console.log('Quiz created with ID:', quiz.id);

        if (questions && Array.isArray(questions)) {
            for (const q of questions) {
                console.log('Processing question:', q);

                const questionData:  any = {
                    quizId: quiz.id,
                    type: q.type,
                    content: q.content,
                    options: null,
                };

                if (q.type === 'CHECKBOX') {
                    let optionsArray: string[] = [];

                    if (typeof q.options === 'string') {
                        optionsArray = q.options
                            .split(',')
                            .map((opt: string) => opt.trim())
                            .filter((opt: string) => opt.length > 0);
                    } else if (Array.isArray(q.options)) {
                        optionsArray = q.options. filter((opt: string) => opt && opt.trim());
                    }

                    questionData.options = JSON.stringify(optionsArray);
                    console.log('Processed CHECKBOX options:', optionsArray);
                }

                await Question.create(questionData);
            }
        }

        const createdQuiz = await Quiz.findByPk(quiz.id, {
            include: [Question],
        });

        console.log('Quiz created successfully with', questions?. length || 0, 'questions');
        console.log('========================\n');

        res.status(201).json({
            message: 'Quiz created successfully! ',
            data: createdQuiz
        });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Error creating quiz', error });
    }
});

app.delete('/quizzes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params. id);
        const quiz = await Quiz.findByPk(id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        await Question.destroy({ where: { quizId: id } });

        await quiz.destroy();

        console.log('Deleted quiz:', id);
        res.status(200).json({ message: 'Quiz deleted successfully!' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: 'Error deleting quiz', error });
    }
});

const PORT = 5001;

const startServer = async () => {
    try {
        await db.sequelize.sync();
        console.log('✓ Database connected and synchronized');

        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ Backend ready to accept requests from http://localhost:3000`);
            console.log('---');
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();