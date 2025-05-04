
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generates/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-urql"
      ]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
