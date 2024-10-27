import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';
import { exec } from 'child_process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHome(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

  @Post('command')
  async sendCommand(@Body('command') command: string, @Res() res: Response) {
    if (!command) {
      return res.status(400).send('No command provided');
    }

    try {
      const response = await this.appService.sendCommand(command);
      res.send(response); // Kirim response sebagai teks biasa
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  }

  @Get('/reset-world')
  async resetWorld(@Res() res: Response) {
    exec(join(__dirname, '..', '..', 'reset_world.sh'), (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Error: ${stderr}`);
      } else {
        res.send(`World reset successful: ${stdout}`);
      }
    });
  }
}