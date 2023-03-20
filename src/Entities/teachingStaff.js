export class TeachingStaff
{
    constructor(staffData){

        this.profList = [];
        this.taList = [];

        for(let s in staffData){
            
            for(let p in staffData[s].profs){
                this.addProf(staffData[s].profs[p])
            }

            for(let t in staffData[s].tas){
                this.addTa(staffData[s].tas[t])
            }
        }
        
        
    }

    addProf(p){
        this.profList.push(p);
    }

    getProfs(){return this.profList}

    addTa(t){
        this.taList.push(t);
    }

    getTas(){return this.taList}

}