import { Injectable } from '@nestjs/common';
import { Rcon } from 'rcon-client';

@Injectable()
export class AppService {
  private readonly rconConfig = {
    host: '45.127.134.182', // IP server Minecraft jarak jauh
    port: 221,       // Default RCON port
    password: 'P@ssw0rd2022#@!' // Replace with your RCON password
  };

  async sendCommand(command: string): Promise<string> {
    try {
      const rcon = await Rcon.connect(this.rconConfig);
      const response = await rcon.send(command);
      await rcon.end();
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}