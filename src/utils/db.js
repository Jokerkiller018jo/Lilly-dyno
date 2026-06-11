const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MonogoDB_URL || 'mongodb+srv://nahouli2012_db_user:<db_password>@lillypad.ui3sh7d.mongodb.net/?appName=LILLYPAD',
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
