"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = void 0;
class People {
    constructor(workspace) {
        this._people = workspace.people;
    }
    _people;
    list() {
        return this._people;
    }
}
exports.People = People;
