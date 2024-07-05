import { Sequelize } from 'sequelize';
import config from '@config'

const MYSQL = config.MYSQL;

function createDatabaseConnection(database: string, username: string, password: string, options: any): Sequelize {
  const sequelize = new Sequelize(database, username, password, options);
  return sequelize;
}

const sequelize: Sequelize = createDatabaseConnection(MYSQL.MYSQL_DATABASE, MYSQL.MYSQL_USERNAME, MYSQL.MYSQL_PASSWORD, {
  dialect: 'mysql',
  logging: false,
});
export default sequelize;