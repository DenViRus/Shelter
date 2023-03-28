export default class ProjectActions {
  constructor() {
    this.data = null;
    this.dataArr = null;
  }

  getDataReq = async (url, id) => {
    const resp = await fetch(url);
    if (resp.status >= 200 && resp.status < 300) {
      this.data = await resp.json();
      if (id) {
        return this.data.find((el) => el.id === id);
      }
      return this.data;
    }
    console.log(`ERROR!!, ${response}, ${response.status}`);
    return false;
  };

  getRandArr(min, max, sldrNumbArr) {
    let arr = [];
    if (sldrNumbArr) {
      for (let i = arr.length, j = sldrNumbArr.length; i < j; i++) {
        let newRand = Math.floor(min + Math.random() * (max + 1 - min));
        if (sldrNumbArr.includes(newRand) || arr.includes(newRand)) {
          newRand = Math.floor(min + Math.random() * (max + 1 - min));
          i--;
        } else {
          arr.push(newRand);
          if(i > 1) arr = arr.reverse();
        }
      }
    } else {
      for (let i = arr.length; i < 3; i++) {
        let newRand = Math.floor(min + Math.random() * (max + 1 - min));
        if (arr.includes(newRand)) {
          newRand = Math.floor(min + Math.random() * (max + 1 - min));
          i--;
        } else {
          arr.push(newRand);
          if(i > 1) arr = arr.reverse();
        }
      }
    }

    return arr;
  }

  getCont(data) {
    return Array.isArray(data) ? data.join(" , ") : data;
  }
}
