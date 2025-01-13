import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model'; 

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() body): Promise<User> {
    const { fullName, idNumber, phoneNumber, district, sabhaId, email, password } = body;

    // Call the service to sign up without DTO validation
    return this.userService.signUp({ fullName, idNumber, phoneNumber, district, sabhaId, email, password });
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    try {
      const result = await this.userService.login(email, password);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }





  //WEB APP
  @Post('filter')
  async filterUsers(@Body() body: { sabhaId: number, isBlock: boolean }) {
    const { sabhaId, isBlock } = body;
    return this.userService.findUsersBySabhaAndBlockStatus(sabhaId, isBlock);
  }

  @Get('/by/:userId') // Define a route to fetch user details by userId
  async getUserById(@Param('userId') userId: number) {
    return this.userService.findUserById(userId);
  }

  @Patch(':userId/block') // Define a PATCH endpoint for blocking/unblocking a user
  async blockUser(@Param('userId') userId: number,@Body('isBlock') isBlock: boolean,) {
    return this.userService.updateBlockStatus(userId, isBlock);
  }
}
