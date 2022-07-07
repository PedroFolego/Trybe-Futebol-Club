import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id: number;
  public password: string;
  public email: string;
  public username: string;
  public role: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

export default Users;
