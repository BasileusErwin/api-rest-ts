import mongoose from 'mongoose';

mongoose.set('useFindAndModify', true);
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then((db) => console.log('DB is connect'))
	.catch((e) => console.error(e));
