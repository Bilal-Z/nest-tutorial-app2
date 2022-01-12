import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // meesagesService: MessagesService;

  // constructor() {
  //   // dont do this in real app
  //   // use dependency injection
  //   this.meesagesService = new MessagesService();
  // }
  constructor(public meesagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.meesagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.meesagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.meesagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
