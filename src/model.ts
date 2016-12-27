export interface IData {
  id: number;
  name?: string;
}

export class Person {
  fname: string;
  lname: string;

  constructor() {

  }

  setFullname(fname: string, lname: string) {
    this.fname = fname;
    this.lname = lname;
  }
  getFullname() {
    let fullname2 = this.fname + ' ' + this.lname;
    
    let fullname = `${this.fname} ${this.lname}`;
    alert(fullname);
  }
}

