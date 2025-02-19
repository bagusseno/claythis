import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu, Prisma } from '@prisma/client';
import { Request } from 'express';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('menus')
  async menus(): Promise<Menu[]> {
    return this.menuService.menus({})
  }

  @Post('menus')
  async createMenu(
    @Body() data: Prisma.MenuCreateInput
  ): Promise<Menu> {
    return this.menuService.createMenu(data);
  }

  @Put('menus/:id')
  async updateMenu(
    @Param('id') id: string,
    @Body() data: Prisma.MenuUpdateInput
  ): Promise<Menu> {
    return this.menuService.updateMenu({where: {id}, data});
  }

  @Delete('menus/:id')
  async deleteMenu(
    @Param('id') id: string
  )
  {
    return this.menuService.deleteMenu({id});
  }
}
