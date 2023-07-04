// AWS SDK for JavaScript v2.17.0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// License at https://sdk.amazonaws.com/js/BUNDLE_LICENSE.txt
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "version": "2.0",
  "metadata": {
    "apiVersion": "2015-12-08",
    "endpointPrefix": "acm",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceAbbreviation": "ACM",
    "serviceFullName": "AWS Certificate Manager",
    "signatureVersion": "v4",
    "targetPrefix": "CertificateManager",
    "uid": "acm-2015-12-08"
  },
  "operations": {
    "AddTagsToCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "CertificateArn",
          "Tags"
        ],
        "members": {
          "CertificateArn": {},
          "Tags": {
            "shape": "S3"
          }
        }
      }
    },
    "DeleteCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "CertificateArn"
        ],
        "members": {
          "CertificateArn": {}
        }
      }
    },
    "DescribeCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "CertificateArn"
        ],
        "members": {
          "CertificateArn": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Certificate": {
            "type": "structure",
            "members": {
              "CertificateArn": {},
              "DomainName": {},
              "SubjectAlternativeNames": {
                "shape": "Sc"
              },
              "DomainValidationOptions": {
                "shape": "Sd"
              },
              "Serial": {},
              "Subject": {},
              "Issuer": {},
              "CreatedAt": {
                "type": "timestamp"
              },
              "IssuedAt": {
                "type": "timestamp"
              },
              "ImportedAt": {
                "type": "timestamp"
              },
              "Status": {},
              "RevokedAt": {
                "type": "timestamp"
              },
              "RevocationReason": {},
              "NotBefore": {
                "type": "timestamp"
              },
              "NotAfter": {
                "type": "timestamp"
              },
              "KeyAlgorithm": {},
              "SignatureAlgorithm": {},
              "InUseBy": {
                "type": "list",
                "member": {}
              },
              "FailureReason": {},
              "Type": {},
              "RenewalSummary": {
                "type": "structure",
                "required": [
                  "RenewalStatus",
                  "DomainValidationOptions"
                ],
                "members": {
                  "RenewalStatus": {},
                  "DomainValidationOptions": {
                    "shape": "Sd"
                  }
                }
              }
            }
          }
        }
      }
    },
    "GetCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "CertificateArn"
        ],
        "members": {
          "CertificateArn": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Certificate": {},
          "CertificateChain": {}
        }
      }
    },
    "ImportCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "Certificate",
          "PrivateKey"
        ],
        "members": {
          "CertificateArn": {},
          "Certificate": {
            "type": "blob"
          },
          "PrivateKey": {
            "type": "blob",
            "sensitive": true
          },
          "CertificateChain": {
            "type": "blob"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "CertificateArn": {}
        }
      }
    },
    "ListCertificates": {
      "input": {
        "type": "structure",
        "members": {
          "CertificateStatuses": {
            "type": "list",
            "member": {}
          },
          "NextToken": {},
          "MaxItems": {
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "NextToken": {},
          "CertificateSummaryList": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "CertificateArn": {},
                "DomainName": {}
              }
            }
          }
        }
      }
    },
    "ListTagsForCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "CertificateArn"
        ],
        "members": {
          "CertificateArn": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Tags": {
            "shape": "S3"
          }
        }
      }
    },
    "RemoveTagsFromCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "CertificateArn",
          "Tags"
        ],
        "members": {
          "CertificateArn": {},
          "Tags": {
            "shape": "S3"
          }
        }
      }
    },
    "RequestCertificate": {
      "input": {
        "type": "structure",
        "required": [
          "DomainName"
        ],
        "members": {
          "DomainName": {},
          "SubjectAlternativeNames": {
            "shape": "Sc"
          },
          "IdempotencyToken": {},
          "DomainValidationOptions": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "DomainName",
                "ValidationDomain"
              ],
              "members": {
                "DomainName": {},
                "ValidationDomain": {}
              }
            }
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "CertificateArn": {}
        }
      }
    },
    "ResendValidationEmail": {
      "input": {
        "type": "structure",
        "required": [
          "CertificateArn",
          "Domain",
          "ValidationDomain"
        ],
        "members": {
          "CertificateArn": {},
          "Domain": {},
          "ValidationDomain": {}
        }
      }
    }
  },
  "shapes": {
    "S3": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "Key"
        ],
        "members": {
          "Key": {},
          "Value": {}
        }
      }
    },
    "Sc": {
      "type": "list",
      "member": {}
    },
    "Sd": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "DomainName"
        ],
        "members": {
          "DomainName": {},
          "ValidationEmails": {
            "type": "list",
            "member": {}
          },
          "ValidationDomain": {},
          "ValidationStatus": {}
        }
      }
    }
  }
}
},{}],2:[function(require,module,exports){
module.exports={
  "pagination": {
    "ListCertificates": {
      "input_token": "NextToken",
      "limit_key": "MaxItems",
      "output_token": "NextToken",
      "result_key": "CertificateSummaryList"
    }
  }
}
},{}],3:[function(require,module,exports){
module.exports={
  "version": "2.0",
  "metadata": {
    "apiVersion": "2015-07-09",
    "endpointPrefix": "apigateway",
    "protocol": "rest-json",
    "serviceFullName": "Amazon API Gateway",
    "signatureVersion": "v4",
    "uid": "apigateway-2015-07-09"
  },
  "operations": {
    "CreateApiKey": {
      "http": {
        "requestUri": "/apikeys",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "members": {
          "name": {},
          "description": {},
          "enabled": {
            "type": "boolean"
          },
          "generateDistinctId": {
            "type": "boolean"
          },
          "value": {},
          "stageKeys": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "restApiId": {},
                "stageName": {}
              }
            }
          },
          "customerId": {}
        }
      },
      "output": {
        "shape": "S6"
      }
    },
    "CreateAuthorizer": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/authorizers",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "name",
          "type",
          "identitySource"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "name": {},
          "type": {},
          "providerARNs": {
            "shape": "Sb"
          },
          "authType": {},
          "authorizerUri": {},
          "authorizerCredentials": {},
          "identitySource": {},
          "identityValidationExpression": {},
          "authorizerResultTtlInSeconds": {
            "type": "integer"
          }
        }
      },
      "output": {
        "shape": "Se"
      }
    },
    "CreateBasePathMapping": {
      "http": {
        "requestUri": "/domainnames/{domain_name}/basepathmappings",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName",
          "restApiId"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          },
          "basePath": {},
          "restApiId": {},
          "stage": {}
        }
      },
      "output": {
        "shape": "Sg"
      }
    },
    "CreateDeployment": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/deployments",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {},
          "stageDescription": {},
          "description": {},
          "cacheClusterEnabled": {
            "type": "boolean"
          },
          "cacheClusterSize": {},
          "variables": {
            "shape": "Sk"
          }
        }
      },
      "output": {
        "shape": "Sl"
      }
    },
    "CreateDocumentationPart": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/documentation/parts",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "location",
          "properties"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "location": {
            "shape": "Sq"
          },
          "properties": {}
        }
      },
      "output": {
        "shape": "St"
      }
    },
    "CreateDocumentationVersion": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/documentation/versions",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "documentationVersion"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "documentationVersion": {},
          "stageName": {},
          "description": {}
        }
      },
      "output": {
        "shape": "Sv"
      }
    },
    "CreateDomainName": {
      "http": {
        "requestUri": "/domainnames",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName",
          "certificateName",
          "certificateBody",
          "certificatePrivateKey",
          "certificateChain"
        ],
        "members": {
          "domainName": {},
          "certificateName": {},
          "certificateBody": {},
          "certificatePrivateKey": {},
          "certificateChain": {}
        }
      },
      "output": {
        "shape": "Sx"
      }
    },
    "CreateModel": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/models",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "name",
          "contentType"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "name": {},
          "description": {},
          "schema": {},
          "contentType": {}
        }
      },
      "output": {
        "shape": "Sz"
      }
    },
    "CreateResource": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/resources/{parent_id}",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "parentId",
          "pathPart"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "parentId": {
            "location": "uri",
            "locationName": "parent_id"
          },
          "pathPart": {}
        }
      },
      "output": {
        "shape": "S11"
      }
    },
    "CreateRestApi": {
      "http": {
        "requestUri": "/restapis",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "name"
        ],
        "members": {
          "name": {},
          "description": {},
          "version": {},
          "cloneFrom": {},
          "binaryMediaTypes": {
            "shape": "S8"
          }
        }
      },
      "output": {
        "shape": "S1e"
      }
    },
    "CreateStage": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/stages",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName",
          "deploymentId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {},
          "deploymentId": {},
          "description": {},
          "cacheClusterEnabled": {
            "type": "boolean"
          },
          "cacheClusterSize": {},
          "variables": {
            "shape": "Sk"
          },
          "documentationVersion": {}
        }
      },
      "output": {
        "shape": "S1g"
      }
    },
    "CreateUsagePlan": {
      "http": {
        "requestUri": "/usageplans",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "name"
        ],
        "members": {
          "name": {},
          "description": {},
          "apiStages": {
            "shape": "S1o"
          },
          "throttle": {
            "shape": "S1q"
          },
          "quota": {
            "shape": "S1r"
          }
        }
      },
      "output": {
        "shape": "S1t"
      }
    },
    "CreateUsagePlanKey": {
      "http": {
        "requestUri": "/usageplans/{usageplanId}/keys",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId",
          "keyId",
          "keyType"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          },
          "keyId": {},
          "keyType": {}
        }
      },
      "output": {
        "shape": "S1v"
      }
    },
    "DeleteApiKey": {
      "http": {
        "method": "DELETE",
        "requestUri": "/apikeys/{api_Key}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "apiKey"
        ],
        "members": {
          "apiKey": {
            "location": "uri",
            "locationName": "api_Key"
          }
        }
      }
    },
    "DeleteAuthorizer": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/authorizers/{authorizer_id}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "authorizerId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "authorizerId": {
            "location": "uri",
            "locationName": "authorizer_id"
          }
        }
      }
    },
    "DeleteBasePathMapping": {
      "http": {
        "method": "DELETE",
        "requestUri": "/domainnames/{domain_name}/basepathmappings/{base_path}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName",
          "basePath"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          },
          "basePath": {
            "location": "uri",
            "locationName": "base_path"
          }
        }
      }
    },
    "DeleteClientCertificate": {
      "http": {
        "method": "DELETE",
        "requestUri": "/clientcertificates/{clientcertificate_id}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "clientCertificateId"
        ],
        "members": {
          "clientCertificateId": {
            "location": "uri",
            "locationName": "clientcertificate_id"
          }
        }
      }
    },
    "DeleteDeployment": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/deployments/{deployment_id}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "deploymentId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "deploymentId": {
            "location": "uri",
            "locationName": "deployment_id"
          }
        }
      }
    },
    "DeleteDocumentationPart": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/documentation/parts/{part_id}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "documentationPartId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "documentationPartId": {
            "location": "uri",
            "locationName": "part_id"
          }
        }
      }
    },
    "DeleteDocumentationVersion": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/documentation/versions/{doc_version}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "documentationVersion"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "documentationVersion": {
            "location": "uri",
            "locationName": "doc_version"
          }
        }
      }
    },
    "DeleteDomainName": {
      "http": {
        "method": "DELETE",
        "requestUri": "/domainnames/{domain_name}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          }
        }
      }
    },
    "DeleteIntegration": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration",
        "responseCode": 204
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          }
        }
      }
    },
    "DeleteIntegrationResponse": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration/responses/{status_code}",
        "responseCode": 204
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          }
        }
      }
    },
    "DeleteMethod": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}",
        "responseCode": 204
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          }
        }
      }
    },
    "DeleteMethodResponse": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/responses/{status_code}",
        "responseCode": 204
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          }
        }
      }
    },
    "DeleteModel": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/models/{model_name}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "modelName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "modelName": {
            "location": "uri",
            "locationName": "model_name"
          }
        }
      }
    },
    "DeleteResource": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          }
        }
      }
    },
    "DeleteRestApi": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          }
        }
      }
    },
    "DeleteStage": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/stages/{stage_name}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {
            "location": "uri",
            "locationName": "stage_name"
          }
        }
      }
    },
    "DeleteUsagePlan": {
      "http": {
        "method": "DELETE",
        "requestUri": "/usageplans/{usageplanId}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          }
        }
      }
    },
    "DeleteUsagePlanKey": {
      "http": {
        "method": "DELETE",
        "requestUri": "/usageplans/{usageplanId}/keys/{keyId}",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId",
          "keyId"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          },
          "keyId": {
            "location": "uri",
            "locationName": "keyId"
          }
        }
      }
    },
    "FlushStageAuthorizersCache": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/stages/{stage_name}/cache/authorizers",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {
            "location": "uri",
            "locationName": "stage_name"
          }
        }
      }
    },
    "FlushStageCache": {
      "http": {
        "method": "DELETE",
        "requestUri": "/restapis/{restapi_id}/stages/{stage_name}/cache/data",
        "responseCode": 202
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {
            "location": "uri",
            "locationName": "stage_name"
          }
        }
      }
    },
    "GenerateClientCertificate": {
      "http": {
        "requestUri": "/clientcertificates",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "members": {
          "description": {}
        }
      },
      "output": {
        "shape": "S2h"
      }
    },
    "GetAccount": {
      "http": {
        "method": "GET",
        "requestUri": "/account"
      },
      "input": {
        "type": "structure",
        "members": {}
      },
      "output": {
        "shape": "S2j"
      }
    },
    "GetApiKey": {
      "http": {
        "method": "GET",
        "requestUri": "/apikeys/{api_Key}"
      },
      "input": {
        "type": "structure",
        "required": [
          "apiKey"
        ],
        "members": {
          "apiKey": {
            "location": "uri",
            "locationName": "api_Key"
          },
          "includeValue": {
            "location": "querystring",
            "locationName": "includeValue",
            "type": "boolean"
          }
        }
      },
      "output": {
        "shape": "S6"
      }
    },
    "GetApiKeys": {
      "http": {
        "method": "GET",
        "requestUri": "/apikeys"
      },
      "input": {
        "type": "structure",
        "members": {
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          },
          "nameQuery": {
            "location": "querystring",
            "locationName": "name"
          },
          "customerId": {
            "location": "querystring",
            "locationName": "customerId"
          },
          "includeValues": {
            "location": "querystring",
            "locationName": "includeValues",
            "type": "boolean"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "warnings": {
            "shape": "S8"
          },
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "S6"
            }
          }
        }
      }
    },
    "GetAuthorizer": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/authorizers/{authorizer_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "authorizerId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "authorizerId": {
            "location": "uri",
            "locationName": "authorizer_id"
          }
        }
      },
      "output": {
        "shape": "Se"
      }
    },
    "GetAuthorizers": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/authorizers"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "Se"
            }
          }
        }
      }
    },
    "GetBasePathMapping": {
      "http": {
        "method": "GET",
        "requestUri": "/domainnames/{domain_name}/basepathmappings/{base_path}"
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName",
          "basePath"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          },
          "basePath": {
            "location": "uri",
            "locationName": "base_path"
          }
        }
      },
      "output": {
        "shape": "Sg"
      }
    },
    "GetBasePathMappings": {
      "http": {
        "method": "GET",
        "requestUri": "/domainnames/{domain_name}/basepathmappings"
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "Sg"
            }
          }
        }
      }
    },
    "GetClientCertificate": {
      "http": {
        "method": "GET",
        "requestUri": "/clientcertificates/{clientcertificate_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "clientCertificateId"
        ],
        "members": {
          "clientCertificateId": {
            "location": "uri",
            "locationName": "clientcertificate_id"
          }
        }
      },
      "output": {
        "shape": "S2h"
      }
    },
    "GetClientCertificates": {
      "http": {
        "method": "GET",
        "requestUri": "/clientcertificates"
      },
      "input": {
        "type": "structure",
        "members": {
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "S2h"
            }
          }
        }
      }
    },
    "GetDeployment": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/deployments/{deployment_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "deploymentId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "deploymentId": {
            "location": "uri",
            "locationName": "deployment_id"
          }
        }
      },
      "output": {
        "shape": "Sl"
      }
    },
    "GetDeployments": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/deployments"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "Sl"
            }
          }
        }
      }
    },
    "GetDocumentationPart": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/documentation/parts/{part_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "documentationPartId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "documentationPartId": {
            "location": "uri",
            "locationName": "part_id"
          }
        }
      },
      "output": {
        "shape": "St"
      }
    },
    "GetDocumentationParts": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/documentation/parts"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "type": {
            "location": "querystring",
            "locationName": "type"
          },
          "nameQuery": {
            "location": "querystring",
            "locationName": "name"
          },
          "path": {
            "location": "querystring",
            "locationName": "path"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "St"
            }
          }
        }
      }
    },
    "GetDocumentationVersion": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/documentation/versions/{doc_version}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "documentationVersion"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "documentationVersion": {
            "location": "uri",
            "locationName": "doc_version"
          }
        }
      },
      "output": {
        "shape": "Sv"
      }
    },
    "GetDocumentationVersions": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/documentation/versions"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "Sv"
            }
          }
        }
      }
    },
    "GetDomainName": {
      "http": {
        "method": "GET",
        "requestUri": "/domainnames/{domain_name}"
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          }
        }
      },
      "output": {
        "shape": "Sx"
      }
    },
    "GetDomainNames": {
      "http": {
        "method": "GET",
        "requestUri": "/domainnames"
      },
      "input": {
        "type": "structure",
        "members": {
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "Sx"
            }
          }
        }
      }
    },
    "GetExport": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/stages/{stage_name}/exports/{export_type}",
        "responseCode": 200
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName",
          "exportType"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {
            "location": "uri",
            "locationName": "stage_name"
          },
          "exportType": {
            "location": "uri",
            "locationName": "export_type"
          },
          "parameters": {
            "shape": "Sk",
            "location": "querystring"
          },
          "accepts": {
            "location": "header",
            "locationName": "Accept"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "contentType": {
            "location": "header",
            "locationName": "Content-Type"
          },
          "contentDisposition": {
            "location": "header",
            "locationName": "Content-Disposition"
          },
          "body": {
            "type": "blob"
          }
        },
        "payload": "body"
      }
    },
    "GetIntegration": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          }
        }
      },
      "output": {
        "shape": "S18"
      }
    },
    "GetIntegrationResponse": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration/responses/{status_code}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          }
        }
      },
      "output": {
        "shape": "S1c"
      }
    },
    "GetMethod": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          }
        }
      },
      "output": {
        "shape": "S13"
      }
    },
    "GetMethodResponse": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/responses/{status_code}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          }
        }
      },
      "output": {
        "shape": "S16"
      }
    },
    "GetModel": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/models/{model_name}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "modelName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "modelName": {
            "location": "uri",
            "locationName": "model_name"
          },
          "flatten": {
            "location": "querystring",
            "locationName": "flatten",
            "type": "boolean"
          }
        }
      },
      "output": {
        "shape": "Sz"
      }
    },
    "GetModelTemplate": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/models/{model_name}/default_template"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "modelName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "modelName": {
            "location": "uri",
            "locationName": "model_name"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "value": {}
        }
      }
    },
    "GetModels": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/models"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "Sz"
            }
          }
        }
      }
    },
    "GetResource": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          }
        }
      },
      "output": {
        "shape": "S11"
      }
    },
    "GetResources": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/resources"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "S11"
            }
          }
        }
      }
    },
    "GetRestApi": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          }
        }
      },
      "output": {
        "shape": "S1e"
      }
    },
    "GetRestApis": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis"
      },
      "input": {
        "type": "structure",
        "members": {
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "S1e"
            }
          }
        }
      }
    },
    "GetSdk": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/stages/{stage_name}/sdks/{sdk_type}",
        "responseCode": 200
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName",
          "sdkType"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {
            "location": "uri",
            "locationName": "stage_name"
          },
          "sdkType": {
            "location": "uri",
            "locationName": "sdk_type"
          },
          "parameters": {
            "shape": "Sk",
            "location": "querystring"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "contentType": {
            "location": "header",
            "locationName": "Content-Type"
          },
          "contentDisposition": {
            "location": "header",
            "locationName": "Content-Disposition"
          },
          "body": {
            "type": "blob"
          }
        },
        "payload": "body"
      }
    },
    "GetSdkType": {
      "http": {
        "method": "GET",
        "requestUri": "/sdktypes/{sdktype_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "id"
        ],
        "members": {
          "id": {
            "location": "uri",
            "locationName": "sdktype_id"
          }
        }
      },
      "output": {
        "shape": "S44"
      }
    },
    "GetSdkTypes": {
      "http": {
        "method": "GET",
        "requestUri": "/sdktypes"
      },
      "input": {
        "type": "structure",
        "members": {
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "S44"
            }
          }
        }
      }
    },
    "GetStage": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/stages/{stage_name}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {
            "location": "uri",
            "locationName": "stage_name"
          }
        }
      },
      "output": {
        "shape": "S1g"
      }
    },
    "GetStages": {
      "http": {
        "method": "GET",
        "requestUri": "/restapis/{restapi_id}/stages"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "deploymentId": {
            "location": "querystring",
            "locationName": "deploymentId"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "item": {
            "type": "list",
            "member": {
              "shape": "S1g"
            }
          }
        }
      }
    },
    "GetUsage": {
      "http": {
        "method": "GET",
        "requestUri": "/usageplans/{usageplanId}/usage"
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId",
          "startDate",
          "endDate"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          },
          "keyId": {
            "location": "querystring",
            "locationName": "keyId"
          },
          "startDate": {
            "location": "querystring",
            "locationName": "startDate"
          },
          "endDate": {
            "location": "querystring",
            "locationName": "endDate"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "shape": "S4f"
      }
    },
    "GetUsagePlan": {
      "http": {
        "method": "GET",
        "requestUri": "/usageplans/{usageplanId}"
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          }
        }
      },
      "output": {
        "shape": "S1t"
      }
    },
    "GetUsagePlanKey": {
      "http": {
        "method": "GET",
        "requestUri": "/usageplans/{usageplanId}/keys/{keyId}",
        "responseCode": 200
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId",
          "keyId"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          },
          "keyId": {
            "location": "uri",
            "locationName": "keyId"
          }
        }
      },
      "output": {
        "shape": "S1v"
      }
    },
    "GetUsagePlanKeys": {
      "http": {
        "method": "GET",
        "requestUri": "/usageplans/{usageplanId}/keys"
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          },
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          },
          "nameQuery": {
            "location": "querystring",
            "locationName": "name"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "S1v"
            }
          }
        }
      }
    },
    "GetUsagePlans": {
      "http": {
        "method": "GET",
        "requestUri": "/usageplans"
      },
      "input": {
        "type": "structure",
        "members": {
          "position": {
            "location": "querystring",
            "locationName": "position"
          },
          "keyId": {
            "location": "querystring",
            "locationName": "keyId"
          },
          "limit": {
            "location": "querystring",
            "locationName": "limit",
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "position": {},
          "items": {
            "locationName": "item",
            "type": "list",
            "member": {
              "shape": "S1t"
            }
          }
        }
      }
    },
    "ImportApiKeys": {
      "http": {
        "requestUri": "/apikeys?mode=import",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "body",
          "format"
        ],
        "members": {
          "body": {
            "type": "blob"
          },
          "format": {
            "location": "querystring",
            "locationName": "format"
          },
          "failOnWarnings": {
            "location": "querystring",
            "locationName": "failonwarnings",
            "type": "boolean"
          }
        },
        "payload": "body"
      },
      "output": {
        "type": "structure",
        "members": {
          "ids": {
            "shape": "S8"
          },
          "warnings": {
            "shape": "S8"
          }
        }
      }
    },
    "ImportDocumentationParts": {
      "http": {
        "method": "PUT",
        "requestUri": "/restapis/{restapi_id}/documentation/parts"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "body"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "mode": {
            "location": "querystring",
            "locationName": "mode"
          },
          "failOnWarnings": {
            "location": "querystring",
            "locationName": "failonwarnings",
            "type": "boolean"
          },
          "body": {
            "type": "blob"
          }
        },
        "payload": "body"
      },
      "output": {
        "type": "structure",
        "members": {
          "ids": {
            "shape": "S8"
          },
          "warnings": {
            "shape": "S8"
          }
        }
      }
    },
    "ImportRestApi": {
      "http": {
        "requestUri": "/restapis?mode=import",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "body"
        ],
        "members": {
          "failOnWarnings": {
            "location": "querystring",
            "locationName": "failonwarnings",
            "type": "boolean"
          },
          "parameters": {
            "shape": "Sk",
            "location": "querystring"
          },
          "body": {
            "type": "blob"
          }
        },
        "payload": "body"
      },
      "output": {
        "shape": "S1e"
      }
    },
    "PutIntegration": {
      "http": {
        "method": "PUT",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "type"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "type": {},
          "integrationHttpMethod": {
            "locationName": "httpMethod"
          },
          "uri": {},
          "credentials": {},
          "requestParameters": {
            "shape": "Sk"
          },
          "requestTemplates": {
            "shape": "Sk"
          },
          "passthroughBehavior": {},
          "cacheNamespace": {},
          "cacheKeyParameters": {
            "shape": "S8"
          },
          "contentHandling": {}
        }
      },
      "output": {
        "shape": "S18"
      }
    },
    "PutIntegrationResponse": {
      "http": {
        "method": "PUT",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration/responses/{status_code}",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          },
          "selectionPattern": {},
          "responseParameters": {
            "shape": "Sk"
          },
          "responseTemplates": {
            "shape": "Sk"
          },
          "contentHandling": {}
        }
      },
      "output": {
        "shape": "S1c"
      }
    },
    "PutMethod": {
      "http": {
        "method": "PUT",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "authorizationType"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "authorizationType": {},
          "authorizerId": {},
          "apiKeyRequired": {
            "type": "boolean"
          },
          "operationName": {},
          "requestParameters": {
            "shape": "S14"
          },
          "requestModels": {
            "shape": "Sk"
          }
        }
      },
      "output": {
        "shape": "S13"
      }
    },
    "PutMethodResponse": {
      "http": {
        "method": "PUT",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/responses/{status_code}",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          },
          "responseParameters": {
            "shape": "S14"
          },
          "responseModels": {
            "shape": "Sk"
          }
        }
      },
      "output": {
        "shape": "S16"
      }
    },
    "PutRestApi": {
      "http": {
        "method": "PUT",
        "requestUri": "/restapis/{restapi_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "body"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "mode": {
            "location": "querystring",
            "locationName": "mode"
          },
          "failOnWarnings": {
            "location": "querystring",
            "locationName": "failonwarnings",
            "type": "boolean"
          },
          "parameters": {
            "shape": "Sk",
            "location": "querystring"
          },
          "body": {
            "type": "blob"
          }
        },
        "payload": "body"
      },
      "output": {
        "shape": "S1e"
      }
    },
    "TestInvokeAuthorizer": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/authorizers/{authorizer_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "authorizerId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "authorizerId": {
            "location": "uri",
            "locationName": "authorizer_id"
          },
          "headers": {
            "shape": "S55"
          },
          "pathWithQueryString": {},
          "body": {},
          "stageVariables": {
            "shape": "Sk"
          },
          "additionalContext": {
            "shape": "Sk"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "clientStatus": {
            "type": "integer"
          },
          "log": {},
          "latency": {
            "type": "long"
          },
          "principalId": {},
          "policy": {},
          "authorization": {
            "type": "map",
            "key": {},
            "value": {
              "shape": "S8"
            }
          },
          "claims": {
            "shape": "Sk"
          }
        }
      }
    },
    "TestInvokeMethod": {
      "http": {
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "pathWithQueryString": {},
          "body": {},
          "headers": {
            "shape": "S55"
          },
          "clientCertificateId": {},
          "stageVariables": {
            "shape": "Sk"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "status": {
            "type": "integer"
          },
          "body": {},
          "headers": {
            "shape": "S55"
          },
          "log": {},
          "latency": {
            "type": "long"
          }
        }
      }
    },
    "UpdateAccount": {
      "http": {
        "method": "PATCH",
        "requestUri": "/account"
      },
      "input": {
        "type": "structure",
        "members": {
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S2j"
      }
    },
    "UpdateApiKey": {
      "http": {
        "method": "PATCH",
        "requestUri": "/apikeys/{api_Key}"
      },
      "input": {
        "type": "structure",
        "required": [
          "apiKey"
        ],
        "members": {
          "apiKey": {
            "location": "uri",
            "locationName": "api_Key"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S6"
      }
    },
    "UpdateAuthorizer": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/authorizers/{authorizer_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "authorizerId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "authorizerId": {
            "location": "uri",
            "locationName": "authorizer_id"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "Se"
      }
    },
    "UpdateBasePathMapping": {
      "http": {
        "method": "PATCH",
        "requestUri": "/domainnames/{domain_name}/basepathmappings/{base_path}"
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName",
          "basePath"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          },
          "basePath": {
            "location": "uri",
            "locationName": "base_path"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "Sg"
      }
    },
    "UpdateClientCertificate": {
      "http": {
        "method": "PATCH",
        "requestUri": "/clientcertificates/{clientcertificate_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "clientCertificateId"
        ],
        "members": {
          "clientCertificateId": {
            "location": "uri",
            "locationName": "clientcertificate_id"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S2h"
      }
    },
    "UpdateDeployment": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/deployments/{deployment_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "deploymentId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "deploymentId": {
            "location": "uri",
            "locationName": "deployment_id"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "Sl"
      }
    },
    "UpdateDocumentationPart": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/documentation/parts/{part_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "documentationPartId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "documentationPartId": {
            "location": "uri",
            "locationName": "part_id"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "St"
      }
    },
    "UpdateDocumentationVersion": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/documentation/versions/{doc_version}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "documentationVersion"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "documentationVersion": {
            "location": "uri",
            "locationName": "doc_version"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "Sv"
      }
    },
    "UpdateDomainName": {
      "http": {
        "method": "PATCH",
        "requestUri": "/domainnames/{domain_name}"
      },
      "input": {
        "type": "structure",
        "required": [
          "domainName"
        ],
        "members": {
          "domainName": {
            "location": "uri",
            "locationName": "domain_name"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "Sx"
      }
    },
    "UpdateIntegration": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S18"
      }
    },
    "UpdateIntegrationResponse": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/integration/responses/{status_code}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S1c"
      }
    },
    "UpdateMethod": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S13"
      }
    },
    "UpdateMethodResponse": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}/methods/{http_method}/responses/{status_code}",
        "responseCode": 201
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId",
          "httpMethod",
          "statusCode"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "httpMethod": {
            "location": "uri",
            "locationName": "http_method"
          },
          "statusCode": {
            "location": "uri",
            "locationName": "status_code"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S16"
      }
    },
    "UpdateModel": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/models/{model_name}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "modelName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "modelName": {
            "location": "uri",
            "locationName": "model_name"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "Sz"
      }
    },
    "UpdateResource": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/resources/{resource_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "resourceId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "resourceId": {
            "location": "uri",
            "locationName": "resource_id"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S11"
      }
    },
    "UpdateRestApi": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S1e"
      }
    },
    "UpdateStage": {
      "http": {
        "method": "PATCH",
        "requestUri": "/restapis/{restapi_id}/stages/{stage_name}"
      },
      "input": {
        "type": "structure",
        "required": [
          "restApiId",
          "stageName"
        ],
        "members": {
          "restApiId": {
            "location": "uri",
            "locationName": "restapi_id"
          },
          "stageName": {
            "location": "uri",
            "locationName": "stage_name"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S1g"
      }
    },
    "UpdateUsage": {
      "http": {
        "method": "PATCH",
        "requestUri": "/usageplans/{usageplanId}/keys/{keyId}/usage"
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId",
          "keyId"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          },
          "keyId": {
            "location": "uri",
            "locationName": "keyId"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S4f"
      }
    },
    "UpdateUsagePlan": {
      "http": {
        "method": "PATCH",
        "requestUri": "/usageplans/{usageplanId}"
      },
      "input": {
        "type": "structure",
        "required": [
          "usagePlanId"
        ],
        "members": {
          "usagePlanId": {
            "location": "uri",
            "locationName": "usageplanId"
          },
          "patchOperations": {
            "shape": "S5b"
          }
        }
      },
      "output": {
        "shape": "S1t"
      }
    }
  },
  "shapes": {
    "S6": {
      "type": "structure",
      "members": {
        "id": {},
        "value": {},
        "name": {},
        "customerId": {},
        "description": {},
        "enabled": {
          "type": "boolean"
        },
        "createdDate": {
          "type": "timestamp"
        },
        "lastUpdatedDate": {
          "type": "timestamp"
        },
        "stageKeys": {
          "shape": "S8"
        }
      }
    },
    "S8": {
      "type": "list",
      "member": {}
    },
    "Sb": {
      "type": "list",
      "member": {}
    },
    "Se": {
      "type": "structure",
      "members": {
        "id": {},
        "name": {},
        "type": {},
        "providerARNs": {
          "shape": "Sb"
        },
        "authType": {},
        "authorizerUri": {},
        "authorizerCredentials": {},
        "identitySource": {},
        "identityValidationExpression": {},
        "authorizerResultTtlInSeconds": {
          "type": "integer"
        }
      }
    },
    "Sg": {
      "type": "structure",
      "members": {
        "basePath": {},
        "restApiId": {},
        "stage": {}
      }
    },
    "Sk": {
      "type": "map",
      "key": {},
      "value": {}
    },
    "Sl": {
      "type": "structure",
      "members": {
        "id": {},
        "description": {},
        "createdDate": {
          "type": "timestamp"
        },
        "apiSummary": {
          "type": "map",
          "key": {},
          "value": {
            "type": "map",
            "key": {},
            "value": {
              "type": "structure",
              "members": {
                "authorizationType": {},
                "apiKeyRequired": {
                  "type": "boolean"
                }
              }
            }
          }
        }
      }
    },
    "Sq": {
      "type": "structure",
      "required": [
        "type"
      ],
      "members": {
        "type": {},
        "path": {},
        "method": {},
        "statusCode": {},
        "name": {}
      }
    },
    "St": {
      "type": "structure",
      "members": {
        "id": {},
        "location": {
          "shape": "Sq"
        },
        "properties": {}
      }
    },
    "Sv": {
      "type": "structure",
      "members": {
        "version": {},
        "createdDate": {
          "type": "timestamp"
        },
        "description": {}
      }
    },
    "Sx": {
      "type": "structure",
      "members": {
        "domainName": {},
        "certificateName": {},
        "certificateUploadDate": {
          "type": "timestamp"
        },
        "distributionDomainName": {}
      }
    },
    "Sz": {
      "type": "structure",
      "members": {
        "id": {},
        "name": {},
        "description": {},
        "schema": {},
        "contentType": {}
      }
    },
    "S11": {
      "type": "structure",
      "members": {
        "id": {},
        "parentId": {},
        "pathPart": {},
        "path": {},
        "resourceMethods": {
          "type": "map",
          "key": {},
          "value": {
            "shape": "S13"
          }
        }
      }
    },
    "S13": {
      "type": "structure",
      "members": {
        "httpMethod": {},
        "authorizationType": {},
        "authorizerId": {},
        "apiKeyRequired": {
          "type": "boolean"
        },
        "operationName": {},
        "requestParameters": {
          "shape": "S14"
        },
        "requestModels": {
          "shape": "Sk"
        },
        "methodResponses": {
          "type": "map",
          "key": {},
          "value": {
            "shape": "S16"
          }
        },
        "methodIntegration": {
          "shape": "S18"
        }
      }
    },
    "S14": {
      "type": "map",
      "key": {},
      "value": {
        "type": "boolean"
      }
    },
    "S16": {
      "type": "structure",
      "members": {
        "statusCode": {},
        "responseParameters": {
          "shape": "S14"
        },
        "responseModels": {
          "shape": "Sk"
        }
      }
    },
    "S18": {
      "type": "structure",
      "members": {
        "type": {},
        "httpMethod": {},
        "uri": {},
        "credentials": {},
        "requestParameters": {
          "shape": "Sk"
        },
        "requestTemplates": {
          "shape": "Sk"
        },
        "passthroughBehavior": {},
        "contentHandling": {},
        "cacheNamespace": {},
        "cacheKeyParameters": {
          "shape": "S8"
        },
        "integrationResponses": {
          "type": "map",
          "key": {},
          "value": {
            "shape": "S1c"
          }
        }
      }
    },
    "S1c": {
      "type": "structure",
      "members": {
        "statusCode": {},
        "selectionPattern": {},
        "responseParameters": {
          "shape": "Sk"
        },
        "responseTemplates": {
          "shape": "Sk"
        },
        "contentHandling": {}
      }
    },
    "S1e": {
      "type": "structure",
      "members": {
        "id": {},
        "name": {},
        "description": {},
        "createdDate": {
          "type": "timestamp"
        },
        "version": {},
        "warnings": {
          "shape": "S8"
        },
        "binaryMediaTypes": {
          "shape": "S8"
        }
      }
    },
    "S1g": {
      "type": "structure",
      "members": {
        "deploymentId": {},
        "clientCertificateId": {},
        "stageName": {},
        "description": {},
        "cacheClusterEnabled": {
          "type": "boolean"
        },
        "cacheClusterSize": {},
        "cacheClusterStatus": {},
        "methodSettings": {
          "type": "map",
          "key": {},
          "value": {
            "type": "structure",
            "members": {
              "metricsEnabled": {
                "type": "boolean"
              },
              "loggingLevel": {},
              "dataTraceEnabled": {
                "type": "boolean"
              },
              "throttlingBurstLimit": {
                "type": "integer"
              },
              "throttlingRateLimit": {
                "type": "double"
              },
              "cachingEnabled": {
                "type": "boolean"
              },
              "cacheTtlInSeconds": {
                "type": "integer"
              },
              "cacheDataEncrypted": {
                "type": "boolean"
              },
              "requireAuthorizationForCacheControl": {
                "type": "boolean"
              },
              "unauthorizedCacheControlHeaderStrategy": {}
            }
          }
        },
        "variables": {
          "shape": "Sk"
        },
        "documentationVersion": {},
        "createdDate": {
          "type": "timestamp"
        },
        "lastUpdatedDate": {
          "type": "timestamp"
        }
      }
    },
    "S1o": {
      "type": "list",
      "member": {
        "type": "structure",
        "members": {
          "apiId": {},
          "stage": {}
        }
      }
    },
    "S1q": {
      "type": "structure",
      "members": {
        "burstLimit": {
          "type": "integer"
        },
        "rateLimit": {
          "type": "double"
        }
      }
    },
    "S1r": {
      "type": "structure",
      "members": {
        "limit": {
          "type": "integer"
        },
        "offset": {
          "type": "integer"
        },
        "period": {}
      }
    },
    "S1t": {
      "type": "structure",
      "members": {
        "id": {},
        "name": {},
        "description": {},
        "apiStages": {
          "shape": "S1o"
        },
        "throttle": {
          "shape": "S1q"
        },
        "quota": {
          "shape": "S1r"
        },
        "productCode": {}
      }
    },
    "S1v": {
      "type": "structure",
      "members": {
        "id": {},
        "type": {},
        "value": {},
        "name": {}
      }
    },
    "S2h": {
      "type": "structure",
      "members": {
        "clientCertificateId": {},
        "description": {},
        "pemEncodedCertificate": {},
        "createdDate": {
          "type": "timestamp"
        },
        "expirationDate": {
          "type": "timestamp"
        }
      }
    },
    "S2j": {
      "type": "structure",
      "members": {
        "cloudwatchRoleArn": {},
        "throttleSettings": {
          "shape": "S1q"
        },
        "features": {
          "shape": "S8"
        },
        "apiKeyVersion": {}
      }
    },
    "S44": {
      "type": "structure",
      "members": {
        "id": {},
        "friendlyName": {},
        "description": {},
        "configurationProperties": {
          "type": "list",
          "member": {
            "type": "structure",
            "members": {
              "name": {},
              "friendlyName": {},
              "description": {},
              "required": {
                "type": "boolean"
              },
              "defaultValue": {}
            }
          }
        }
      }
    },
    "S4f": {
      "type": "structure",
      "members": {
        "usagePlanId": {},
        "startDate": {},
        "endDate": {},
        "position": {},
        "items": {
          "locationName": "values",
          "type": "map",
          "key": {},
          "value": {
            "type": "list",
            "member": {
              "type": "list",
              "member": {
                "type": "long"
              }
            }
          }
        }
      }
    },
    "S55": {
      "type": "map",
      "key": {},
      "value": {}
    },
    "S5b": {
      "type": "list",
      "member": {
        "type": "structure",
        "members": {
          "op": {},
          "path": {},
          "value": {},
          "from": {}
        }
      }
    }
  }
}
},{}],4:[function(require,module,exports){
module.exports={
  "pagination": {
    "GetApiKeys": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetBasePathMappings": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetClientCertificates": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetDeployments": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetDomainNames": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetModels": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetResources": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetRestApis": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetUsage": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetUsagePlans": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    },
    "GetUsagePlanKeys": {
      "input_token": "position",
      "output_token": "position",
      "limit_key": "limit",
      "result_key": "items"
    }
  }
}

},{}],5:[function(require,module,exports){
module.exports={
  "version": "2.0",
  "metadata": {
    "apiVersion": "2016-02-06",
    "endpointPrefix": "autoscaling",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "Application Auto Scaling",
    "signatureVersion": "v4",
    "signingName": "application-autoscaling",
    "targetPrefix": "AnyScaleFrontendService",
    "uid": "application-autoscaling-2016-02-06"
  },
  "operations": {
    "DeleteScalingPolicy": {
      "input": {
        "type": "structure",
        "required": [
          "PolicyName",
          "ServiceNamespace",
          "ResourceId",
          "ScalableDimension"
        ],
        "members": {
          "PolicyName": {},
          "ServiceNamespace": {},
          "ResourceId": {},
          "ScalableDimension": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {}
      }
    },
    "DeregisterScalableTarget": {
      "input": {
        "type": "structure",
        "required": [
          "ServiceNamespace",
          "ResourceId",
          "ScalableDimension"
        ],
        "members": {
          "ServiceNamespace": {},
          "ResourceId": {},
          "ScalableDimension": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {}
      }
    },
    "DescribeScalableTargets": {
      "input": {
        "type": "structure",
        "required": [
          "ServiceNamespace"
        ],
        "members": {
          "ServiceNamespace": {},
          "ResourceIds": {
            "shape": "S9"
          },
          "ScalableDimension": {},
          "MaxResults": {
            "type": "integer"
          },
          "NextToken": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "ScalableTargets": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "ServiceNamespace",
                "ResourceId",
                "ScalableDimension",
                "MinCapacity",
                "MaxCapacity",
                "RoleARN",
                "CreationTime"
              ],
              "members": {
                "ServiceNamespace": {},
                "ResourceId": {},
                "ScalableDimension": {},
                "MinCapacity": {
                  "type": "integer"
                },
                "MaxCapacity": {
                  "type": "integer"
                },
                "RoleARN": {},
                "CreationTime": {
                  "type": "timestamp"
                }
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeScalingActivities": {
      "input": {
        "type": "structure",
        "required": [
          "ServiceNamespace"
        ],
        "members": {
          "ServiceNamespace": {},
          "ResourceId": {},
          "ScalableDimension": {},
          "MaxResults": {
            "type": "integer"
          },
          "NextToken": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "ScalingActivities": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "ActivityId",
                "ServiceNamespace",
                "ResourceId",
                "ScalableDimension",
                "Description",
                "Cause",
                "StartTime",
                "StatusCode"
              ],
              "members": {
                "ActivityId": {},
                "ServiceNamespace": {},
                "ResourceId": {},
                "ScalableDimension": {},
                "Description": {},
                "Cause": {},
                "StartTime": {
                  "type": "timestamp"
                },
                "EndTime": {
                  "type": "timestamp"
                },
                "StatusCode": {},
                "StatusMessage": {},
                "Details": {}
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeScalingPolicies": {
      "input": {
        "type": "structure",
        "required": [
          "ServiceNamespace"
        ],
        "members": {
          "PolicyNames": {
            "shape": "S9"
          },
          "ServiceNamespace": {},
          "ResourceId": {},
          "ScalableDimension": {},
          "MaxResults": {
            "type": "integer"
          },
          "NextToken": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "ScalingPolicies": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "PolicyARN",
                "PolicyName",
                "ServiceNamespace",
                "ResourceId",
                "ScalableDimension",
                "PolicyType",
                "CreationTime"
              ],
              "members": {
                "PolicyARN": {},
                "PolicyName": {},
                "ServiceNamespace": {},
                "ResourceId": {},
                "ScalableDimension": {},
                "PolicyType": {},
                "StepScalingPolicyConfiguration": {
                  "shape": "St"
                },
                "Alarms": {
                  "type": "list",
                  "member": {
                    "type": "structure",
                    "required": [
                      "AlarmName",
                      "AlarmARN"
                    ],
                    "members": {
                      "AlarmName": {},
                      "AlarmARN": {}
                    }
                  }
                },
                "CreationTime": {
                  "type": "timestamp"
                }
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "PutScalingPolicy": {
      "input": {
        "type": "structure",
        "required": [
          "PolicyName",
          "ServiceNamespace",
          "ResourceId",
          "ScalableDimension"
        ],
        "members": {
          "PolicyName": {},
          "ServiceNamespace": {},
          "ResourceId": {},
          "ScalableDimension": {},
          "PolicyType": {},
          "StepScalingPolicyConfiguration": {
            "shape": "St"
          }
        }
      },
      "output": {
        "type": "structure",
        "required": [
          "PolicyARN"
        ],
        "members": {
          "PolicyARN": {}
        }
      }
    },
    "RegisterScalableTarget": {
      "input": {
        "type": "structure",
        "required": [
          "ServiceNamespace",
          "ResourceId",
          "ScalableDimension"
        ],
        "members": {
          "ServiceNamespace": {},
          "ResourceId": {},
          "ScalableDimension": {},
          "MinCapacity": {
            "type": "integer"
          },
          "MaxCapacity": {
            "type": "integer"
          },
          "RoleARN": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {}
      }
    }
  },
  "shapes": {
    "S9": {
      "type": "list",
      "member": {}
    },
    "St": {
      "type": "structure",
      "members": {
        "AdjustmentType": {},
        "StepAdjustments": {
          "type": "list",
          "member": {
            "type": "structure",
            "required": [
              "ScalingAdjustment"
            ],
            "members": {
              "MetricIntervalLowerBound": {
                "type": "double"
              },
              "MetricIntervalUpperBound": {
                "type": "double"
              },
              "ScalingAdjustment": {
                "type": "integer"
              }
            }
          }
        },
        "MinAdjustmentMagnitude": {
          "type": "integer"
        },
        "Cooldown": {
          "type": "integer"
        },
        "MetricAggregationType": {}
      }
    }
  }
}
},{}],6:[function(require,module,exports){
module.exports={
  "pagination": {
    "DescribeScalableTargets": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxResults",
      "result_key": "ScalableTargets"
    },
    "DescribeScalingPolicies": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxResults",
      "result_key": "ScalingPolicies"
    },
    "DescribeScalingActivities": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxResults",
      "result_key": "ScalingActivities"
    }
  }
}

},{}],7:[function(require,module,exports){
module.exports={
  "version": "2.0",
  "metadata": {
    "apiVersion": "2011-01-01",
    "endpointPrefix": "autoscaling",
    "protocol": "query",
    "serviceFullName": "Auto Scaling",
    "signatureVersion": "v4",
    "uid": "autoscaling-2011-01-01",
    "xmlNamespace": "http://autoscaling.amazonaws.com/doc/2011-01-01/"
  },
  "operations": {
    "AttachInstances": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "InstanceIds": {
            "shape": "S2"
          },
          "AutoScalingGroupName": {}
        }
      }
    },
    "AttachLoadBalancerTargetGroups": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "TargetGroupARNs"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "TargetGroupARNs": {
            "shape": "S6"
          }
        }
      },
      "output": {
        "resultWrapper": "AttachLoadBalancerTargetGroupsResult",
        "type": "structure",
        "members": {}
      }
    },
    "AttachLoadBalancers": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "LoadBalancerNames"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "LoadBalancerNames": {
            "shape": "Sa"
          }
        }
      },
      "output": {
        "resultWrapper": "AttachLoadBalancersResult",
        "type": "structure",
        "members": {}
      }
    },
    "CompleteLifecycleAction": {
      "input": {
        "type": "structure",
        "required": [
          "LifecycleHookName",
          "AutoScalingGroupName",
          "LifecycleActionResult"
        ],
        "members": {
          "LifecycleHookName": {},
          "AutoScalingGroupName": {},
          "LifecycleActionToken": {},
          "LifecycleActionResult": {},
          "InstanceId": {}
        }
      },
      "output": {
        "resultWrapper": "CompleteLifecycleActionResult",
        "type": "structure",
        "members": {}
      }
    },
    "CreateAutoScalingGroup": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "MinSize",
          "MaxSize"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "LaunchConfigurationName": {},
          "InstanceId": {},
          "MinSize": {
            "type": "integer"
          },
          "MaxSize": {
            "type": "integer"
          },
          "DesiredCapacity": {
            "type": "integer"
          },
          "DefaultCooldown": {
            "type": "integer"
          },
          "AvailabilityZones": {
            "shape": "Sn"
          },
          "LoadBalancerNames": {
            "shape": "Sa"
          },
          "TargetGroupARNs": {
            "shape": "S6"
          },
          "HealthCheckType": {},
          "HealthCheckGracePeriod": {
            "type": "integer"
          },
          "PlacementGroup": {},
          "VPCZoneIdentifier": {},
          "TerminationPolicies": {
            "shape": "Sr"
          },
          "NewInstancesProtectedFromScaleIn": {
            "type": "boolean"
          },
          "Tags": {
            "shape": "Su"
          }
        }
      }
    },
    "CreateLaunchConfiguration": {
      "input": {
        "type": "structure",
        "required": [
          "LaunchConfigurationName"
        ],
        "members": {
          "LaunchConfigurationName": {},
          "ImageId": {},
          "KeyName": {},
          "SecurityGroups": {
            "shape": "S11"
          },
          "ClassicLinkVPCId": {},
          "ClassicLinkVPCSecurityGroups": {
            "shape": "S12"
          },
          "UserData": {},
          "InstanceId": {},
          "InstanceType": {},
          "KernelId": {},
          "RamdiskId": {},
          "BlockDeviceMappings": {
            "shape": "S14"
          },
          "InstanceMonitoring": {
            "shape": "S1d"
          },
          "SpotPrice": {},
          "IamInstanceProfile": {},
          "EbsOptimized": {
            "type": "boolean"
          },
          "AssociatePublicIpAddress": {
            "type": "boolean"
          },
          "PlacementTenancy": {}
        }
      }
    },
    "CreateOrUpdateTags": {
      "input": {
        "type": "structure",
        "required": [
          "Tags"
        ],
        "members": {
          "Tags": {
            "shape": "Su"
          }
        }
      }
    },
    "DeleteAutoScalingGroup": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "ForceDelete": {
            "type": "boolean"
          }
        }
      }
    },
    "DeleteLaunchConfiguration": {
      "input": {
        "type": "structure",
        "required": [
          "LaunchConfigurationName"
        ],
        "members": {
          "LaunchConfigurationName": {}
        }
      }
    },
    "DeleteLifecycleHook": {
      "input": {
        "type": "structure",
        "required": [
          "LifecycleHookName",
          "AutoScalingGroupName"
        ],
        "members": {
          "LifecycleHookName": {},
          "AutoScalingGroupName": {}
        }
      },
      "output": {
        "resultWrapper": "DeleteLifecycleHookResult",
        "type": "structure",
        "members": {}
      }
    },
    "DeleteNotificationConfiguration": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "TopicARN"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "TopicARN": {}
        }
      }
    },
    "DeletePolicy": {
      "input": {
        "type": "structure",
        "required": [
          "PolicyName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "PolicyName": {}
        }
      }
    },
    "DeleteScheduledAction": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "ScheduledActionName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "ScheduledActionName": {}
        }
      }
    },
    "DeleteTags": {
      "input": {
        "type": "structure",
        "required": [
          "Tags"
        ],
        "members": {
          "Tags": {
            "shape": "Su"
          }
        }
      }
    },
    "DescribeAccountLimits": {
      "output": {
        "resultWrapper": "DescribeAccountLimitsResult",
        "type": "structure",
        "members": {
          "MaxNumberOfAutoScalingGroups": {
            "type": "integer"
          },
          "MaxNumberOfLaunchConfigurations": {
            "type": "integer"
          },
          "NumberOfAutoScalingGroups": {
            "type": "integer"
          },
          "NumberOfLaunchConfigurations": {
            "type": "integer"
          }
        }
      }
    },
    "DescribeAdjustmentTypes": {
      "output": {
        "resultWrapper": "DescribeAdjustmentTypesResult",
        "type": "structure",
        "members": {
          "AdjustmentTypes": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "AdjustmentType": {}
              }
            }
          }
        }
      }
    },
    "DescribeAutoScalingGroups": {
      "input": {
        "type": "structure",
        "members": {
          "AutoScalingGroupNames": {
            "shape": "S22"
          },
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeAutoScalingGroupsResult",
        "type": "structure",
        "required": [
          "AutoScalingGroups"
        ],
        "members": {
          "AutoScalingGroups": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "AutoScalingGroupName",
                "MinSize",
                "MaxSize",
                "DesiredCapacity",
                "DefaultCooldown",
                "AvailabilityZones",
                "HealthCheckType",
                "CreatedTime"
              ],
              "members": {
                "AutoScalingGroupName": {},
                "AutoScalingGroupARN": {},
                "LaunchConfigurationName": {},
                "MinSize": {
                  "type": "integer"
                },
                "MaxSize": {
                  "type": "integer"
                },
                "DesiredCapacity": {
                  "type": "integer"
                },
                "DefaultCooldown": {
                  "type": "integer"
                },
                "AvailabilityZones": {
                  "shape": "Sn"
                },
                "LoadBalancerNames": {
                  "shape": "Sa"
                },
                "TargetGroupARNs": {
                  "shape": "S6"
                },
                "HealthCheckType": {},
                "HealthCheckGracePeriod": {
                  "type": "integer"
                },
                "Instances": {
                  "type": "list",
                  "member": {
                    "type": "structure",
                    "required": [
                      "InstanceId",
                      "AvailabilityZone",
                      "LifecycleState",
                      "HealthStatus",
                      "LaunchConfigurationName",
                      "ProtectedFromScaleIn"
                    ],
                    "members": {
                      "InstanceId": {},
                      "AvailabilityZone": {},
                      "LifecycleState": {},
                      "HealthStatus": {},
                      "LaunchConfigurationName": {},
                      "ProtectedFromScaleIn": {
                        "type": "boolean"
                      }
                    }
                  }
                },
                "CreatedTime": {
                  "type": "timestamp"
                },
                "SuspendedProcesses": {
                  "type": "list",
                  "member": {
                    "type": "structure",
                    "members": {
                      "ProcessName": {},
                      "SuspensionReason": {}
                    }
                  }
                },
                "PlacementGroup": {},
                "VPCZoneIdentifier": {},
                "EnabledMetrics": {
                  "type": "list",
                  "member": {
                    "type": "structure",
                    "members": {
                      "Metric": {},
                      "Granularity": {}
                    }
                  }
                },
                "Status": {},
                "Tags": {
                  "shape": "S2f"
                },
                "TerminationPolicies": {
                  "shape": "Sr"
                },
                "NewInstancesProtectedFromScaleIn": {
                  "type": "boolean"
                }
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeAutoScalingInstances": {
      "input": {
        "type": "structure",
        "members": {
          "InstanceIds": {
            "shape": "S2"
          },
          "MaxRecords": {
            "type": "integer"
          },
          "NextToken": {}
        }
      },
      "output": {
        "resultWrapper": "DescribeAutoScalingInstancesResult",
        "type": "structure",
        "members": {
          "AutoScalingInstances": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "InstanceId",
                "AutoScalingGroupName",
                "AvailabilityZone",
                "LifecycleState",
                "HealthStatus",
                "LaunchConfigurationName",
                "ProtectedFromScaleIn"
              ],
              "members": {
                "InstanceId": {},
                "AutoScalingGroupName": {},
                "AvailabilityZone": {},
                "LifecycleState": {},
                "HealthStatus": {},
                "LaunchConfigurationName": {},
                "ProtectedFromScaleIn": {
                  "type": "boolean"
                }
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeAutoScalingNotificationTypes": {
      "output": {
        "resultWrapper": "DescribeAutoScalingNotificationTypesResult",
        "type": "structure",
        "members": {
          "AutoScalingNotificationTypes": {
            "shape": "S2m"
          }
        }
      }
    },
    "DescribeLaunchConfigurations": {
      "input": {
        "type": "structure",
        "members": {
          "LaunchConfigurationNames": {
            "type": "list",
            "member": {}
          },
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeLaunchConfigurationsResult",
        "type": "structure",
        "required": [
          "LaunchConfigurations"
        ],
        "members": {
          "LaunchConfigurations": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "LaunchConfigurationName",
                "ImageId",
                "InstanceType",
                "CreatedTime"
              ],
              "members": {
                "LaunchConfigurationName": {},
                "LaunchConfigurationARN": {},
                "ImageId": {},
                "KeyName": {},
                "SecurityGroups": {
                  "shape": "S11"
                },
                "ClassicLinkVPCId": {},
                "ClassicLinkVPCSecurityGroups": {
                  "shape": "S12"
                },
                "UserData": {},
                "InstanceType": {},
                "KernelId": {},
                "RamdiskId": {},
                "BlockDeviceMappings": {
                  "shape": "S14"
                },
                "InstanceMonitoring": {
                  "shape": "S1d"
                },
                "SpotPrice": {},
                "IamInstanceProfile": {},
                "CreatedTime": {
                  "type": "timestamp"
                },
                "EbsOptimized": {
                  "type": "boolean"
                },
                "AssociatePublicIpAddress": {
                  "type": "boolean"
                },
                "PlacementTenancy": {}
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeLifecycleHookTypes": {
      "output": {
        "resultWrapper": "DescribeLifecycleHookTypesResult",
        "type": "structure",
        "members": {
          "LifecycleHookTypes": {
            "shape": "S2m"
          }
        }
      }
    },
    "DescribeLifecycleHooks": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "LifecycleHookNames": {
            "type": "list",
            "member": {}
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeLifecycleHooksResult",
        "type": "structure",
        "members": {
          "LifecycleHooks": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "LifecycleHookName": {},
                "AutoScalingGroupName": {},
                "LifecycleTransition": {},
                "NotificationTargetARN": {},
                "RoleARN": {},
                "NotificationMetadata": {},
                "HeartbeatTimeout": {
                  "type": "integer"
                },
                "GlobalTimeout": {
                  "type": "integer"
                },
                "DefaultResult": {}
              }
            }
          }
        }
      }
    },
    "DescribeLoadBalancerTargetGroups": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeLoadBalancerTargetGroupsResult",
        "type": "structure",
        "members": {
          "LoadBalancerTargetGroups": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "LoadBalancerTargetGroupARN": {},
                "State": {}
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeLoadBalancers": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeLoadBalancersResult",
        "type": "structure",
        "members": {
          "LoadBalancers": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "LoadBalancerName": {},
                "State": {}
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeMetricCollectionTypes": {
      "output": {
        "resultWrapper": "DescribeMetricCollectionTypesResult",
        "type": "structure",
        "members": {
          "Metrics": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "Metric": {}
              }
            }
          },
          "Granularities": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "Granularity": {}
              }
            }
          }
        }
      }
    },
    "DescribeNotificationConfigurations": {
      "input": {
        "type": "structure",
        "members": {
          "AutoScalingGroupNames": {
            "shape": "S22"
          },
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeNotificationConfigurationsResult",
        "type": "structure",
        "required": [
          "NotificationConfigurations"
        ],
        "members": {
          "NotificationConfigurations": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "AutoScalingGroupName": {},
                "TopicARN": {},
                "NotificationType": {}
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribePolicies": {
      "input": {
        "type": "structure",
        "members": {
          "AutoScalingGroupName": {},
          "PolicyNames": {
            "type": "list",
            "member": {}
          },
          "PolicyTypes": {
            "type": "list",
            "member": {}
          },
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribePoliciesResult",
        "type": "structure",
        "members": {
          "ScalingPolicies": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "AutoScalingGroupName": {},
                "PolicyName": {},
                "PolicyARN": {},
                "PolicyType": {},
                "AdjustmentType": {},
                "MinAdjustmentStep": {
                  "shape": "S3p"
                },
                "MinAdjustmentMagnitude": {
                  "type": "integer"
                },
                "ScalingAdjustment": {
                  "type": "integer"
                },
                "Cooldown": {
                  "type": "integer"
                },
                "StepAdjustments": {
                  "shape": "S3s"
                },
                "MetricAggregationType": {},
                "EstimatedInstanceWarmup": {
                  "type": "integer"
                },
                "Alarms": {
                  "type": "list",
                  "member": {
                    "type": "structure",
                    "members": {
                      "AlarmName": {},
                      "AlarmARN": {}
                    }
                  }
                }
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeScalingActivities": {
      "input": {
        "type": "structure",
        "members": {
          "ActivityIds": {
            "type": "list",
            "member": {}
          },
          "AutoScalingGroupName": {},
          "MaxRecords": {
            "type": "integer"
          },
          "NextToken": {}
        }
      },
      "output": {
        "resultWrapper": "DescribeScalingActivitiesResult",
        "type": "structure",
        "required": [
          "Activities"
        ],
        "members": {
          "Activities": {
            "shape": "S41"
          },
          "NextToken": {}
        }
      }
    },
    "DescribeScalingProcessTypes": {
      "output": {
        "resultWrapper": "DescribeScalingProcessTypesResult",
        "type": "structure",
        "members": {
          "Processes": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "ProcessName"
              ],
              "members": {
                "ProcessName": {}
              }
            }
          }
        }
      }
    },
    "DescribeScheduledActions": {
      "input": {
        "type": "structure",
        "members": {
          "AutoScalingGroupName": {},
          "ScheduledActionNames": {
            "type": "list",
            "member": {}
          },
          "StartTime": {
            "type": "timestamp"
          },
          "EndTime": {
            "type": "timestamp"
          },
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeScheduledActionsResult",
        "type": "structure",
        "members": {
          "ScheduledUpdateGroupActions": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "AutoScalingGroupName": {},
                "ScheduledActionName": {},
                "ScheduledActionARN": {},
                "Time": {
                  "type": "timestamp"
                },
                "StartTime": {
                  "type": "timestamp"
                },
                "EndTime": {
                  "type": "timestamp"
                },
                "Recurrence": {},
                "MinSize": {
                  "type": "integer"
                },
                "MaxSize": {
                  "type": "integer"
                },
                "DesiredCapacity": {
                  "type": "integer"
                }
              }
            }
          },
          "NextToken": {}
        }
      }
    },
    "DescribeTags": {
      "input": {
        "type": "structure",
        "members": {
          "Filters": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "Name": {},
                "Values": {
                  "type": "list",
                  "member": {}
                }
              }
            }
          },
          "NextToken": {},
          "MaxRecords": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "DescribeTagsResult",
        "type": "structure",
        "members": {
          "Tags": {
            "shape": "S2f"
          },
          "NextToken": {}
        }
      }
    },
    "DescribeTerminationPolicyTypes": {
      "output": {
        "resultWrapper": "DescribeTerminationPolicyTypesResult",
        "type": "structure",
        "members": {
          "TerminationPolicyTypes": {
            "shape": "Sr"
          }
        }
      }
    },
    "DetachInstances": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "ShouldDecrementDesiredCapacity"
        ],
        "members": {
          "InstanceIds": {
            "shape": "S2"
          },
          "AutoScalingGroupName": {},
          "ShouldDecrementDesiredCapacity": {
            "type": "boolean"
          }
        }
      },
      "output": {
        "resultWrapper": "DetachInstancesResult",
        "type": "structure",
        "members": {
          "Activities": {
            "shape": "S41"
          }
        }
      }
    },
    "DetachLoadBalancerTargetGroups": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "TargetGroupARNs"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "TargetGroupARNs": {
            "shape": "S6"
          }
        }
      },
      "output": {
        "resultWrapper": "DetachLoadBalancerTargetGroupsResult",
        "type": "structure",
        "members": {}
      }
    },
    "DetachLoadBalancers": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "LoadBalancerNames"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "LoadBalancerNames": {
            "shape": "Sa"
          }
        }
      },
      "output": {
        "resultWrapper": "DetachLoadBalancersResult",
        "type": "structure",
        "members": {}
      }
    },
    "DisableMetricsCollection": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "Metrics": {
            "shape": "S4r"
          }
        }
      }
    },
    "EnableMetricsCollection": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "Granularity"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "Metrics": {
            "shape": "S4r"
          },
          "Granularity": {}
        }
      }
    },
    "EnterStandby": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "ShouldDecrementDesiredCapacity"
        ],
        "members": {
          "InstanceIds": {
            "shape": "S2"
          },
          "AutoScalingGroupName": {},
          "ShouldDecrementDesiredCapacity": {
            "type": "boolean"
          }
        }
      },
      "output": {
        "resultWrapper": "EnterStandbyResult",
        "type": "structure",
        "members": {
          "Activities": {
            "shape": "S41"
          }
        }
      }
    },
    "ExecutePolicy": {
      "input": {
        "type": "structure",
        "required": [
          "PolicyName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "PolicyName": {},
          "HonorCooldown": {
            "type": "boolean"
          },
          "MetricValue": {
            "type": "double"
          },
          "BreachThreshold": {
            "type": "double"
          }
        }
      }
    },
    "ExitStandby": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "InstanceIds": {
            "shape": "S2"
          },
          "AutoScalingGroupName": {}
        }
      },
      "output": {
        "resultWrapper": "ExitStandbyResult",
        "type": "structure",
        "members": {
          "Activities": {
            "shape": "S41"
          }
        }
      }
    },
    "PutLifecycleHook": {
      "input": {
        "type": "structure",
        "required": [
          "LifecycleHookName",
          "AutoScalingGroupName"
        ],
        "members": {
          "LifecycleHookName": {},
          "AutoScalingGroupName": {},
          "LifecycleTransition": {},
          "RoleARN": {},
          "NotificationTargetARN": {},
          "NotificationMetadata": {},
          "HeartbeatTimeout": {
            "type": "integer"
          },
          "DefaultResult": {}
        }
      },
      "output": {
        "resultWrapper": "PutLifecycleHookResult",
        "type": "structure",
        "members": {}
      }
    },
    "PutNotificationConfiguration": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "TopicARN",
          "NotificationTypes"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "TopicARN": {},
          "NotificationTypes": {
            "shape": "S2m"
          }
        }
      }
    },
    "PutScalingPolicy": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "PolicyName",
          "AdjustmentType"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "PolicyName": {},
          "PolicyType": {},
          "AdjustmentType": {},
          "MinAdjustmentStep": {
            "shape": "S3p"
          },
          "MinAdjustmentMagnitude": {
            "type": "integer"
          },
          "ScalingAdjustment": {
            "type": "integer"
          },
          "Cooldown": {
            "type": "integer"
          },
          "MetricAggregationType": {},
          "StepAdjustments": {
            "shape": "S3s"
          },
          "EstimatedInstanceWarmup": {
            "type": "integer"
          }
        }
      },
      "output": {
        "resultWrapper": "PutScalingPolicyResult",
        "type": "structure",
        "members": {
          "PolicyARN": {}
        }
      }
    },
    "PutScheduledUpdateGroupAction": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "ScheduledActionName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "ScheduledActionName": {},
          "Time": {
            "type": "timestamp"
          },
          "StartTime": {
            "type": "timestamp"
          },
          "EndTime": {
            "type": "timestamp"
          },
          "Recurrence": {},
          "MinSize": {
            "type": "integer"
          },
          "MaxSize": {
            "type": "integer"
          },
          "DesiredCapacity": {
            "type": "integer"
          }
        }
      }
    },
    "RecordLifecycleActionHeartbeat": {
      "input": {
        "type": "structure",
        "required": [
          "LifecycleHookName",
          "AutoScalingGroupName"
        ],
        "members": {
          "LifecycleHookName": {},
          "AutoScalingGroupName": {},
          "LifecycleActionToken": {},
          "InstanceId": {}
        }
      },
      "output": {
        "resultWrapper": "RecordLifecycleActionHeartbeatResult",
        "type": "structure",
        "members": {}
      }
    },
    "ResumeProcesses": {
      "input": {
        "shape": "S58"
      }
    },
    "SetDesiredCapacity": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName",
          "DesiredCapacity"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "DesiredCapacity": {
            "type": "integer"
          },
          "HonorCooldown": {
            "type": "boolean"
          }
        }
      }
    },
    "SetInstanceHealth": {
      "input": {
        "type": "structure",
        "required": [
          "InstanceId",
          "HealthStatus"
        ],
        "members": {
          "InstanceId": {},
          "HealthStatus": {},
          "ShouldRespectGracePeriod": {
            "type": "boolean"
          }
        }
      }
    },
    "SetInstanceProtection": {
      "input": {
        "type": "structure",
        "required": [
          "InstanceIds",
          "AutoScalingGroupName",
          "ProtectedFromScaleIn"
        ],
        "members": {
          "InstanceIds": {
            "shape": "S2"
          },
          "AutoScalingGroupName": {},
          "ProtectedFromScaleIn": {
            "type": "boolean"
          }
        }
      },
      "output": {
        "resultWrapper": "SetInstanceProtectionResult",
        "type": "structure",
        "members": {}
      }
    },
    "SuspendProcesses": {
      "input": {
        "shape": "S58"
      }
    },
    "TerminateInstanceInAutoScalingGroup": {
      "input": {
        "type": "structure",
        "required": [
          "InstanceId",
          "ShouldDecrementDesiredCapacity"
        ],
        "members": {
          "InstanceId": {},
          "ShouldDecrementDesiredCapacity": {
            "type": "boolean"
          }
        }
      },
      "output": {
        "resultWrapper": "TerminateInstanceInAutoScalingGroupResult",
        "type": "structure",
        "members": {
          "Activity": {
            "shape": "S42"
          }
        }
      }
    },
    "UpdateAutoScalingGroup": {
      "input": {
        "type": "structure",
        "required": [
          "AutoScalingGroupName"
        ],
        "members": {
          "AutoScalingGroupName": {},
          "LaunchConfigurationName": {},
          "MinSize": {
            "type": "integer"
          },
          "MaxSize": {
            "type": "integer"
          },
          "DesiredCapacity": {
            "type": "integer"
          },
          "DefaultCooldown": {
            "type": "integer"
          },
          "AvailabilityZones": {
            "shape": "Sn"
          },
          "HealthCheckType": {},
          "HealthCheckGracePeriod": {
            "type": "integer"
          },
          "PlacementGroup": {},
          "VPCZoneIdentifier": {},
          "TerminationPolicies": {
            "shape": "Sr"
          },
          "NewInstancesProtectedFromScaleIn": {
            "type": "boolean"
          }
        }
      }
    }
  },
  "shapes": {
    "S2": {
      "type": "list",
      "member": {}
    },
    "S6": {
      "type": "list",
      "member": {}
    },
    "Sa": {
      "type": "list",
      "member": {}
    },
    "Sn": {
      "type": "list",
      "member": {}
    },
    "Sr": {
      "type": "list",
      "member": {}
    },
    "Su": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "Key"
        ],
        "members": {
          "ResourceId": {},
          "ResourceType": {},
          "Key": {},
          "Value": {},
          "PropagateAtLaunch": {
            "type": "boolean"
          }
        }
      }
    },
    "S11": {
      "type": "list",
      "member": {}
    },
    "S12": {
      "type": "list",
      "member": {}
    },
    "S14": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "DeviceName"
        ],
        "members": {
          "VirtualName": {},
          "DeviceName": {},
          "Ebs": {
            "type": "structure",
            "members": {
              "SnapshotId": {},
              "VolumeSize": {
                "type": "integer"
              },
              "VolumeType": {},
              "DeleteOnTermination": {
                "type": "boolean"
              },
              "Iops": {
                "type": "integer"
              },
              "Encrypted": {
                "type": "boolean"
              }
            }
          },
          "NoDevice": {
            "type": "boolean"
          }
        }
      }
    },
    "S1d": {
      "type": "structure",
      "members": {
        "Enabled": {
          "type": "boolean"
        }
      }
    },
    "S22": {
      "type": "list",
      "member": {}
    },
    "S2f": {
      "type": "list",
      "member": {
        "type": "structure",
        "members": {
          "ResourceId": {},
          "ResourceType": {},
          "Key": {},
          "Value": {},
          "PropagateAtLaunch": {
            "type": "boolean"
          }
        }
      }
    },
    "S2m": {
      "type": "list",
      "member": {}
    },
    "S3p": {
      "type": "integer",
      "deprecated": true
    },
    "S3s": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "ScalingAdjustment"
        ],
        "members": {
          "MetricIntervalLowerBound": {
            "type": "double"
          },
          "MetricIntervalUpperBound": {
            "type": "double"
          },
          "ScalingAdjustment": {
            "type": "integer"
          }
        }
      }
    },
    "S41": {
      "type": "list",
      "member": {
        "shape": "S42"
      }
    },
    "S42": {
      "type": "structure",
      "required": [
        "ActivityId",
        "AutoScalingGroupName",
        "Cause",
        "StartTime",
        "StatusCode"
      ],
      "members": {
        "ActivityId": {},
        "AutoScalingGroupName": {},
        "Description": {},
        "Cause": {},
        "StartTime": {
          "type": "timestamp"
        },
        "EndTime": {
          "type": "timestamp"
        },
        "StatusCode": {},
        "StatusMessage": {},
        "Progress": {
          "type": "integer"
        },
        "Details": {}
      }
    },
    "S4r": {
      "type": "list",
      "member": {}
    },
    "S58": {
      "type": "structure",
      "required": [
        "AutoScalingGroupName"
      ],
      "members": {
        "AutoScalingGroupName": {},
        "ScalingProcesses": {
          "type": "list",
          "member": {}
        }
      }
    }
  }
}
},{}],8:[function(require,module,exports){
module.exports={
  "pagination": {
    "DescribeAutoScalingGroups": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "AutoScalingGroups"
    },
    "DescribeAutoScalingInstances": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "AutoScalingInstances"
    },
    "DescribeLaunchConfigurations": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "LaunchConfigurations"
    },
    "DescribeNotificationConfigurations": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "NotificationConfigurations"
    },
    "DescribePolicies": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "ScalingPolicies"
    },
    "DescribeScalingActivities": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "Activities"
    },
    "DescribeScheduledActions": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "ScheduledUpdateGroupActions"
    },
    "DescribeTags": {
      "input_token": "NextToken",
      "output_token": "NextToken",
      "limit_key": "MaxRecords",
      "result_key": "Tags"
    }
  }
}

},{}],9:[function(require,module,exports){
module.exports={
  "version": "2.0",
  "metadata": {
    "apiVersion": "2010-05-15",
    "endpointPrefix": "cloudformation",
    "protocol": "query",
    "serviceFullName": "AWS CloudFormation",
    "signatureVersion": "v4",
    "uid": "cloudformation-2010-05-15",
    "xmlNamespace": "http://cloudformation.amazonaws.com/doc/2010-05-15/"
  },
  "operations": {
    "CancelUpdateStack": {
      "input": {
        "type": "structure",
        "required": [
          "StackName"
        ],
        "members": {
          "StackName": {}
        }
      }
    },
    "ContinueUpdateRollback": {
      "input": {
        "type": "structure",
        "required": [
          "StackName"
        ],
        "members": {
          "StackName": {},
          "RoleARN": {},
          "ResourcesToSkip": {
            "type": "list",
            "member": {}
          }
        }
      },
      "output": {
        "resultWrapper": "ContinueUpdateRollbackResult",
        "type": "structure",
        "members": {}
      }
    },
    "CreateChangeSet": {
      "input": {
        "type": "structure",
        "required": [
          "StackName",
          "ChangeSetName"
        ],
        "members": {
          "StackName": {},
          "TemplateBody": {},
          "TemplateURL": {},
          "UsePreviousTemplate": {
            "type": "boolean"
          },
          "Parameters": {
            "shape": "Sd"
          },
          "Capabilities": {
            "shape": "Si"
          },
          "ResourceTypes": {
            "shape": "Sk"
          },
          "RoleARN": {},
          "NotificationARNs": {
            "shape": "Sm"
          },
          "Tags": {
            "shape": "So"
          },
          "ChangeSetName": {},
          "ClientToken": {},
          "Description": {},
          "ChangeSetType": {}
        }
      },
      "output": {
        "resultWrapper": "CreateChangeSetResult",
        "type": "structure",
        "members": {
          "Id": {},
          "StackId": {}
        }
      }
    },
    "CreateStack": {
      "input": {
        "type": "structure",
        "required": [
          "StackName"
        ],
        "members": {
          "StackName": {},
          "TemplateBody": {},
          "TemplateURL": {},
          "Parameters": {
            "shape": "Sd"
          },
          "DisableRollback": {
            "type": "boolean"
          },
          "TimeoutInMinutes": {
            "type": "integer"
          },
          "NotificationARNs": {
            "shape": "Sm"
          },
          "Capabilities": {
            "shape": "Si"
          },
          "ResourceTypes": {
            "shape": "Sk"
          },
          "RoleARN": {},
          "OnFailure": {},
          "StackPolicyBody": {},
          "StackPolicyURL": {},
          "Tags