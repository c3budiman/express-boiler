import { User } from "src/Models/User";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}