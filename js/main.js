import { AirhorizontModel } from './AirhorizontModel.js'
import { CompasModel } from './CompasModel.js'
import { MainView } from './MainView.js'


let canvasAirhorizon = document.getElementById("drawingAirhorizon");
const airModel = new AirhorizontModel(canvasAirhorizon);

let canvasCompas = document.getElementById("drawingCompas");
let compasModel = new CompasModel(canvasCompas);

let mainView = new MainView();
mainView.setAirhorizontModel(airModel);
mainView.setCompasModel(compasModel);
mainView.showMainView();

document.addEventListener('keydown', mainView);
sendData.addEventListener('mousedown', mainView);





