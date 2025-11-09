import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateSessionTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'coach_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'scheduled_at',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['scheduled', 'completed', 'canceled'],
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'sessions',
      new TableForeignKey({
        name: 'fk_sessions_client_id',
        columnNames: ['client_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'sessions',
      new TableForeignKey({
        name: 'fk_sessions_coach_id',
        columnNames: ['coach_id'],
        referencedTableName: 'coaches',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_client_id',
        columnNames: ['client_id'],
      })
    );

    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_client_id',
        columnNames: ['client_id'],
      })
    );

    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_coach_id',
        columnNames: ['coach_id'],
      })
    );

    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_coach_id',
        columnNames: ['coach_id'],
      })
    );

    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_scheduled_at',
        columnNames: ['scheduled_at'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('sessions', 'idx_sessions_client_id');
    await queryRunner.dropIndex('sessions', 'idx_sessions_coach_id');
    await queryRunner.dropIndex('sessions', 'idx_sessions_scheduled_at');
    await queryRunner.dropForeignKey('sessions', 'fk_sessions_client_id');
    await queryRunner.dropForeignKey('sessions', 'fk_sessions_coach_id');
    await queryRunner.dropTable('sessions');
  }
}
