import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// custom decorator to get current user easily 
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        // Get HTTP request from context
        const request = ctx.switchToHttp().getRequest();
        console.log('data in currentUser : ', data);
        //return user, attached by jwt strategy  
        return request.user;
    }
)
// to use it in controller:
// getProfile(@CurrentUser() user: User) {
//   return user;  // Already has current user!
// }