# serverless-aws-resolver
Resolve AWS variables in Serverless when you don't want to actually make a call to AWS

This plugin allows CloudFormation and SSM variables to be used even totally offline. Normally these variables are fetched from AWS during the Serverless packaging stage, but when this plugin is enabled it will intercept the requests to AWS and return the values from your custom config.

This is useful when you want to build a stack in an environment that doesn't have access to AWS, such as test environments or environments which are completely offline.

## Example config:
```yaml
plugins:
  - serverless-aws-resolver # You'll probably want this at the top of plugins list

custom:
  serverless-aws-resolver:
    stages:
      - dev # The stages where you want to enable this plugin
    ssm: # SSM
      /some-path/SOME_SSM_KEY: 'Your String Value' # The key and value you want to provide  
    cf: # Cloudformation
      service-resources-dev: # The Cloudformation stack name
        AlarmsSNSTopic: Foo # Key and value you want to provide
        SomethingElse: Bar
```

## Todo
- Add tests
- Rewrite in TypeScript
- Better checks, it's currently pretty sloppy
- Add support for other AWS variables like S3