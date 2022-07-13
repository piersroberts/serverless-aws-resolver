const resolvers = require("./src/resolvers");
const PLUGIN_NAME = "serverless-aws-resolver";

class Plugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.service = serverless.service;
    this.config =
      (this.service.custom && this.service.custom[PLUGIN_NAME]) || {};
    this.stage = serverless.service.provider.stage;

    if (this.config.stages && !this.config.stages.includes(this.stage)) {
      return;
    }

    const aws = this.serverless.getProvider("aws");
    const originalRequest = aws.request.bind(aws);

    aws.request = async (service, method, params) => {
      if (!Object.keys(resolvers).includes(service)) {
        return originalRequest(service, method, params, options);
      }
      const resolver = resolvers[service];
      const values = this.config[resolver.configKey];
      const response = resolver[method](params, values);

      return response;
    };

    this.serverless.setProvider("aws", aws);
  }
}

module.exports = Plugin;
