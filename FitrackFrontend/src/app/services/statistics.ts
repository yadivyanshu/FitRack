
  export class Statistics {
    id: number;
    gamesPlayed: number;
    pointsScored: number;
    assists: number;
    rebounds: number;
    
  
    constructor(id: number, gamesPlayed: number, pointsScored: number, assists: number, rebounds: number) {
      this.id = id;
      this.gamesPlayed = gamesPlayed;
      this.pointsScored = pointsScored;
      this.assists = assists;
      this.rebounds = rebounds;
    }
  }