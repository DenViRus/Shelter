export default class ProjectData {
  constructor(actions) {
    this.actions = actions;
    this.petsDataUrl = "./../../assets/json/pets.json";

    this.petsData = null;
  }

  async getPetsData() {
    let ordNum = 0;
    return [...(await this.actions.getDataReq(this.petsDataUrl))].map((item) => {
      item["id"] = `${item.type}${item.breed}${item.name}`.replace(/\W/g, "").replace(/(.)\1+/g, "$1");
      item["ordNum"] = ++ordNum;
      return item;
    });
  }

  async projectDataControl() {
    this.petsData = await this.getPetsData();
  }
}
