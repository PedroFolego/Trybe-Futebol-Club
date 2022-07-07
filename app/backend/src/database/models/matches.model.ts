import { DataTypes, Model } from 'sequelize';
import db from '.';
// import Teams from './teams.model';

class Matches extends Model {
  public id: number;
  public homeTeam: string;
  public homeTeamGoals: number;
  public awayTeam: string;
  public awayTeamGoals: number;
  public inProgress: number;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: DataTypes.STRING,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.STRING,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.NUMBER,
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

// Matches.belongsTo(Teams, { foreignKey: 'id', as: 'team' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
