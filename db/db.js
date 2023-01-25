import { Sequelize, DataTypes } from 'sequelize';
import pg from 'pg';
const { PoolClient } = pg;
import pgipc from 'pg-ipc';

// Option 1: Passing a connection URI
const sequelize = new Sequelize("postgres://druwjncc:8TuG_qrtWO8XwPgQoG5VZ4opq93ZnuQI@hattie.db.elephantsql.com/druwjncc") // Example for postgres

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export const Todos = sequelize.define("Todos", {
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'done', 'overdue'],
        defaultValue: 'pending',
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM,
        values: ['high', 'average', 'low'],
        defaultValue: 'average',
    }
});

await Todos.sync();
const cl = await sequelize.connectionManager.getConnection();

const ipc = pgipc(cl);

ipc.on("error", (err) => {
    console.log(err);
})

ipc.on("end", () => {
    console.log("this is the end");
    cl.end();
})

ipc.on("testchannel", (msg) => {
    // console.log(msg);
    console.log(`User #${msg.processId} says: ${JSON.stringify(msg.payload)}`);
});

export default sequelize;
