import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

// Routers
import indexRoutes from './routes/indexRoutes';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';

/**
 * Server.
 */
class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.router();
	}

	config() {
		// Mongoos
		mongoose.set('useFindAndModify', true);
		mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
			})
			.then((db) => console.log('DB is connect'))
			.catch((e) => console.error(e));

		// Settings
		this.app.set('port', process.env.PORT || 3000);
		// Middlewares
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(cors());
	}
	router() {
		this.app.use(indexRoutes);
		this.app.use('/api/posts', postRoutes)
		this.app.use('/api/user', userRoutes)
	}
	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log(`Server on port: ${this.app.get('port')}`);
		});
	}
}

const server = new Server();

server.start();
