# aws-es-tool

The tool for restoring automated snapshots on AWS Elasticsearch Service

#### Installation:
```
npm install -g https://github.com/dikun-mv/aws-es-tool.git
```

#### Usage:
```
aws-es-tool [options] [command]
```

#### Options:
```
-v, --version     output the version number
-H, --host <URL>  AWS Elasticsearch Service URL
-h, --help        output usage information
```

#### Commands:
```
list              List available snapshots
restore <ID>      Restore snapshot with given ID
```
