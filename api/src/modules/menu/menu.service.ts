import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async menu(
    menuWhereUniqueInput: Prisma.MenuWhereUniqueInput,
  ): Promise<Menu | null> {
    return this.prisma.menu.findUnique({
      where: menuWhereUniqueInput,
    });
  }

  async menus(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MenuWhereUniqueInput;
    where?: Prisma.MenuWhereInput;
    orderBy?: Prisma.MenuOrderByWithRelationInput;
  }): Promise<Menu[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.menu.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        parent: true
      }
    });
  }

  async createMenu(data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.prisma.menu.create({
      data,
    });
  }

  async updateMenu(params: {
    where: Prisma.MenuWhereUniqueInput;
    data: Prisma.MenuUpdateInput;
  }): Promise<Menu> {
    const { where, data } = params;
    
    console.debug('where', where)
    return this.prisma.menu.update({
      data,
      where,
    });
  }

  async deleteMenu(where: Prisma.MenuWhereUniqueInput): Promise<Menu> {
    return this.prisma.menu.delete({
      where,
    });
  }
}