import express from "express";

export interface Router {
    Application : express.Application;
    Router: express.Router;
}