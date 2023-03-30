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

  // == mainCarousel actions start ==

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
          if (i > 1) arr = arr.reverse();
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
          if (i > 1) arr = arr.reverse();
        }
      }
    }

    return arr;
  }

  // == mainCarousel actions finish ==

  getCont(data) {
    return Array.isArray(data) ? data.join(" , ") : data;
  }

  // == petsPagination actions start ==  @media (min-width: 768px) and (max-width: 1279px)

  getPageState(pgnData) {
    let vsblCardsAmount = null;

    if (window.innerWidth >= 1280) {
      vsblCardsAmount = pgnData.vsblCards[0];
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      vsblCardsAmount = pgnData.vsblCards[1];
    } else if (window.innerWidth >= 320 && window.innerWidth < 768) {
      vsblCardsAmount = pgnData.vsblCards[2];
    }
    const pageAmount = pgnData.allCards / vsblCardsAmount;
    return `${vsblCardsAmount}-${pageAmount}`
  }



  getPgnNumbState(cardAmount, pgnData) {
    const numbState = {};

    for (const item of pgnData.vsblCards) {
      const vsblCardsAmount = item;
      const pageAmount = pgnData.allCards / vsblCardsAmount;
      const stateProp = `${vsblCardsAmount}-${pageAmount}`;

      numbState[stateProp] = {};
      const stateVal = numbState[stateProp];
      let counter = 1;

      for (let i = 1; i <= pageAmount; i++) {
        const pageProp = i;
        stateVal[pageProp] = [];
        const pageVal = stateVal[pageProp];

        if (cardAmount === vsblCardsAmount) {
          for (let j = 0; j < vsblCardsAmount; j++) {
            let numb = Math.floor(1 + Math.random() * (vsblCardsAmount + 1 - 1));
            if (pageVal.includes(numb)) {
              numb = Math.floor(1 + Math.random() * (vsblCardsAmount + 1 - 1));
              j--;
            } else {
              pageVal.push(numb);
              if (j === 3 || j === 5 || j === 7) pageVal.reverse();
            }
          }
        } else {
          for (let j = 0; j < vsblCardsAmount; j++) {
            pageVal.push(counter);
            counter++;
            if (counter > cardAmount) counter = 1;
            if (counter === 3 || counter === 5 || counter === 7) pageVal.reverse();
          }
        }
      }
    }
    for (const prop in numbState) {
      if (Object.hasOwnProperty.call(numbState, prop)) {
        const val = numbState[prop];

        for (const valProp in val) {
          if (Object.hasOwnProperty.call(val, valProp)) {
            const valPropVal = val[valProp];
            if (valPropVal.length < cardAmount) {
              for (let k = valPropVal.length; k < cardAmount; k++) {
                let numb = Math.floor(1 + Math.random() * (cardAmount + 1 - 1));
                if (valPropVal.includes(numb)) {
                  numb = Math.floor(1 + Math.random() * (cardAmount + 1 - 1));
                  k--;
                } else {
                  valPropVal.push(numb);
                }
              }
            }
          }
        }
      }
    }

    return numbState;
  }

  // == petsPagination actions finish ==
}
