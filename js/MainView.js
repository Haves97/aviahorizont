import { STEP_LINE_TANGAGE } from './constants.js'

class MainView {
    setAirhorizontModel(model) {
        this._airModel = model;
    }
    setCompasModel(model) {
        this._compasModel = model;
    }

    showMainView() {
        this._airModel.showAirhorizontModel();
        this._compasModel.drawCompas();

    }

    handleEvent(event) {
        switch (event.key) {
            case "ArrowLeft":
                this.keyboardLeft();
                break;
            case "ArrowRight":
                this.keyboardRight();
                break;
            case "ArrowUp":
                this.keyboardUp();
                break;
            case "ArrowDown":
                this.keyboardDown();
                break;
            case "KeyD":
            case "d":
            case "в":
                this._compasModel.moveCompas(-1);
                this._compasModel.drawCompas();
                break;
            case "KeyA":
            case "a":
            case "ф":
                this._compasModel.moveCompas(1);
                this._compasModel.drawCompas();
                break;
        }

        switch (event.type) {
            case 'mousedown':
                this.animateInputData();
                break;
        }
    }

    keyboardLeft(angle = 1) {
        this._airModel.moveMarkAirplaneVal.angleRoll -= angle;
        this._airModel.showAirhorizontModel();
    }

    keyboardRight(angle = 1) {
        this._airModel.moveMarkAirplaneVal.angleRoll += angle;
        this._airModel.showAirhorizontModel();
    }

    keyboardUp(angle = 1, isButton = false) {
        this._airModel.moveMarkAirplaneVal.anglePitch += angle;
        this._airModel.checkBorderUp(isButton);
        this._airModel.showAirhorizontModel();
    }

    keyboardDown(angle = 1, isButton = false) {
        this._airModel.moveMarkAirplaneVal.anglePitch -= angle;
        this._airModel.checkBorderDown(isButton);
        this._airModel.showAirhorizontModel();
    }

    animateInputData() {
        let pitch = document.getElementById('inPitch').value;
        let roll = document.getElementById('inRoll').value;
        let compas = document.getElementById('inCompas').value;

        if ((pitch >= -180 && pitch <= 180) && (roll >= -180 && roll <= 180) && (compas >= 0 && compas <= 360)) {
            this._airModel.resetMoveMarkAirplaneVal();
            this._compasModel.resetScaleMarks();

            let movePitch, moveRoll;
            if (pitch > 0 && pitch <= 180) {
                movePitch = this.keyboardUp.bind(this);
            } else if (pitch >= -180 && pitch < 0) {
                pitch *= -1;
                movePitch = this.keyboardDown.bind(this);
            }
            if (roll > 0 && roll <= 180) {
                moveRoll = this.keyboardLeft.bind(this);
            } else if (roll >= -180 && roll < 0) {
                roll *= -1;
                moveRoll = this.keyboardRight.bind(this);
            }
            pitch = Math.ceil(pitch * (STEP_LINE_TANGAGE / 10));
            compas = Math.ceil(compas * 4.2); //4.6

            let self = this;
            requestAnimationFrame(function animate() {
                if (pitch != 0) {
                    movePitch(0.5, true);
                    pitch -= 0.5;
                }
                if (roll != 0) {
                    moveRoll(0.5);
                    roll -= 0.5;
                }
                if (compas != 0) {
                    self._compasModel.moveCompas(-0.5);
                    self._compasModel.drawCompas();
                    compas -= 0.5;
                }
                if (pitch != 0 || roll != 0 || compas != 0) {
                    requestAnimationFrame(animate);
                }
            });
        } else {
            alert('Значение выходит за границу');
        }
    }
}

export { MainView };