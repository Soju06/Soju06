import express = require("express");
import { Page } from "../page";
import { Router } from "../routers";

export class Main implements Router {
    public Application : express.Application;
    public Router = express.Router();

    constructor(app: express.Application) {
        this.Application = app;
        this.Application.use('/', this.Router);
        this.Router.get("/", this.onMain)
        console.log("main is ready");
    }
    
    onMain(req : express.Request , res : express.Response) {
        Page.renderPage('main', res);
    }
}
