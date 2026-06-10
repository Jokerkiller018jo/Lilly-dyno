const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/discord_bot',
    {
        dialect: 'postgres',
        logging: false,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected successfully');
        
        // Sync models with database
        await sequelize.sync({ alter: false });
        console.log('Database models synced');
    } catch (error) {
        console.error(`Error connecting to PostgreSQL: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize };
