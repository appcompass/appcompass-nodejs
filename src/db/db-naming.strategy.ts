import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

import { snakeCase } from 'lodash';

export class DBNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  columnName(propertyName: string, customName: string): string {
    return customName ? customName : snakeCase(propertyName);
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const clonedColumnNames = [...columnNames];

    clonedColumnNames.sort();

    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = table.replace('.', '_');
    const replacedColumnNames = clonedColumnNames.join('_');

    return `${replacedTableName}_${replacedColumnNames}_foreign`.toLowerCase();
  }
}
