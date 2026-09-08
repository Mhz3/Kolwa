#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7c43eaca2cb1c1feb740bbc995dc38b22fe6d7f9cc1e30cad2c82a6625ae9df8/contract';
import endContract from '../../snapshots/7c43eaca2cb1c1feb740bbc995dc38b22fe6d7f9cc1e30cad2c82a6625ae9df8/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'asset',
        columns: [
          col('assetCode', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('externalCmmsId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('facilityId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('location', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('manufacturer', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('model', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('serialNumber', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'asset_status_check_f6d74c14',
            "\"status\" IN ('ACTIVE', 'INACTIVE', 'OUT_OF_SERVICE', 'RETIRED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'facility',
        columns: [
          col('city', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('state', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('timezone', 'text', {
            notNull: true,
            default: lit('America/Los_Angeles'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('type', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'inspection',
        columns: [
          col('assetId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('completedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('facilityId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('inspectionCode', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('inspectorId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('startedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('templateId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'inspection_status_check_3f0e10db',
            "\"status\" IN ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'VOIDED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'inspectionTemplate',
        columns: [
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('facilityId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'inspectionTemplate_status_check_ee520df2',
            "\"status\" IN ('ACTIVE', 'INACTIVE')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'inspectionTemplateItem',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('question', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('required', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('sortOrder', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('templateId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('department', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('facilityId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('firstName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('lastName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'user_role_check_1289e0c7',
            "\"role\" IN ('ENGINEER', 'FACILITIES_MANAGER', 'COMPLIANCE', 'ADMINISTRATOR', 'SURVEYOR_READ_ONLY')",
          ),
          checkExpression('user_status_check_ee520df2', "\"status\" IN ('ACTIVE', 'INACTIVE')"),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'asset',
        constraint: 'asset_facilityId_assetCode_key',
        columns: ['facilityId', 'assetCode'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'facility',
        constraint: 'facility_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'inspection',
        constraint: 'inspection_facilityId_inspectionCode_key',
        columns: ['facilityId', 'inspectionCode'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'inspectionTemplate',
        constraint: 'inspectionTemplate_facilityId_code_key',
        columns: ['facilityId', 'code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'inspectionTemplateItem',
        constraint: 'inspectionTemplateItem_templateId_sortOrder_key',
        columns: ['templateId', 'sortOrder'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'asset',
        index: 'asset_category_idx_f2600f8e',
        columns: ['category'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'asset',
        index: 'asset_externalCmmsId_idx_53de8615',
        columns: ['externalCmmsId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'asset',
        index: 'asset_facilityId_idx_3710d8c1',
        columns: ['facilityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'inspection',
        index: 'inspection_assetId_idx_4ebe630a',
        columns: ['assetId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'inspection',
        index: 'inspection_facilityId_idx_3710d8c1',
        columns: ['facilityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'inspection',
        index: 'inspection_inspectorId_idx_4d86e86c',
        columns: ['inspectorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'inspection',
        index: 'inspection_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'inspection',
        index: 'inspection_templateId_idx_19e0d972',
        columns: ['templateId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'inspectionTemplate',
        index: 'inspectionTemplate_facilityId_idx_3710d8c1',
        columns: ['facilityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'inspectionTemplateItem',
        index: 'inspectionTemplateItem_templateId_idx_19e0d972',
        columns: ['templateId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'user',
        index: 'user_facilityId_idx_3710d8c1',
        columns: ['facilityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'user',
        index: 'user_role_idx_2c1ddf83',
        columns: ['role'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'asset',
        foreignKey: {
          name: 'asset_facilityId_fkey',
          columns: ['facilityId'],
          references: { schema: 'public', table: 'facility', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'inspection',
        foreignKey: {
          name: 'inspection_facilityId_fkey',
          columns: ['facilityId'],
          references: { schema: 'public', table: 'facility', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'inspection',
        foreignKey: {
          name: 'inspection_assetId_fkey',
          columns: ['assetId'],
          references: { schema: 'public', table: 'asset', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'inspection',
        foreignKey: {
          name: 'inspection_templateId_fkey',
          columns: ['templateId'],
          references: { schema: 'public', table: 'inspectionTemplate', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'inspection',
        foreignKey: {
          name: 'inspection_inspectorId_fkey',
          columns: ['inspectorId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'inspectionTemplate',
        foreignKey: {
          name: 'inspectionTemplate_facilityId_fkey',
          columns: ['facilityId'],
          references: { schema: 'public', table: 'facility', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'inspectionTemplateItem',
        foreignKey: {
          name: 'inspectionTemplateItem_templateId_fkey',
          columns: ['templateId'],
          references: { schema: 'public', table: 'inspectionTemplate', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'user',
        foreignKey: {
          name: 'user_facilityId_fkey',
          columns: ['facilityId'],
          references: { schema: 'public', table: 'facility', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
