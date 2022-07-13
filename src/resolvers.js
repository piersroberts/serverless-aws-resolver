const resolvers = {
  SSM: {
    configKey: "ssm",
    getParameter: (params, values) => {
      const value = values[params.Name];
      return {
        Parameter: { Value: value, Type: "String", ...params },
      };
    },
  },
  CloudFormation: {
    configKey: "cf",
    describeStacks: (params, values) => {
      const entriesObject = values[params.StackName];
      const outputs = Object.entries(entriesObject).map(
        ([OutputKey, OutputValue]) => ({ OutputKey, OutputValue })
      );
      return {
        Stacks: [
          {
            Outputs: outputs,
          },
        ],
      };
    },
  },
  STS: {
    configKey: "aws",
    getCallerIdentity: (params, { accountId, arn, userId }) => {
      return {
        Arn: arn,
        Account: accountId,
        UserId: userId,
      };
    },
  },
};

module.exports = resolvers;
