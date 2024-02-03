import path from "path";

const rootPath = __dirname;
const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mysql: {
    host: 'localhost',
    user: 'root',
    database: 'news',
    password: 'root',
  },
};

export default config;