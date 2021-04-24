import express = require("express");
import fs = require("fs");
import path = require("path");
import { Page } from "../page";
import { Router } from "../routers";

export class Static implements Router {
    public StaticSourcePath = path.join(__dirname, '../../app', 'src');
    public StaticApplicationPath = path.join(__dirname, '../../app', 'app');
    public Application : express.Application;
    public Router = express.Router();

    constructor(app: express.Application) {
        this.Application = app;
        this.Application.use('/', this.Router);
        this.Router.use('/src', express.static(this.StaticSourcePath));
        this.Router.use('/app', express.static(this.StaticApplicationPath));
        this.Router.use(this.onStatic);
        console.log("static is ready");
    }

    private onStatic(req: express.Request, res: express.Response) {
        return Page.send404(res);
    }
}
