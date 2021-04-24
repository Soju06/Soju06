import express from "express";
import { existsSync } from "fs";
import { join } from "path";

export class Pages {
    public getPageLocation(pageName: string): string {
        return join(__dirname, pageName) as string;
    }

    public renderPage(pageName: string, res: express.Response, args: any = undefined) {
        return res.render(join(__dirname, '../app', pageName), args);
    }

    public existsPage(name: string): boolean {
        return existsSync(join(__dirname, '../app', name + '.ejs'))
    }

    public sendMessagePage(res: express.Response, msg: messagePage) {
        return res.render(join(__dirname, 'pages', 'message'), msg);
    }

    public send404(res: express.Response) {
        return res.status(404).sendFile(join(__dirname, './pages/404.html'));
    }
}

export const Page = new Pages();

export interface messagePage {
    color?: string;
    title?: string;
    titleText?: string;
    message?: string;
    text?: string;
}