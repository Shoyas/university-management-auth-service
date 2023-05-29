import mongoose from "mongoose";
import config from './config/index';
import app from './app';
async function main() {

    try {
        await mongoose.connect(config.database_url as string);
        console.log('Database is connected...');
        app.listen(config.port, () => {
            console.log(`Application is listening on port ${config.port}`)
          })
    } catch (error) {
        console.log('Failed to connect database...', error)
    }
 }
 main();
