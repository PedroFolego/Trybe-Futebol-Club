import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matches from './matches.model';

class Teams extends Model {
  public id: number;
  public teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: DataTypes.STRING,

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Teams;
