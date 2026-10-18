import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'; // cycle de d'utilisation quand le module démarre et s'arrete 
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService  extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect(); // connection à la base de donnée
        console.log('Connecté à la base de données Postgres !');
    }

    async onModuleDestroy() {
        await this.$disconnect(); 
        console.log('Déconnection de la base de données réussie !');
    }
    //fonction qui permet de gérer les opérations complexes, soit elles opèrent toutes avec succès soit elle renvoies toute un echec 
    async executeTransaction<T>(fn: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T>{
        return this.$transaction(fn);
    }
}
