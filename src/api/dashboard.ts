import {get} from "../utils/http/request";
export const getEnergyData = () => {
   return  get('/energyData')
}