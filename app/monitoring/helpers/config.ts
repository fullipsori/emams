interface ApiConfig {
  API_URL: string;
}

interface Config {
  api: ApiConfig;
}

const config: Config = {
  api: {
    API_URL: "http://localhost:3002",
  },
};

export default config;