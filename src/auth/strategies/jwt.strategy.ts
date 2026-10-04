import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private authService: AuthService) {
        //environnement variable verification 
        const secret:string = process.env.JWT_SECRET!;
        if (!secret) {
            throw new Error('Un problème est survenue concernant la variable d\'environnement JWT_SECRET');
        }

        super({
            // where to find the token in request
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Looks for: Authorization: Bearer <token>

            ignoreExpiration: false, // reject expirated tokens 

            secretOrKey: process.env.JWT_SECRET!
            // This MUST match the secret used to sign tokens

        })
    }
    
    //validate run after the token is verified 
    //payload = decoded data of the user 
    async validate(payload: any) {
        const user = await this.authService.validateUser(payload.sub); // payload.sub is userId 
        if (!user) {
            // user not found maybe deleted 
            throw new UnauthorizedException();
        }
        return user;
    }
}