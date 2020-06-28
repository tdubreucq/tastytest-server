import express, { Application} from 'express';
import indexRoutes from './routes/index';
import cors from 'cors'
import * as path from "path";
const app: Application = express();

if (process.env.MODE === 'PROD') {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

// Routes
app.use(indexRoutes);

app.listen(process.env.PORT || 4000);
console.log('Server on port', process.env.PORT);