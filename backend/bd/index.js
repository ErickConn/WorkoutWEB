import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:32923/?directConnection=true')
  .then(() => console.log('MongoDB connected')).catch((err) => console.log(err));