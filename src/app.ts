import express = require("express");
import path = require("path");
import { Page } from "./page";
import { Router } from "./routers";
import { App } from "./routers/app";
import { Main } from "./routers/main";
import { Static } from "./routers/static";


class Application {
    public readonly Application : express.Application;
    public readonly Port : number;
    public Routers: Array<Router>;

    constructor(port: number) {
        this.Port = port;
        this.Application = express();
        this.Application.set('view engine', 'ejs');
        // this.Application.set('views', path.join(__dirname, '../app'));
        this.Routers = [
            new Main(this.Application),
            new App(this.Application),
            new Static(this.Application),
        ];
        console.log('routers inited');
        console.log('application inited');
    }

    public Start() {
        this.Application.listen(this.Port, () => console.log('app listening at http://localhost:' + this.Port));
    }
}

const app = new Application(3000);
app.Start();