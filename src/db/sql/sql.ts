import { QueryFile, TQueryFileOptions } from 'pg-promise';
import * as path from 'path';

export function sql(file: string): QueryFile {

  const fullPath: string = path.join(__dirname, file);
  const options: TQueryFileOptions = {
    minify: true,
    params: {
      schema: 'public'
    }
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    throw qf.error
  }

  return qf;
}