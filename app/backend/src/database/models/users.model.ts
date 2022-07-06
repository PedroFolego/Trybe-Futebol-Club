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

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Users;
