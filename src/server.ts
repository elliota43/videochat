import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HttpServer } from "http";

export class Server {
    private httpServer: HttpServer;
    private app: Application;
    private io: SocketIOServer;

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();

    }
    
    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = socketIO(this.httpServer);
    }

    private handleRoutes(): void {
        this.app.get("/", (req, res) => {
            res.send("<h1>Hello, World!</h1>");
        });
    }

    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            console.log('Socket connected');
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () => 
            callback(this.DEFAULT_PORT)
        );
    }
}