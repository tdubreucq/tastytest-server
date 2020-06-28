import express, { Application} from 'express';
import indexRoutes from './routes/index';
import cors from 'cors'
const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

// Routes
app.use(indexRoutes);

app.listen(process.env.PORT || 4000);
console.log('Server on port', process.env.PORT);