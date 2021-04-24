import express = require("express");
import { Page } from "../page";
import { Router } from "../routers";

export class App implements Router {
    public Application : express.Application;
    public Router = express.Router();

    constructor(app: express.Application) {
        this.Application = app;
        this.Application.use('/app', this.Router);
        this.Router.get("/:name", this.onApp)
        console.log("app is ready");
    }
    
    onApp(req : express.Request , res : express.Response) {
        let name = req.params.name
        console.log(name);
        if(!name) Page.send404(res)
        let app = `app/${name}/index`
        if(Page.existsPage(app))
            Page.renderPage(app, res);
        else Page.send404(res)
    }
}
