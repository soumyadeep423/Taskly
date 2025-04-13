const mongoose = require('mongoose');
require('dotenv').config();

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        for (const collection of collections) {
            const indexes = await db.collection(collection.name).indexes();
            console.log(`\nIndexes for ${collection.name}:`);
            console.log(indexes);

            // Drop any index that's not _id_ or email
            for (const index of indexes) {
                if (index.name !== '_id_' && index.name !== 'email_1') {
                    console.log(`Dropping index: ${index.name}`);
                    await db.collection(collection.name).dropIndex(index.name);
                }
            }
        }

        console.log('\nCleanup completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error during cleanup:', err);
        process.exit(1);
    }
};

cleanup(); 